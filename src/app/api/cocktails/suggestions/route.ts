import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/utils/mongodb';
import CocktailModel from '@/models/Cocktail';
import { handleApiError } from '@/lib/services/errorService';

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get('query') || '';
    if (!query.trim()) {
      return NextResponse.json([]);
    }

    await connectDB();

    // Recherche des cocktails
    const cocktails = await CocktailModel.find({
      name: { $regex: query, $options: 'i' }
    })
    .select('_id name category')
    .limit(5)
    .lean();

    // Recherche des ingrédients uniques
    const ingredients = await CocktailModel.aggregate([
      { $unwind: '$ingredients' },
      { $match: { 'ingredients.name': { $regex: query, $options: 'i' } } },
      { $group: { _id: '$ingredients.name', name: { $first: '$ingredients.name' } } },
      { $limit: 3 }
    ]);

    // Recherche des catégories uniques
    const categories = await CocktailModel.aggregate([
      { $match: { category: { $regex: query, $options: 'i' } } },
      { $group: { _id: '$category', name: { $first: '$category' } } },
      { $limit: 2 }
    ]);

    // Formater les résultats
    const suggestions = [
      ...cocktails.map(c => ({
        _id: c._id.toString(),
        name: c.name,
        category: c.category,
        type: 'cocktail' as const
      })),
      ...ingredients.map(i => ({
        _id: i._id,
        name: i.name,
        category: 'Ingrédient',
        type: 'ingredient' as const
      })),
      ...categories.map(c => ({
        _id: c._id,
        name: c.name,
        category: 'Catégorie',
        type: 'category' as const
      }))
    ];

    return NextResponse.json(suggestions);
  } catch (error) {
    console.error('Erreur lors de la récupération des suggestions:', error);
    const apiError = handleApiError(error);
    return NextResponse.json(
      { error: apiError.message },
      { status: apiError.status }
    );
  }
} 