import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/utils/mongodb';
import CocktailModel from '@/models/Cocktail';
import { translate } from '@vitalets/google-translate-api';
import { Types } from 'mongoose';

async function translateText(text: string): Promise<string> {
  try {
    const result = await translate(text, { to: 'fr' });
    return result.text;
  } catch (error) {
    console.error('Erreur lors de la traduction:', error);
    return text;
  }
}

interface MongooseCocktail {
  _id: Types.ObjectId;
  name: string;
  category: string;
  image?: string;
  isAlcoholic: boolean;
  ingredients: Array<{ name: string }>;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const skip = (page - 1) * limit;

    await connectDB();

    let query = {};
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { 'ingredients.name': { $regex: search, $options: 'i' } },
          { category: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const cocktails = await CocktailModel.find(query)
      .sort({ name: 1 })
      .skip(skip)
      .limit(limit)
      .lean() as MongooseCocktail[];

    const total = await CocktailModel.countDocuments(query);

    const formattedCocktails = cocktails.map(cocktail => ({
      _id: cocktail._id.toString(),
      name: cocktail.name,
      category: cocktail.category,
      image: cocktail.image,
      isAlcoholic: cocktail.isAlcoholic,
      ingredients: cocktail.ingredients
    }));

    return NextResponse.json({
      cocktails: formattedCocktails,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des cocktails:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
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