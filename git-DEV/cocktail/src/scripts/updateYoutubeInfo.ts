import { connectDB } from '@/lib/mongodb';
import Cocktail from '@/models/Cocktail';
import { YouTubeService } from '@/services/youtubeService';

async function updateYoutubeInfo() {
  try {
    await connectDB();
    const cocktails = await Cocktail.find({});
    const youtubeService = new YouTubeService();
    
    console.log(`Mise à jour des informations YouTube pour ${cocktails.length} cocktails...`);
    
    for (const cocktail of cocktails) {
      try {
        console.log(`\nRecherche de vidéo pour ${cocktail.name}...`);
        const youtubeData = await youtubeService.searchCocktailVideo(cocktail.name);
        
        if (youtubeData) {
          cocktail.youtube = youtubeData;
          await cocktail.save();
          console.log('✅ Vidéo trouvée et enregistrée');
          console.log(`   Titre: ${youtubeData.title}`);
          console.log(`   ID: ${youtubeData.videoId}`);
        } else {
          console.log('❌ Aucune vidéo trouvée');
        }
        
        // Petite pause pour respecter les quotas de l'API
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`Erreur pour ${cocktail.name}:`, error);
      }
    }
    
    console.log('\nMise à jour terminée !');
    process.exit(0);
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error);
    process.exit(1);
  }
}

updateYoutubeInfo(); 