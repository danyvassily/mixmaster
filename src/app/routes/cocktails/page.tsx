import { Suspense } from 'react';
import Link from 'next/link';
import connectDB from '@/lib/utils/mongodb';
import CocktailModel from '@/models/Cocktail';
import { Types } from 'mongoose';
import CocktailGridClient from '@/components/ui/CocktailGridClient';

interface Cocktail {
  _id: string;
  name: string;
  category: string;
  image?: string;
  isAlcoholic: boolean;
  ingredients: Array<{ name: string }>;
}

interface MongooseCocktail {
  _id: Types.ObjectId;
  name: string;
  category: string;
  image?: string;
  isAlcoholic: boolean;
  ingredients: Array<{ name: string }>;
}

function CocktailSkeleton() {
  return (
    <div className="glass-effect rounded-lg overflow-hidden shadow-lg animate-pulse">
      <div className="h-40 bg-gray-700/50" />
      <div className="p-4">
        <div className="h-5 bg-gray-700/50 rounded mb-2" />
        <div className="h-4 bg-gray-700/50 rounded mb-3 w-24" />
        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-700/50 rounded w-20" />
          <div className="h-4 bg-gray-700/50 rounded w-24" />
        </div>
      </div>
    </div>
  );
}

async function getCocktails(): Promise<{ cocktails: Cocktail[], total: number }> {
  try {
    await connectDB();
    const [cocktails, total] = await Promise.all([
      CocktailModel.find({}).sort({ name: 1 }).lean() as Promise<MongooseCocktail[]>,
      CocktailModel.countDocuments()
    ]);

    const formattedCocktails = cocktails.map(cocktail => ({
      _id: cocktail._id.toString(),
      name: cocktail.name,
      category: cocktail.category,
      image: cocktail.image,
      isAlcoholic: cocktail.isAlcoholic,
      ingredients: cocktail.ingredients
    }));

    return { cocktails: formattedCocktails, total };
  } catch (error) {
    console.error('Erreur lors de la récupération des cocktails:', error);
    return { cocktails: [], total: 0 };
  }
}

export default async function CocktailsPage() {
  const { cocktails, total } = await getCocktails();

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Nos Cocktails
            </h1>
            <p className="text-gray-400">
              Découvrez notre collection de {total} cocktails
            </p>
          </div>
          <Link
            href="/routes/create"
            className="glass-effect px-6 py-3 rounded-full text-white hover:text-blue-400 transition-all duration-300 flex items-center gap-2 group"
          >
            <span>Créer un cocktail</span>
            <svg 
              className="w-4 h-4 transform group-hover:rotate-90 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </Link>
        </div>

        <Suspense fallback={
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {[...Array(15)].map((_, i) => (
              <CocktailSkeleton key={i} />
            ))}
          </div>
        }>
          <CocktailGridClient initialCocktails={cocktails} totalCocktails={total} />
        </Suspense>
      </div>
    </div>
  );
} 