import connectDB from '@/lib/utils/mongodb';
import CocktailModel from '@/models/Cocktail';
import { translate } from '@vitalets/google-translate-api';

async function translateText(text: string): Promise<string> {
  try {
    const result = await translate(text, { to: 'fr' });
    return result.text;
  } catch (error) {
    console.error('Erreur lors de la traduction:', error);
    return text; // Retourne le texte original en cas d'erreur
  }
}

async function translateDescriptions() {
  try {
    console.log('Connexion à la base de données...');
    await connectDB();
    
    const cocktails = await CocktailModel.find({});
    console.log(`Nombre total de cocktails à traiter : ${cocktails.length}`);
    
    let processed = 0;
    for (const cocktail of cocktails) {
      try {
        if (cocktail.description) {
          console.log(`\nTraduction de la description pour "${cocktail.name}"...`);
          const translatedDescription = await translateText(cocktail.description);
          
          // Mise à jour de la description dans la base de données
          await CocktailModel.findByIdAndUpdate(cocktail._id, {
            description: translatedDescription
          });
          
          processed++;
          console.log(`[${processed}/${cocktails.length}] Description traduite avec succès`);
        }
        
        // Petite pause pour éviter de surcharger l'API
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`Erreur lors du traitement de "${cocktail.name}":`, error);
      }
    }
    
    console.log('\nTraduction terminée !');
    console.log(`Nombre de cocktails traités : ${processed}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Erreur lors de la traduction des descriptions:', error);
    process.exit(1);
  }
}

// Lancement du script
translateDescriptions(); 