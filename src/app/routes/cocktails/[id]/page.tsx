import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import connectDB from '@/lib/utils/mongodb';
import CocktailModel from '@/models/Cocktail';

async function getCocktail(id: string) {
  try {
    await connectDB();
    const cocktail = await CocktailModel.findById(id).lean();
    if (!cocktail) return null;
    return cocktail;
  } catch (error) {
    console.error('Erreur lors de la récupération du cocktail:', error);
    return null;
  }
}

export default async function CocktailPage({
  params,
}: {
  params: { id: string };
}) {
  if (!params?.id) {
    return notFound();
  }

  const cocktail = await getCocktail(params.id);

  if (!cocktail) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <Link
          href="/routes/cocktails"
          className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 group"
        >
          <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Retour aux cocktails
        </Link>

        <div className="glass-effect rounded-2xl overflow-hidden shadow-2xl">
          <div className="md:grid md:grid-cols-2 md:items-start">
            {cocktail.image && (
              <div className="relative h-96 md:h-full min-h-[400px] md:min-h-[600px]">
                <Image
                  src={cocktail.image}
                  alt={cocktail.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            )}

            <div className="p-8 md:p-12">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-4xl font-bold">{cocktail.name}</h1>
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                  cocktail.isAlcoholic 
                    ? 'bg-red-500/80 text-white' 
                    : 'bg-green-500/80 text-white'
                }`}>
                  {cocktail.isAlcoholic ? 'Alcoolisé' : 'Sans alcool'}
                </span>
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Description
                  </h2>
                  <p className="text-gray-300 leading-relaxed">{cocktail.description}</p>
                </div>

                {cocktail.youtube && (
                  <div>
                    <h2 className="text-xl font-semibold mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Tutoriel vidéo
                    </h2>
                    <a 
                      href={`https://www.youtube.com/watch?v=${cocktail.youtube.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative rounded-lg overflow-hidden group hover:ring-2 hover:ring-blue-400 transition-all duration-300"
                    >
                      <Image
                        src={cocktail.youtube.thumbnailUrl}
                        alt={cocktail.youtube.title}
                        width={480}
                        height={360}
                        className="w-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-red-600 rounded-full p-4">
                          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </a>
                  </div>
                )}

                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    Ingrédients
                  </h2>
                  <ul className="space-y-3">
                    {cocktail.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-center bg-black/20 rounded-lg p-3">
                        <span className="w-24 font-medium text-blue-400">{ingredient.quantity} {ingredient.unit}</span>
                        <span className="text-gray-300">{ingredient.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    Instructions
                  </h2>
                  <div className="bg-black/20 rounded-lg p-4">
                    <p className="text-gray-300 leading-relaxed whitespace-pre-line">{cocktail.instructions}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-400 pt-6 border-t border-gray-700">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    {cocktail.category}
                  </div>
                  {cocktail.glassType && (
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      {cocktail.glassType}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 