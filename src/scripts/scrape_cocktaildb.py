import os
import time
import requests
from pymongo import MongoClient
from dotenv import load_dotenv
from pathlib import Path

# Charger les variables d'environnement
load_dotenv(Path('.env.local'))

# Configuration MongoDB
MONGODB_URI = os.getenv('MONGODB_URI')
client = MongoClient(MONGODB_URI)
db = client.get_default_database()
cocktails_collection = db.cocktails

# Configuration de l'API
API_BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1'

def download_image(url, cocktail_name):
    """Télécharge l'image du cocktail et la sauvegarde localement."""
    try:
        response = requests.get(url)
        if response.status_code == 200:
            # Créer le dossier public/cocktails s'il n'existe pas
            os.makedirs('public/cocktails', exist_ok=True)
            
            # Générer le nom du fichier
            filename = f"{cocktail_name.lower().replace(' ', '-')}.jpg"
            filepath = os.path.join('public/cocktails', filename)
            
            # Sauvegarder l'image
            with open(filepath, 'wb') as f:
                f.write(response.content)
            
            return f'/cocktails/{filename}'
    except Exception as e:
        print(f"Erreur lors du téléchargement de l'image pour {cocktail_name}: {e}")
    return ''

def get_category_cocktails(category):
    """Récupère tous les cocktails d'une catégorie donnée."""
    url = f"{API_BASE_URL}/filter.php?c={category}"
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        return data.get('drinks', [])
    except Exception as e:
        print(f"Erreur lors de la récupération des cocktails de la catégorie {category}: {e}")
        return []

def get_cocktail_details(cocktail_id):
    """Récupère les détails d'un cocktail par son ID."""
    url = f"{API_BASE_URL}/lookup.php?i={cocktail_id}"
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        return data['drinks'][0] if data.get('drinks') else None
    except Exception as e:
        print(f"Erreur lors de la récupération des détails du cocktail {cocktail_id}: {e}")
        return None

def parse_ingredients(cocktail_data):
    """Extrait les ingrédients du cocktail."""
    ingredients = []
    for i in range(1, 16):  # L'API supporte jusqu'à 15 ingrédients
        ingredient = cocktail_data.get(f'strIngredient{i}')
        measure = cocktail_data.get(f'strMeasure{i}')
        
        if ingredient and ingredient.strip():
            # Analyser la mesure pour extraire quantité et unité
            quantity = '1'
            unit = 'unité'
            
            if measure:
                measure = measure.strip()
                parts = measure.split()
                if parts:
                    quantity = parts[0]
                    unit = ' '.join(parts[1:]) if len(parts) > 1 else 'unité'
            
            ingredients.append({
                'name': ingredient.strip(),
                'quantity': quantity,
                'unit': unit
            })
    
    return ingredients

def determine_category(category_name):
    """Convertit la catégorie de l'API en notre format."""
    category_mapping = {
        'Ordinary Drink': 'Classique',
        'Cocktail': 'Classique',
        'Shot': 'Shot',
        'Coffee / Tea': 'Café',
        'Homemade Liqueur': 'Liqueur',
        'Punch / Party Drink': 'Punch',
        'Beer': 'Bière',
        'Soft Drink': 'Sans Alcool',
        'Other/Unknown': 'Autre'
    }
    return category_mapping.get(category_name, 'Classique')

def main():
    """Fonction principale du script."""
    # Récupérer la liste des catégories
    try:
        categories_response = requests.get(f"{API_BASE_URL}/list.php?c=list")
        categories_response.raise_for_status()
        categories = [cat['strCategory'] for cat in categories_response.json()['drinks']]
    except Exception as e:
        print(f"Erreur lors de la récupération des catégories: {e}")
        return

    total_cocktails = 0
    
    for category in categories:
        print(f"\nTraitement de la catégorie: {category}")
        cocktails = get_category_cocktails(category)
        
        for cocktail in cocktails:
            cocktail_id = cocktail['idDrink']
            print(f"Traitement du cocktail ID: {cocktail_id}")
            
            details = get_cocktail_details(cocktail_id)
            if not details:
                continue
            
            # Télécharger l'image
            image_path = download_image(details['strDrinkThumb'], details['strDrink'])
            
            # Préparer les données du cocktail
            cocktail_data = {
                'name': details['strDrink'],
                'ingredients': parse_ingredients(details),
                'instructions': details['strInstructions'],
                'description': details.get('strDrinkDE', ''),  # Utiliser la description allemande comme fallback
                'image': image_path,
                'category': determine_category(details['strCategory']),
                'isCustom': False,
                'isAlcoholic': details['strAlcoholic'] == 'Alcoholic'
            }
            
            # Mettre à jour ou créer le cocktail dans la base de données
            result = cocktails_collection.update_one(
                {'name': cocktail_data['name']},
                {'$set': cocktail_data},
                upsert=True
            )
            
            if result.upserted_id:
                print(f"Nouveau cocktail ajouté: {cocktail_data['name']}")
            else:
                print(f"Cocktail mis à jour: {cocktail_data['name']}")
            
            total_cocktails += 1
            time.sleep(1)  # Pause entre chaque cocktail
    
    print(f"\nScraping terminé avec succès! {total_cocktails} cocktails traités.")
    client.close()

if __name__ == '__main__':
    main() 