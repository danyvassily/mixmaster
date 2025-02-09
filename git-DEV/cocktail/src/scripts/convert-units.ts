import connectDB from '../lib/utils/mongodb';
import CocktailModel from '../models/Cocktail';

const OZ_TO_CL = 2.957; // 1 oz = 2.957 cl

interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
}

// Constantes pour la normalisation des unités
const UNIT_PATTERNS = {
  OZ: /\b(?:oz|ounce|onces)\b/i,
  CL: /\b(?:cl|centilitre|centiliters)\b/i,
  ML: /\b(?:ml|millilitre|milliliters)\b/i,
  SHOT: /\b(?:shot|shots)\b/i,
  CUP: /\b(?:cup|cups|tasse|tasses)\b/i,
  TSP: /\b(?:tsp|teaspoon|teaspoons|cuillère à café)\b/i,
  TBSP: /\b(?:tbsp|tablespoon|tablespoons|cuillère à soupe)\b/i,
};

// Mapping des unités vers leur forme normalisée
const UNIT_MAPPING = {
  'oz': 'oz',
  'ounce': 'oz',
  'onces': 'oz',
  'shot': 'oz',
  'shots': 'oz',
  'cl': 'cl',
  'centilitre': 'cl',
  'centiliters': 'cl',
  'ml': 'ml',
  'millilitre': 'ml',
  'milliliters': 'ml',
  'cup': 'cup',
  'cups': 'cup',
  'tasse': 'cup',
  'tasses': 'cup',
  'tsp': 'tsp',
  'teaspoon': 'tsp',
  'teaspoons': 'tsp',
  'cuillère à café': 'tsp',
  'tbsp': 'tbsp',
  'tablespoon': 'tbsp',
  'tablespoons': 'tbsp',
  'cuillère à soupe': 'tbsp'
};

// Facteurs de conversion vers cl
const CONVERSION_FACTORS = {
  'oz': 2.957,    // 1 oz = 2.957 cl
  'shot': 4.43,   // 1 shot = 4.43 cl
  'cup': 23.66,   // 1 cup = 23.66 cl
  'tsp': 0.492,   // 1 tsp = 0.492 cl
  'tbsp': 1.478,  // 1 tbsp = 1.478 cl
  'ml': 0.1,      // 1 ml = 0.1 cl
  'cl': 1         // 1 cl = 1 cl
};

function normalizeUnit(unit: string): { normalizedUnit: string; additionalInfo: string } {
  const unitLower = unit.toLowerCase().trim();
  let normalizedUnit = '';
  let additionalInfo = '';

  // Extraire les informations additionnelles (entre parenthèses)
  const parenthesesMatch = unitLower.match(/\((.*?)\)/);
  if (parenthesesMatch) {
    additionalInfo = parenthesesMatch[1].trim();
    unit = unitLower.replace(/\(.*?\)/, '').trim();
  }

  // Gérer les cas avec des fractions
  const fractionMatch = unitLower.match(/^(\d+\/\d+)\s+(.+)$/);
  if (fractionMatch) {
    const [_, fraction, remainingUnit] = fractionMatch;
    const fractionValue = extractFraction(fraction);
    if (fractionValue !== null) {
      normalizedUnit = normalizeBasicUnit(remainingUnit);
      return { normalizedUnit, additionalInfo };
    }
  }

  // Extraire les adjectifs descriptifs
  const descriptiveWords = unitLower.split(/\s+/);
  const unitWords = descriptiveWords.filter(word => {
    if (word.match(/^(?:cold|hot|fresh|frozen|chilled|strong|weak|light|dark|sweet|dry)$/)) {
      if (additionalInfo) {
        additionalInfo += ' ' + word;
      } else {
        additionalInfo = word;
      }
      return false;
    }
    return true;
  });

  // Normaliser l'unité de base
  normalizedUnit = normalizeBasicUnit(unitWords.join(' '));
  
  return { normalizedUnit, additionalInfo: additionalInfo.trim() };
}

function normalizeBasicUnit(unit: string): string {
  const unitLower = unit.toLowerCase().trim();
  
  // Vérifier chaque pattern d'unité
  for (const [key, pattern] of Object.entries(UNIT_PATTERNS)) {
    if (pattern.test(unitLower)) {
      // Retourner la forme normalisée correspondante
      return UNIT_MAPPING[Object.keys(UNIT_MAPPING).find(k => k.toLowerCase() === unitLower) || ''] || 'oz';
    }
  }
  
  // Si aucun pattern ne correspond, retourner l'unité d'origine
  return unitLower;
}

function extractFraction(str: string): number | null {
  // Gérer les cas comme "1/2", "1/4", etc.
  const simpleFraction = str.match(/^(\d+)\/(\d+)$/);
  if (simpleFraction) {
    const [_, num, denom] = simpleFraction;
    const numerator = parseInt(num);
    const denominator = parseInt(denom);
    if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
      return numerator / denominator;
    }
  }
  
  // Gérer les cas comme "1 1/2", "2 1/4", etc.
  const mixedFraction = str.match(/^(\d+)\s+(\d+)\/(\d+)$/);
  if (mixedFraction) {
    const [_, whole, num, denom] = mixedFraction;
    const wholeNumber = parseInt(whole);
    const numerator = parseInt(num);
    const denominator = parseInt(denom);
    if (!isNaN(wholeNumber) && !isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
      return wholeNumber + (numerator / denominator);
    }
  }
  
  return null;
}

function extractOzQuantity(quantity: string, unit: string): number | null {
  const { normalizedUnit, additionalInfo } = normalizeUnit(unit);
  let finalQuantity = quantity;
  let multiplier = 1;

  // Si l'unité est reconnue, appliquer le facteur de conversion approprié
  if (CONVERSION_FACTORS[normalizedUnit]) {
    multiplier = CONVERSION_FACTORS[normalizedUnit] / CONVERSION_FACTORS['cl'];
  }

  // Si l'unité commence par une fraction (ex: "1/2 oz")
  const unitFraction = unit.match(/^(\d+\/\d+)\s+oz/);
  if (unitFraction) {
    const fractionValue = extractFraction(unitFraction[1]);
    if (fractionValue !== null) {
      // Si la quantité est vide ou "Add", utiliser la fraction de l'unité
      if (!quantity || quantity.toLowerCase() === 'add') {
        return fractionValue;
      }
      multiplier = fractionValue;
    }
  }
  
  // Nettoyer la quantité des caractères non numériques au début
  finalQuantity = finalQuantity.replace(/^[^0-9]*/, '').trim();
  
  // Si la quantité est vide après nettoyage, retourner le multiplier
  if (!finalQuantity) {
    return multiplier;
  }
  
  // Gérer les fractions dans la quantité
  const fractionValue = extractFraction(finalQuantity);
  if (fractionValue !== null) {
    return fractionValue * multiplier;
  }
  
  // Gérer les nombres décimaux
  const number = parseFloat(finalQuantity);
  return !isNaN(number) ? number * multiplier : null;
}

async function convertOzToCl() {
  try {
    console.log('Connexion à la base de données...');
    await connectDB();
    
    // Récupération des cocktails avec des ingrédients ayant des unités à convertir
    const cocktails = await CocktailModel.find({
      $or: [
        { 'ingredients.unit': { $regex: Object.values(UNIT_PATTERNS).map(p => p.source).join('|'), $options: 'i' } },
        { 'ingredients.quantity': { $regex: Object.values(UNIT_PATTERNS).map(p => p.source).join('|'), $options: 'i' } }
      ]
    });

    console.log(`${cocktails.length} cocktails trouvés avec des unités à convertir.`);
    
    let totalConverted = 0;
    let totalIngredients = 0;
    let skippedIngredients = 0;
    let conversionStats = new Map();
    let problematicCocktails = new Set();
    
    for (const cocktail of cocktails) {
      let hasUpdates = false;
      const updatedIngredients = cocktail.ingredients.map((ingredient: Ingredient) => {
        const { normalizedUnit, additionalInfo } = normalizeUnit(ingredient.unit);
        
        // Vérifier si l'unité est convertible
        if (CONVERSION_FACTORS[normalizedUnit]) {
          let ozQuantity: number | null = null;
          let updatedName = ingredient.name;
          
          // Extraire la quantité
          ozQuantity = extractOzQuantity(ingredient.quantity, ingredient.unit);
          
          // Ajouter les informations additionnelles au nom si nécessaire
          if (additionalInfo) {
            updatedName = `${ingredient.name} (${additionalInfo})`;
          }
          
          if (ozQuantity !== null) {
            totalIngredients++;
            hasUpdates = true;
            
            // Appliquer la conversion
            const conversionFactor = CONVERSION_FACTORS[normalizedUnit];
            const clQuantity = (ozQuantity * conversionFactor).toFixed(1);
            
            // Mettre à jour les statistiques
            conversionStats.set(normalizedUnit, (conversionStats.get(normalizedUnit) || 0) + 1);
            
            return {
              ...ingredient,
              name: updatedName,
              quantity: clQuantity,
              unit: 'cl'
            };
          }
        }
        
        // Cas spéciaux
        if (ingredient.unit.toLowerCase() === 'portion' || 
            ingredient.quantity.toLowerCase() === 'frozen') {
          return ingredient;
        }
        
        // Si on ne peut pas convertir
        if (ingredient.unit && !ingredient.unit.toLowerCase().includes('cl')) {
          skippedIngredients++;
          problematicCocktails.add(cocktail.name);
          console.log(`⚠️ Impossible de convertir : "${ingredient.quantity} ${ingredient.unit}" pour "${ingredient.name}" dans "${cocktail.name}"`);
        }
        
        return ingredient;
      });

      if (hasUpdates) {
        await CocktailModel.findByIdAndUpdate(cocktail._id, {
          ingredients: updatedIngredients
        });

        totalConverted++;
        console.log(`✓ Conversion effectuée pour "${cocktail.name}" (${totalConverted}/${cocktails.length})`);
      }
    }

    // Afficher les statistiques
    console.log('\nStatistiques de conversion :');
    for (const [unit, count] of conversionStats.entries()) {
      console.log(`${unit} -> cl : ${count} conversions`);
    }

    console.log(`\nConversion terminée !`);
    console.log(`${totalConverted} cocktails ont été mis à jour.`);
    console.log(`${totalIngredients} ingrédients ont été convertis en cl.`);
    
    if (skippedIngredients > 0) {
      console.log(`\n${skippedIngredients} ingrédients n'ont pas pu être convertis.`);
      console.log('\nCocktails nécessitant une attention manuelle :');
      Array.from(problematicCocktails).sort().forEach(name => console.log(`- ${name}`));
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Erreur lors de la conversion des unités:', error);
    process.exit(1);
  }
}

// Exécution du script
convertOzToCl(); 