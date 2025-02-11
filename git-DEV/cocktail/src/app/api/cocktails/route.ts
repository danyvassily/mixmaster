import { NextResponse } from 'next/server';
import connectDB from '@/lib/utils/mongodb';
import CocktailModel from '@/models/Cocktail';
import { translate } from '@vitalets/google-translate-api';

async function translateText(text: string): Promise<string> {
  try {
    const result = await translate(text, { to: 'fr' });
    return result.text;
  } catch (error) {
    console.error('Erreur lors de la traduction:', error);
    return text;
  }
}

export async function GET() {
  try {
    await connectDB();
    const cocktails = await CocktailModel.find({}).sort({ name: 1 });
    return NextResponse.json(cocktails);
  } catch (error) {
    console.error('Erreur lors de la récupération des cocktails:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des cocktails' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectDB();
    
    // Traduction des champs si nécessaire
    if (body.description) {
      body.description = await translateText(body.description);
    } else {
      // Création d'une description par défaut en français
      const description = `${body.name} est un cocktail ${body.isAlcoholic ? 'alcoolisé' : 'sans alcool'} de la catégorie ${body.category}.${body.glassType ? ` Il est traditionnellement servi dans ${body.glassType}.` : ''}`;
      body.description = description;
    }
    
    if (body.instructions) {
      body.instructions = await translateText(body.instructions);
    }
    
    const cocktail = new CocktailModel(body);
    await cocktail.save();
    
    return NextResponse.json(cocktail, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création du cocktail:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du cocktail' },
      { status: 500 }
    );
  }
} 