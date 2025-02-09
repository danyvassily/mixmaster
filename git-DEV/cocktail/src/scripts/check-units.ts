import connectDB from '../lib/utils/mongodb';
import CocktailModel from '../models/Cocktail';

async function checkUnits() {
  try {
    console.log('Connexion à la base de données...');
    await connectDB();
    
    const cocktails = await CocktailModel.find({});
    console.log(`\nNombre total de cocktails : ${cocktails.length}`);
    
    // Collecter toutes les unités uniques
    const units = new Set();
    cocktails.forEach(cocktail => {
      cocktail.ingredients.forEach(ingredient => {
        if (ingredient.unit) {
          units.add(ingredient.unit.toLowerCase());
        }
      });
    });
    
    console.log('\nUnités utilisées dans la base de données :');
    console.log(Array.from(units).sort());
    
    // Afficher quelques exemples de cocktails avec leurs ingrédients
    console.log('\nExemples de cocktails avec leurs ingrédients :');
    cocktails.slice(0, 5).forEach(cocktail => {
      console.log(`\n${cocktail.name}:`);
      cocktail.ingredients.forEach(ing => {
        console.log(`- ${ing.quantity} ${ing.unit} ${ing.name}`);
      });
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Erreur lors de la vérification des unités:', error);
    process.exit(1);
  }
}

// Exécution du script
checkUnits(); 