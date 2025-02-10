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
    chrome_options.add_argument('--headless')  # Mode headless
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
                'unit': unit.strip() if unit else 'unité'
            })
    return ingredients

def get_cocktail_links(driver):
    """Récupère tous les liens des cocktails depuis la page principale."""
    links = set()
    base_url = 'https://www.destinationcocktails.fr/recettes-cocktails/'
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
                EC.presence_of_element_located((By.CLASS_NAME, 'site-main'))
            )
            
            # Faire défiler la page pour charger tout le contenu
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(2)
            
            # Extraire les liens
            elements = driver.find_elements(By.TAG_NAME, 'a')
            for element in elements:
                href = element.get_attribute('href')
                if href and '/recettes-cocktails/' in href and not href.endswith('/recettes-cocktails/') and '/page/' not in href:
                    links.add(href)
            
            # Vérifier s'il y a une page suivante
            try:
                next_page = driver.find_element(By.CLASS_NAME, 'next')
                if not next_page:
                    break
            except NoSuchElementException:
                break
                
            page += 1
            time.sleep(2)
            
        except TimeoutException:
            print(f"Timeout lors du chargement de {url}")
            break
        except Exception as e:
            print(f"Erreur lors de l'exploration de {url}: {e}")
            break
            
    return links

def determine_category(url, content):
    """Détermine la catégorie du cocktail basée sur l'URL et le contenu."""
    url_lower = url.lower()
    content_lower = content.lower() if content else ''
    
    if 'gin' in url_lower or 'gin' in content_lower:
        return 'Gin'
    elif 'vodka' in url_lower or 'vodka' in content_lower:
        return 'Vodka'
    elif 'rhum' in url_lower or 'rhum' in content_lower:
        return 'Rhum'
    elif 'tequila' in url_lower or 'tequila' in content_lower:
        return 'Tequila'
    elif 'whisky' in url_lower or 'whiskey' in url_lower or 'whisky' in content_lower:
        return 'Whisky'
    elif 'champagne' in url_lower or 'champagne' in content_lower:
        return 'Champagne'
    elif 'liqueur' in url_lower or 'liqueur' in content_lower:
        return 'Liqueur'
    elif 'sans-alcool' in url_lower or 'sans alcool' in content_lower:
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
        
        # Utiliser BeautifulSoup pour parser le contenu
        soup = BeautifulSoup(driver.page_source, 'html.parser')
        
        # Extraire les informations
        title = soup.find('h1', class_='entry-title')
        if not title:
            print(f"Pas de titre trouvé pour {url}")
            return None
            
        name = title.text.strip()
        
        # Trouver la première description dans le contenu
        content = soup.find('div', class_='entry-content')
        description = ''
        if content:
            paragraphs = content.find_all('p')
            for p in paragraphs:
                if p.text.strip() and not p.find('img'):
                    description = p.text.strip()
                    break
        
        # Trouver l'image
        image_url = ''
        image = soup.find('img', class_='wp-post-image')
        if image:
            image_url = image.get('src', '')
        
        # Extraire les ingrédients
        ingredients_list = soup.find('ul', class_='ingredient-list')
        ingredients_text = ''
        if ingredients_list:
            ingredients_text = '\n'.join(
                li.text.strip()
                for li in ingredients_list.find_all('li')
            )
        
        # Extraire les instructions
        steps_list = soup.find('ol', class_='preparation-steps')
        instructions = ''
        if steps_list:
            instructions = '\n'.join(
                li.text.strip()
                for li in steps_list.find_all('li')
            )
        
        if not ingredients_text or not instructions:
            print(f"Données manquantes pour {url}")
            return None
        
        # Télécharger l'image
        image_path = download_image(image_url, name) if image_url else ''
        
        # Parser les ingrédients
        parsed_ingredients = parse_ingredients(ingredients_text)
        
        # Déterminer la catégorie
        category = determine_category(url, description)
        is_alcoholic = category != 'Sans Alcool'
        
        return {
            'name': name,
            'ingredients': parsed_ingredients,
            'instructions': instructions,
            'description': description,
            'image': image_path,
            'category': category,
            'isCustom': False,
            'isAlcoholic': is_alcoholic
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