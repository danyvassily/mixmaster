const axios = require('axios');
const connectDB = require('../lib/utils/mongodb').default;
const CocktailModel = require('../models/Cocktail').default;
const { translate } = require('@vitalets/google-translate-api');

interface CocktailData {
  name: string;
  ingredients: Array<{
    name: string;
    quantity: string;
    unit: string;
  }>;
  instructions: string;
  category: string;
  isCustom: boolean;
  image?: string;
  description?: string;
  glassType?: string;
  isAlcoholic?: boolean;
}

// Fonction utilitaire pour attendre un certain temps
function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function translateText(text: string): Promise<string> {
  try {
    const result = await translate(text, { to: 'fr' });
    return result.text;
  } catch (error) {
    console.error('Erreur lors de la traduction:', error);
    return text;
  }
}

async function fetchCocktailsByLetter(letter: string) {
  const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
  return response.data.drinks || [];
}

async function fetchCocktailDetails(id: string) {
  const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  return response.data.drinks?.[0];
}

function formatIngredients(drink: any) {
  const ingredients = [];
  for (let i = 1; i <= 15; i++) {
    const name = drink[`strIngredient${i}`];
    const measure = drink[`strMeasure${i}`];
    
    if (name && measure) {
      // Séparation de la quantité et de l'unité
      const measureParts = measure.trim().split(' ');
      let quantity = measureParts[0];
      let unit = measureParts.slice(1).join(' ');
      
      // Si l'unité n'est pas spécifiée, utiliser une valeur par défaut appropriée
      if (!unit) {
        if (quantity.includes('/') || !isNaN(quantity)) {
          unit = 'oz'; // Unité par défaut pour les mesures numériques
        } else {
          unit = 'portion'; // Pour les mesures qualitatives
          quantity = measure.trim();
        }
      }
      
      ingredients.push({
        name: name.trim(),
        quantity,
        unit
      });
    }
  }
  return ingredients;
}

async function fetchCocktails() {
  try {
    console.log('Connexion à la base de données...');
    await connectDB();
    
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const cocktails: CocktailData[] = [];
    let totalProcessed = 0;
    
    console.log('Récupération des cocktails...');
    for (const letter of alphabet) {
      console.log(`Recherche des cocktails commençant par "${letter}"...`);
      try {
        const drinks = await fetchCocktailsByLetter(letter);
        
        for (const drink of drinks) {
          try {
            // Attendre 200ms entre chaque requête pour éviter de dépasser la limite
            await sleep(200);
            
            const details = await fetchCocktailDetails(drink.idDrink);
            if (details) {
              // Création de la description en anglais
              const englishDescription = `${details.strDrink} is a ${details.strAlcoholic.toLowerCase()} cocktail from the ${details.strCategory} category. It is traditionally served in ${details.strGlass}.`;
              
              // Traduction de la description en français
              const frenchDescription = await translateText(englishDescription);
              
              const cocktail: CocktailData = {
                name: details.strDrink,
                ingredients: formatIngredients(details),
                instructions: await translateText(details.strInstructions), // Traduction des instructions
                category: details.strCategory,
                isCustom: false,
                image: details.strDrinkThumb,
                description: frenchDescription,
                glassType: details.strGlass,
                isAlcoholic: details.strAlcoholic === 'Alcoholic'
              };
              
              cocktails.push(cocktail);
              totalProcessed++;
              console.log(`[${totalProcessed}] Ajout de "${cocktail.name}"`);
              
              // Sauvegarde immédiate dans la base de données
              await CocktailModel.findOneAndUpdate(
                { name: cocktail.name },
                cocktail,
                { upsert: true, new: true }
              );
              
              // Petite pause pour éviter de surcharger l'API de traduction
              await sleep(1000);
            }
          } catch (error) {
            console.error(`Erreur lors du traitement du cocktail:`, error);
          }
        }
      } catch (error) {
        console.error(`Erreur lors de la recherche pour la lettre "${letter}":`, error);
      }
    }
    
    console.log('\nTerminé !');
    console.log(`Nombre total de cocktails traités : ${totalProcessed}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Erreur lors de la récupération des cocktails:', error);
    process.exit(1);
  }
}

fetchCocktails(); 