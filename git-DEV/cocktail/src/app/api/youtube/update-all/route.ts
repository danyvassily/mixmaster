import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Cocktail from '@/models/Cocktail';
import { YouTubeService } from '@/services/youtubeService';

export async function POST() {
  try {
    await connectDB();
    const cocktails = await Cocktail.find({});
    const youtubeService = new YouTubeService();
    const results = [];
    
    for (const cocktail of cocktails) {
      try {
        const youtubeData = await youtubeService.searchCocktailVideo(cocktail.name);
        
        if (youtubeData) {
          cocktail.youtube = youtubeData;
          await cocktail.save();
          results.push({
            name: cocktail.name,
            status: 'success',
            video: youtubeData
          });
        } else {
          results.push({
            name: cocktail.name,
            status: 'not_found'
          });
        }
        
        // Petite pause pour respecter les quotas de l'API
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        results.push({
          name: cocktail.name,
          status: 'error',
          error: error.message
        });
      }
    }
    
    return NextResponse.json({
      total: cocktails.length,
      results
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour YouTube:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
} 