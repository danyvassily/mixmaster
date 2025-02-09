'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

interface Cocktail {
  _id: string;
  name: string;
  category: string;
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Cocktail[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();

  const searchCocktails = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchCocktails(query);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, searchCocktails]);

  const handleSelectCocktail = (cocktailId: string) => {
    router.push(`/routes/cocktails/${cocktailId}`);
    setShowResults(false);
    setQuery('');
  };

  // Fermer les résultats quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const searchContainer = document.querySelector('.search-container');
      if (searchContainer && !searchContainer.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-md search-container">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowResults(true);
          }}
          onFocus={() => setShowResults(true)}
          placeholder="Rechercher un cocktail..."
          className="w-full px-4 py-2 pl-10 text-sm bg-black/40 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-400"
        />
        <Search 
          className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
          aria-hidden="true"
        />
      </div>

      {showResults && (query.length > 0 || results.length > 0) && (
        <div className="absolute mt-2 w-full bg-gray-900/95 backdrop-blur-md rounded-lg shadow-lg border border-gray-700 overflow-hidden z-50">
          {isLoading ? (
            <div className="p-4 text-center text-gray-400">
              Recherche en cours...
            </div>
          ) : results.length > 0 ? (
            <ul className="max-h-64 overflow-auto">
              {results.map((cocktail) => (
                <li
                  key={cocktail._id}
                  onClick={() => handleSelectCocktail(cocktail._id)}
                  className="px-4 py-3 hover:bg-gray-800/80 cursor-pointer transition-colors"
                >
                  <div className="text-white font-medium">{cocktail.name}</div>
                  <div className="text-sm text-gray-400">{cocktail.category}</div>
                </li>
              ))}
            </ul>
          ) : query.length > 0 ? (
            <div className="p-4 text-center text-gray-400">
              Aucun résultat trouvé
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
} 