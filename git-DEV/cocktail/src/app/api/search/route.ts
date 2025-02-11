import { NextResponse } from 'next/server';
import connectDB from '@/lib/utils/mongodb';
import CocktailModel from '@/models/Cocktail';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json([]);
    }

    await connectDB();

    const cocktails = await CocktailModel.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
        { 'ingredients.name': { $regex: query, $options: 'i' } }
      ]
    })
    .select('_id name category')
    .limit(10)
    .lean();

    return NextResponse.json(cocktails);
  } catch (error) {
    console.error('Erreur lors de la recherche:', error);
    return NextResponse.json({ error: 'Erreur lors de la recherche' }, { status: 500 });
  }
} 