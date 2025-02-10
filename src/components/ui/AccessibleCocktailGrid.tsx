import React, { useRef } from 'react';
import { useKeyboardNavigation, useFocusTrap, useAriaAnnouncer } from '@/hooks/useKeyboardNavigation';
import Image from 'next/image';
import Link from 'next/link';

interface Cocktail {
  _id: string;
  name: string;
  category: string;
  image?: string;
  isAlcoholic: boolean;
}

interface Props {
  cocktails: Cocktail[];
  onCocktailSelect?: (cocktail: Cocktail) => void;
}

export function AccessibleCocktailGrid({ cocktails, onCocktailSelect }: Props) {
  const gridRef = useRef<HTMLDivElement>(null);
  const { announce } = useAriaAnnouncer();
  useFocusTrap(gridRef);

  const handleCocktailClick = (cocktail: Cocktail) => {
    onCocktailSelect?.(cocktail);
    announce(`${cocktail.name} sélectionné`);
  };

  // Créer des rangées de cocktails pour la structure ARIA
  const cocktailRows = cocktails.reduce((acc, cocktail, index) => {
    const rowIndex = Math.floor(index / 5); // 5 colonnes max
    if (!acc[rowIndex]) {
      acc[rowIndex] = [];
    }
    acc[rowIndex].push(cocktail);
    return acc;
  }, [] as Cocktail[][]);

  return (
    <div
      ref={gridRef}
      role="grid"
      aria-label="Liste des cocktails"
      className="grid gap-4 md:gap-6"
    >
      {cocktailRows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          role="row"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
        >
          {row.map((cocktail, index) => (
            <div
              key={cocktail._id}
              role="gridcell"
              className="glass-effect rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105 focus-within:ring-2 focus-within:ring-blue-500"
              aria-labelledby={`cocktail-name-${cocktail._id}`}
            >
              <Link
                href={`/routes/cocktails/${cocktail._id}`}
                className="block focus:outline-none"
                onClick={() => handleCocktailClick(cocktail)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCocktailClick(cocktail);
                  }
                }}
              >
                <div className="relative h-48">
                  {cocktail.image ? (
                    <Image
                      src={cocktail.image}
                      alt={`Photo du cocktail ${cocktail.name}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading={rowIndex === 0 && index < 6 ? 'eager' : 'lazy'}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                      <span className="text-gray-400">Pas d'image</span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h2
                    id={`cocktail-name-${cocktail._id}`}
                    className="text-xl font-semibold mb-2 text-white"
                  >
                    {cocktail.name}
                  </h2>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">{cocktail.category}</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        cocktail.isAlcoholic
                          ? 'bg-red-500/20 text-red-300'
                          : 'bg-green-500/20 text-green-300'
                      }`}
                      role="status"
                    >
                      {cocktail.isAlcoholic ? 'Alcoolisé' : 'Sans alcool'}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
} 