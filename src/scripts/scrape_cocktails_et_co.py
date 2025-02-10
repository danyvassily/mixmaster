import os
import re
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from bs4 import BeautifulSoup
from pymongo import MongoClient
from dotenv import load_dotenv
from pathlib import Path
import requests
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options

# Charger les variables d'environnement
load_dotenv(Path('.env.local'))

# Configuration MongoDB
MONGODB_URI = os.getenv('MONGODB_URI')
client = MongoClient(MONGODB_URI)
db = client.get_default_database()
cocktails_collection = db.cocktails

def setup_driver():
    """Configure et retourne le driver Selenium."""
    chrome_options = Options()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    chrome_options.add_argument('--disable-gpu')
    chrome_options.add_argument('--window-size=1920x1080')
    chrome_options.add_argument('--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
    
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)
    return driver

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

def parse_ingredients(ingredients_text):
    """Parse les ingrédients en structure de données."""
    ingredients = []
    for line in ingredients_text.strip().split('\n'):
        line = line.strip()
        if not line:
            continue
            
        # Regex pour extraire quantité, unité et nom
        match = re.match(r'^([\d.,/]+)?\s*(cl|ml|g|oz|cuillère[s]? à (?:café|soupe)|trait[s]?|feuille[s]?|tranche[s]?)?\s*(.+)$', line, re.I)
        
        if match:
            quantity, unit, name = match.groups()
            ingredients.append({
                'name': name.strip(),
                'quantity': quantity.strip() if quantity else '1',
                'unit': unit.strip().lower() if unit else 'unité'
            })
    return ingredients

def get_cocktail_links(driver):
    """Récupère tous les liens des cocktails."""
    links = set()
    base_url = 'https://cocktails-et-co.fr/recettes-cocktails/'
    page = 1
    
    while True:
        if page == 1:
            url = base_url
        else:
            url = f"{base_url}page/{page}/"
            
        print(f"Exploration de {url}")
        
        try:
            driver.get(url)
            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'entry-title'))
            )
            
            # Faire défiler la page pour charger tout le contenu
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(2)
            
            # Extraire les liens
            elements = driver.find_elements(By.CSS_SELECTOR, '.entry-title a')
            new_links = set()
            for element in elements:
                href = element.get_attribute('href')
                if href and '/recettes-cocktails/' in href:
                    new_links.add(href)
            
            if not new_links or new_links.issubset(links):
                break
                
            links.update(new_links)
            
            # Vérifier s'il y a une page suivante
            try:
                next_page = driver.find_element(By.CLASS_NAME, 'next')
                if not next_page:
                    break
                page += 1
            except NoSuchElementException:
                break
                
            time.sleep(2)
            
        except TimeoutException:
            print(f"Timeout lors du chargement de {url}")
            break
        except Exception as e:
            print(f"Erreur lors de l'exploration de {url}: {e}")
            break
            
    return links

def determine_category(ingredients, name):
    """Détermine la catégorie du cocktail basée sur ses ingrédients."""
    name_lower = name.lower()
    ingredients_text = ' '.join(ing['name'].lower() for ing in ingredients)
    
    if any(spirit in ingredients_text for spirit in ['gin']):
        return 'Gin'
    elif any(spirit in ingredients_text for spirit in ['vodka']):
        return 'Vodka'
    elif any(spirit in ingredients_text for spirit in ['rhum', 'rum']):
        return 'Rhum'
    elif any(spirit in ingredients_text for spirit in ['tequila', 'mezcal']):
        return 'Tequila'
    elif any(spirit in ingredients_text for spirit in ['whisky', 'whiskey', 'bourbon']):
        return 'Whisky'
    elif any(spirit in ingredients_text for spirit in ['champagne', 'prosecco']):
        return 'Champagne'
    elif any(spirit in ingredients_text for spirit in ['liqueur']):
        return 'Liqueur'
    elif not any(spirit in ingredients_text for spirit in ['alcool', 'gin', 'vodka', 'rhum', 'rum', 'tequila', 'whisky', 'whiskey', 'bourbon', 'vin', 'champagne']):
        return 'Sans Alcool'
    else:
        return 'Classique'

def scrape_cocktail(driver, url):
    """Scrape les détails d'un cocktail spécifique."""
    try:
        driver.get(url)
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, 'entry-title'))
        )
        
        # Faire défiler la page pour charger tout le contenu
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(2)
        
        soup = BeautifulSoup(driver.page_source, 'html.parser')
        
        # Extraire le nom
        title = soup.find('h1', class_='entry-title')
        if not title:
            return None
        name = title.text.strip()
        
        # Extraire la description
        description = ''
        content = soup.find('div', class_='entry-content')
        if content:
            paragraphs = content.find_all('p')
            for p in paragraphs:
                if p.text.strip() and not p.find('img'):
                    description = p.text.strip()
                    break
        
        # Extraire l'image
        image_url = ''
        image = soup.find('img', class_='wp-post-image')
        if image:
            image_url = image.get('src', '')
        
        # Extraire les ingrédients
        ingredients_list = soup.find('div', class_='ingredients-list')
        if not ingredients_list:
            return None
            
        ingredients_text = '\n'.join(
            li.text.strip()
            for li in ingredients_list.find_all('li')
        )
        
        # Extraire les instructions
        instructions = ''
        method = soup.find('div', class_='preparation')
        if method:
            instructions = method.text.strip()
        
        if not ingredients_text or not instructions:
            return None
        
        # Télécharger l'image
        image_path = download_image(image_url, name) if image_url else ''
        
        # Parser les ingrédients
        parsed_ingredients = parse_ingredients(ingredients_text)
        
        # Déterminer la catégorie
        category = determine_category(parsed_ingredients, name)
        
        return {
            'name': name,
            'ingredients': parsed_ingredients,
            'instructions': instructions,
            'description': description,
            'image': image_path,
            'category': category,
            'isCustom': False,
            'isAlcoholic': category != 'Sans Alcool'
        }
        
    except Exception as e:
        print(f"Erreur lors du scraping de {url}: {e}")
        return None

def main():
    """Fonction principale du script."""
    driver = setup_driver()
    
    try:
        print("Récupération des liens des cocktails...")
        cocktail_links = get_cocktail_links(driver)
        print(f"Nombre total de cocktails trouvés: {len(cocktail_links)}")
        
        for link in cocktail_links:
            print(f"\nTraitement du cocktail: {link}")
            cocktail_data = scrape_cocktail(driver, link)
            
            if cocktail_data:
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
                    
            time.sleep(2)  # Pause entre chaque cocktail
        
        print("\nScraping terminé avec succès!")
    finally:
        driver.quit()
        client.close()

if __name__ == '__main__':
    main() 