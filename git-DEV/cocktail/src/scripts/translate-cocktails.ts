import connectDB from '../lib/utils/mongodb';
import CocktailModel from '../models/Cocktail';
import { translate } from '@vitalets/google-translate-api';

interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
}

interface Cocktail {
  _id: string;
  name: string;
  ingredients: Ingredient[];
  instructions: string;
  description?: string;
  category: string;
  image?: string;
  glassType?: string;
  isAlcoholic?: boolean;
}

// Fonction utilitaire pour attendre un certain temps
function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Fonction pour traduire un texte avec gestion des erreurs et délais
async function safeTranslate(text: string): Promise<string> {
  try {
    if (!text) return '';
    await sleep(100); // Petit délai entre les traductions
    
    const result = await translate(text, { to: 'fr' });
    return result.text;
  } catch (error) {
    console.error(`Erreur de traduction pour: "${text}"`, error);
    return text; // En cas d'erreur, on retourne le texte original
  }
}

async function translateCocktails() {
  try {
    console.log('Connexion à la base de données...');
    await connectDB();
    
    // Récupération de tous les cocktails
    const cocktails = await CocktailModel.find({}).lean();
    console.log(`${cocktails.length} cocktails trouvés. Début de la traduction...`);
    
    let processed = 0;
    for (const cocktail of cocktails) {
      try {
        console.log(`[${processed + 1}/${cocktails.length}] Traduction de "${cocktail.name}"...`);
        
        // Traduction des instructions
        const translatedInstructions = await safeTranslate(cocktail.instructions);
        
        // Traduction de la description
        const translatedDescription = await safeTranslate(cocktail.description || '');
        
        // Traduction des ingrédients
        const translatedIngredients = await Promise.all(
          cocktail.ingredients.map(async (ingredient: Ingredient) => ({
            ...ingredient,
            name: await safeTranslate(ingredient.name),
            unit: await translateUnit(ingredient.unit)
          }))
        );
        
        // Mise à jour du cocktail dans la base de données
        await CocktailModel.findByIdAndUpdate(cocktail._id, {
          instructions: translatedInstructions,
          description: translatedDescription,
          ingredients: translatedIngredients
        });
        
        processed++;
        console.log(`✓ "${cocktail.name}" traduit avec succès`);
        
        // Attente entre chaque cocktail pour éviter de surcharger le service
        await sleep(500);
        
      } catch (error) {
        console.error(`Erreur lors de la traduction du cocktail ${cocktail.name}:`, error);
      }
    }
    
    console.log(`\nTraduction terminée ! ${processed} cocktails ont été traduits.`);
    process.exit(0);
  } catch (error) {
    console.error('Erreur lors de la traduction des cocktails:', error);
    process.exit(1);
  }
}

// Fonction pour traduire les unités de mesure
function translateUnit(unit: string): string {
  const unitTranslations: { [key: string]: string } = {
    'oz': 'cl',
    'cl': 'cl',
    'ml': 'ml',
    'dash': 'trait',
    'dashes': 'traits',
    'splash': 'giclée',
    'part': 'part',
    'parts': 'parts',
    'slice': 'tranche',
    'slices': 'tranches',
    'piece': 'morceau',
    'pieces': 'morceaux',
    'portion': 'portion',
    'cup': 'tasse',
    'cups': 'tasses',
    'spoon': 'cuillère',
    'teaspoon': 'cuillère à café',
    'tablespoon': 'cuillère à soupe'
  };

  const lowerUnit = unit.toLowerCase();
  return unitTranslations[lowerUnit] || unit;
}

// Lancement de la traduction
translateCocktails(); 