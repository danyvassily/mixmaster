import puppeteer from 'puppeteer';
import mongoose from 'mongoose';
import path from 'path';
import { promises as fs } from 'fs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Cocktail, { ICocktail } from '../models/Cocktail';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

interface CocktailData {
  name: string;
  description: string;
  imageUrl: string;
  ingredients: string;
  instructions: string;
}

async function downloadImage(url: string, cocktailName: string): Promise<string> {
  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    const fileName = `${cocktailName.toLowerCase().replace(/\s+/g, '-')}.jpg`;
    const filePath = path.join(process.cwd(), 'public', 'cocktails', fileName);
    
    await fs.writeFile(filePath, Buffer.from(buffer));
    return `/cocktails/${fileName}`;
  } catch (error) {
    console.error(`Erreur lors du téléchargement de l'image pour ${cocktailName}:`, error);
    return '';
  }
}

async function parseIngredients(ingredientsText: string): Promise<Array<{ name: string; quantity: string; unit: string; }>> {
  const ingredients = [];
  const lines = ingredientsText.split('\n').filter(line => line.trim());

  for (const line of lines) {
    const match = line.trim().match(/^([\d.,/]+)?\s*(cl|ml|g|oz|cuillère[s]? à (?:café|soupe)|trait[s]?|feuille[s]?|tranche[s]?)?\s*(.+)$/i);
    
    if (match) {
      const [, quantity = '1', unit = '', name] = match;
      ingredients.push({
        name: name.trim(),
        quantity: quantity.trim(),
        unit: unit.trim() || 'unité'
      });
    }
  }
  return ingredients;
}

async function getAllCocktailLinks(page: puppeteer.Page): Promise<string[]> {
  const baseUrl = 'https://www.destinationcocktails.fr/recettes-cocktails/';
  const categories = [
    'cocktails-gin',
    'cocktails-vodka',
    'cocktails-rhum',
    'cocktails-tequila',
    'cocktails-whisky',
    'cocktails-champagne',
    'cocktails-liqueur',
    'cocktails-sans-alcool'
  ];
  
  const allLinks = new Set<string>();

  for (const category of categories) {
    const categoryUrl = `${baseUrl}${category}/`;
    console.log(`Exploration de la catégorie: ${category}`);
    
    try {
      await page.goto(categoryUrl, { waitUntil: 'networkidle0' });
      
      // Attendre que le contenu soit chargé
      await page.waitForSelector('.site-main', { timeout: 10000 });
      
      let hasNextPage = true;
      let pageNum = 1;

      while (hasNextPage) {
        console.log(`  Page ${pageNum} de ${category}...`);
        
        // Récupérer les liens des cocktails sur la page courante
        const pageLinks = await page.evaluate(() => {
          const links = Array.from(document.querySelectorAll('.entry-title a, .entry-content a'))
            .map(link => (link as HTMLAnchorElement).href)
            .filter(href => 
              href.includes('/recettes-cocktails/') && 
              !href.includes('/page/') &&
              !href.endsWith('/recettes-cocktails/') &&
              !href.includes('/category/')
            );
          return Array.from(new Set(links)); // Éliminer les doublons
        });

        // Ajouter les nouveaux liens à notre ensemble
        pageLinks.forEach(link => allLinks.add(link));
        
        // Vérifier s'il y a une page suivante
        const nextPageExists = await page.evaluate(() => {
          const nextLink = document.querySelector('.next.page-numbers');
          return !!nextLink;
        });

        if (nextPageExists) {
          pageNum++;
          const nextPageUrl = `${categoryUrl}page/${pageNum}/`;
          await page.goto(nextPageUrl, { waitUntil: 'networkidle0' });
        } else {
          hasNextPage = false;
        }

        // Petite pause entre les pages
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error(`Erreur lors de l'exploration de la catégorie ${category}:`, error);
    }
  }

  return Array.from(allLinks);
}

async function scrapeCocktails(): Promise<void> {
  try {
    // Connexion à MongoDB
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Connecté à MongoDB');

    const browser = await puppeteer.launch({ 
      headless: "new",
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--window-size=1920x1080'
      ]
    });
    const page = await browser.newPage();
    
    // Configuration du navigateur
    await page.setViewport({ width: 1920, height: 1080 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (['image', 'stylesheet', 'font'].includes(request.resourceType())) {
        request.continue();
      } else if (request.resourceType() === 'script') {
        request.continue();
      } else {
        request.continue();
      }
    });
    
    // Configuration du timeout et de la navigation
    page.setDefaultNavigationTimeout(30000);
    page.setDefaultTimeout(30000);
    
    // Récupérer tous les liens des cocktails
    const cocktailLinks = await getAllCocktailLinks(page);
    console.log(`Nombre total de cocktails trouvés: ${cocktailLinks.length}`);

    for (const link of cocktailLinks) {
      try {
        console.log(`Traitement du cocktail: ${link}`);
        await page.goto(link, { waitUntil: 'networkidle0' });
        
        // Attendre que les éléments nécessaires soient chargés
        await Promise.all([
          page.waitForSelector('.entry-title'),
          page.waitForSelector('.entry-content'),
          page.waitForSelector('.ingredient-list'),
          page.waitForSelector('.preparation-steps')
        ].map(p => p.catch(() => null))); // Ignorer les erreurs individuelles

        const cocktailData = await page.evaluate(() => {
          const name = document.querySelector('.entry-title')?.textContent?.trim() || '';
          const description = document.querySelector('.entry-content p')?.textContent?.trim() || '';
          const imageUrl = document.querySelector('.wp-post-image')?.getAttribute('src') || '';
          const ingredients = Array.from(document.querySelectorAll('.ingredient-list li'))
            .map(li => li.textContent?.trim())
            .filter(text => text)
            .join('\n');
          const instructions = Array.from(document.querySelectorAll('.preparation-steps li'))
            .map(li => li.textContent?.trim())
            .filter(text => text)
            .join('\n');

          return { name, description, imageUrl, ingredients, instructions } as CocktailData;
        });

        if (!cocktailData.name) {
          console.log('Pas de nom de cocktail trouvé, on passe au suivant');
          continue;
        }

        // Télécharger l'image
        console.log(`Téléchargement de l'image pour ${cocktailData.name}...`);
        const imagePath = await downloadImage(cocktailData.imageUrl, cocktailData.name);
        
        // Parser les ingrédients
        console.log(`Parsing des ingrédients pour ${cocktailData.name}...`);
        const parsedIngredients = await parseIngredients(cocktailData.ingredients);

        if (parsedIngredients.length === 0) {
          console.log('Pas d\'ingrédients trouvés, on passe au suivant');
          continue;
        }

        // Déterminer la catégorie en fonction de l'URL
        let category = 'Classique';
        if (link.includes('cocktails-gin')) category = 'Gin';
        else if (link.includes('cocktails-vodka')) category = 'Vodka';
        else if (link.includes('cocktails-rhum')) category = 'Rhum';
        else if (link.includes('cocktails-tequila')) category = 'Tequila';
        else if (link.includes('cocktails-whisky')) category = 'Whisky';
        else if (link.includes('cocktails-champagne')) category = 'Champagne';
        else if (link.includes('cocktails-liqueur')) category = 'Liqueur';
        else if (link.includes('cocktails-sans-alcool')) category = 'Sans Alcool';

        // Mettre à jour ou créer le cocktail dans la base de données
        console.log(`Mise à jour de la base de données pour ${cocktailData.name}...`);
        await Cocktail.findOneAndUpdate(
          { name: cocktailData.name },
          {
            name: cocktailData.name,
            ingredients: parsedIngredients,
            instructions: cocktailData.instructions,
            description: cocktailData.description,
            image: imagePath,
            category: category,
            isCustom: false,
            isAlcoholic: category !== 'Sans Alcool',
          },
          { upsert: true, new: true }
        );

        console.log(`Cocktail traité avec succès: ${cocktailData.name}`);
        
        // Petite pause pour éviter de surcharger le serveur
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`Erreur lors du traitement d'un cocktail:`, error);
      }
    }

    await browser.close();
    await mongoose.disconnect();
    console.log('Scraping terminé avec succès');
  } catch (error) {
    console.error('Erreur lors du scraping:', error);
    process.exit(1);
  }
}

scrapeCocktails(); 