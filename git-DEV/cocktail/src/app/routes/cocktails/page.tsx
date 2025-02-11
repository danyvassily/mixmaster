import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import connectDB from '@/lib/utils/mongodb';
import CocktailModel from '@/models/Cocktail';
import { Types } from 'mongoose';

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

async function getCocktails(): Promise<Cocktail[]> {
  try {
    await connectDB();
    const cocktails = await CocktailModel.find({}).sort({ name: 1 }).lean() as MongooseCocktail[];
    return cocktails.map(cocktail => ({
      _id: cocktail._id.toString(),
      name: cocktail.name,
      category: cocktail.category,
      image: cocktail.image,
      isAlcoholic: cocktail.isAlcoholic,
      ingredients: cocktail.ingredients
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des cocktails:', error);
    return [];
  }
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

function CocktailGrid({ cocktails }: { cocktails: Cocktail[] }) {
  if (!cocktails.length) {
    return (
      <div className="text-center text-gray-400 py-12">
        Aucun cocktail trouvé. Commencez par en créer un !
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
      {cocktails.map((cocktail, index) => (
        <Link
          key={cocktail._id}
          href={`/routes/cocktails/${cocktail._id}`}
          className="group glass-effect rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="relative">
            <div className="relative h-40 overflow-hidden">
              {cocktail.image ? (
                <Image
                  src={cocktail.image}
                  alt={cocktail.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="absolute top-2 right-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                cocktail.isAlcoholic 
                  ? 'bg-red-500/80 text-white' 
                  : 'bg-green-500/80 text-white'
              }`}>
                {cocktail.isAlcoholic ? 'Alcoolisé' : 'Sans alcool'}
              </span>
            </div>
          </div>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-1 text-white group-hover:text-blue-400 transition-colors line-clamp-1">
              {cocktail.name}
            </h2>
            <p className="text-sm text-gray-400 mb-2">
              {cocktail.ingredients.length} ingrédients
            </p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500 px-2 py-1 rounded-full bg-gray-800/50">
                {cocktail.category}
              </span>
              <span className="text-sm text-blue-400 group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default async function CocktailsPage() {
  const cocktails = await getCocktails();

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Nos Cocktails
            </h1>
            <p className="text-gray-400">
              Découvrez notre collection de {cocktails.length} cocktails
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
            {[...Array(10)].map((_, i) => (
              <CocktailSkeleton key={i} />
            ))}
          </div>
        }>
          <CocktailGrid cocktails={cocktails} />
        </Suspense>
      </div>
    </div>
  );
} 