'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import Link from 'next/link';

interface Cocktail {
  id: string;
  name: string;
  description: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  createdAt: string;
}

export default function MesCocktails() {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCocktails = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const q = query(
          collection(db, 'cocktails'),
          where('userId', '==', user.uid)
        );

        const querySnapshot = await getDocs(q);
        const cocktailsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Cocktail[];

        setCocktails(cocktailsData);
      } catch (error) {
        console.error('Erreur lors de la récupération des cocktails:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCocktails();
  }, [user]);

  if (loading) return <LoadingSpinner />;

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          Veuillez vous connecter pour voir vos cocktails.
        </div>
      </div>
    );
  }

  if (cocktails.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Vous n'avez pas encore créé de cocktails</h2>
          <Link
            href="/routes/create"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700"
          >
            Créer mon premier cocktail
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Mes Cocktails</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cocktails.map((cocktail) => (
          <Link
            key={cocktail.id}
            href={`/routes/cocktails/${cocktail.id}`}
            className="block group"
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
              <div className="relative h-48">
                <img
                  src={cocktail.image || '/placeholder-cocktail.jpg'}
                  alt={cocktail.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-600">
                  {cocktail.name}
                </h3>
                <p className="text-gray-600 line-clamp-2">{cocktail.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Créé le {new Date(cocktail.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 