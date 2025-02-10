import connectDB from '../lib/utils/mongodb';
import CocktailModel from '../models/Cocktail';
import { Document } from 'mongoose';

interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
}

interface Cocktail extends Document {
  name: string;
  ingredients: Ingredient[];
  instructions: string;
  description?: string;
  category: string;
  image?: string;
  glassType?: string;
  isAlcoholic?: boolean;
}

async function checkTranslations() {
  try {
    await connectDB();
    const cocktails = await CocktailModel.find({}).limit(5).lean();
    
    console.log('Échantillon de cocktails traduits :');
    cocktails.forEach((cocktail: any) => {
      console.log('\n===================================');
      console.log(`🍸 Nom: ${cocktail.name}`);
      console.log('\n📝 Informations:');
      console.log(`• Catégorie: ${cocktail.category}`);
      console.log(`• Type de verre: ${cocktail.glassType}`);
      console.log(`• ${cocktail.isAlcoholic ? '🔞 Contient de l\'alcool' : '✅ Sans alcool'}`);
      
      console.log('\n📋 Description:');
      console.log(cocktail.description);
      
      console.log('\n🧂 Ingrédients:');
      if (cocktail.ingredients) {
        cocktail.ingredients.forEach((ing: Ingredient) => {
          console.log(`• ${ing.quantity} ${ing.unit} de ${ing.name}`);
        });
      }
      
      console.log('\n👨‍🍳 Instructions de préparation:');
      console.log(cocktail.instructions);
    });
    
    console.log('\n===================================');
    const total = await CocktailModel.countDocuments();
    console.log(`\n📊 Statistiques:`);
    console.log(`• Nombre total de cocktails dans la base: ${total}`);
    
    const alcoholic = await CocktailModel.countDocuments({ isAlcoholic: true });
    console.log(`• Cocktails avec alcool: ${alcoholic}`);
    console.log(`• Cocktails sans alcool: ${total - alcoholic}`);
  } catch (error) {
    console.error('Erreur:', error);
  }
  process.exit(0);
}

checkTranslations(); 