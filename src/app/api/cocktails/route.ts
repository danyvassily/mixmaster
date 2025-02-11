import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/utils/mongodb';
import CocktailModel from '@/models/Cocktail';
import { translate } from '@vitalets/google-translate-api';
import { CocktailSchema } from '@/lib/validations/cocktail';
import { ZodError } from 'zod';

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

    const [cocktails, total] = await Promise.all([
      CocktailModel.find(query)
        .sort({ name: 1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      CocktailModel.countDocuments(query)
    ]);

    const formattedCocktails = cocktails.map(cocktail => ({
      ...cocktail,
      _id: cocktail._id.toString()
    }));

    return NextResponse.json({
      cocktails: formattedCocktails,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
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
    
    // Validation avec Zod
    const validatedData = CocktailSchema.parse(body);
    
    await connectDB();
    
    // Traduction des champs si nécessaire
    if (validatedData.description) {
      validatedData.description = await translateText(validatedData.description);
    } else {
      // Création d'une description par défaut en français
      const description = `${validatedData.name} est un cocktail ${validatedData.isAlcoholic ? 'alcoolisé' : 'sans alcool'} de la catégorie ${validatedData.category}.${validatedData.glassType ? ` Il est traditionnellement servi dans ${validatedData.glassType}.` : ''}`;
      validatedData.description = description;
    }
    
    if (validatedData.instructions) {
      validatedData.instructions = await translateText(validatedData.instructions);
    }
    
    const cocktail = new CocktailModel(validatedData);
    await cocktail.save();
    
    return NextResponse.json(cocktail, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création du cocktail:', error);
    
    if (error instanceof ZodError) {
      return NextResponse.json(
        { 
          error: 'Données invalides',
          details: error.errors
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Erreur lors de la création du cocktail' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID du cocktail manquant' },
        { status: 400 }
      );
    }
    
    // Validation partielle avec Zod
    const validatedData = CocktailSchema.partial().parse(updateData);
    
    await connectDB();
    
    // Traduction si nécessaire
    if (validatedData.description) {
      validatedData.description = await translateText(validatedData.description);
    }
    
    if (validatedData.instructions) {
      validatedData.instructions = await translateText(validatedData.instructions);
    }
    
    const updatedCocktail = await CocktailModel.findByIdAndUpdate(
      id,
      validatedData,
      { new: true }
    );
    
    if (!updatedCocktail) {
      return NextResponse.json(
        { error: 'Cocktail non trouvé' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedCocktail);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du cocktail:', error);
    
    if (error instanceof ZodError) {
      return NextResponse.json(
        { 
          error: 'Données invalides',
          details: error.errors
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du cocktail' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID du cocktail manquant' },
        { status: 400 }
      );
    }
    
    await connectDB();
    
    const deletedCocktail = await CocktailModel.findByIdAndDelete(id);
    
    if (!deletedCocktail) {
      return NextResponse.json(
        { error: 'Cocktail non trouvé' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Cocktail supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du cocktail:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du cocktail' },
      { status: 500 }
    );
  }
} 