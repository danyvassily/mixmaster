import { NextResponse } from 'next/server';
import Cocktail from '@/models/Cocktail';
import { YouTubeService } from '@/services/youtubeService';
import { connectDB } from '@/lib/mongodb';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const cocktail = await Cocktail.findById(params.id);

    if (!cocktail) {
      return NextResponse.json(
        { error: 'Cocktail non trouvé' },
        { status: 404 }
      );
    }

    const youtubeService = new YouTubeService();
    const youtubeData = await youtubeService.searchCocktailVideo(cocktail.name);

    if (!youtubeData) {
      return NextResponse.json(
        { error: 'Aucune vidéo trouvée' },
        { status: 404 }
      );
    }

    cocktail.youtube = youtubeData;
    await cocktail.save();

    return NextResponse.json(cocktail);
  } catch (error) {
    console.error('Erreur lors de la mise à jour YouTube:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
} 