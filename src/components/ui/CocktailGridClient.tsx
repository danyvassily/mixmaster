'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SearchBar from './SearchBar';

interface Cocktail {
  _id: string;
  name: string;
  category: string;
  image?: string;
  isAlcoholic: boolean;
  ingredients: Array<{ name: string }>;
}

interface Props {
  initialCocktails: Cocktail[];
  totalCocktails: number;
}

gsap.registerPlugin(ScrollTrigger);

const ITEMS_PER_PAGE = 10;
const INITIAL_ITEMS = 15;

export default function CocktailGridClient({ initialCocktails, totalCocktails }: Props) {
  const [displayedCocktails, setDisplayedCocktails] = useState(initialCocktails.slice(0, INITIAL_ITEMS));
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setPage(1);
    setLoading(true);
    try {
      const response = await fetch(`/api/cocktails?page=1&limit=${ITEMS_PER_PAGE}&search=${encodeURIComponent(query)}`);
      const data = await response.json();
      setDisplayedCocktails(data.cocktails);
      
      // Réinitialiser les animations pour les nouveaux résultats
      const cards = containerRef.current?.querySelectorAll('.cocktail-card');
      if (cards) {
        cards.forEach(card => card.classList.remove('animated'));
        gsap.fromTo(cards,
          { 
            opacity: 0, 
            y: 50,
            scale: 0.9
          },
          { 
            opacity: 1, 
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
            onComplete: () => {
              cards.forEach(card => card.classList.add('animated'));
            }
          }
        );
      }
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadMoreCocktails = async () => {
      if (loading) return;
      setLoading(true);
      try {
        const response = await fetch(
          `/api/cocktails?page=${page}&limit=${ITEMS_PER_PAGE}&search=${encodeURIComponent(searchQuery)}`
        );
        const data = await response.json();
        
        if (page === 1) {
          setDisplayedCocktails(data.cocktails);
        } else {
          setDisplayedCocktails(prev => [...prev, ...data.cocktails]);
        }
        
        // Animer les nouveaux éléments
        const newElements = document.querySelectorAll('.cocktail-card:not(.animated)');
        gsap.fromTo(newElements, 
          { 
            opacity: 0, 
            y: 50,
            scale: 0.9
          },
          { 
            opacity: 1, 
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
            onComplete: () => {
              newElements.forEach(el => el.classList.add('animated'));
            }
          }
        );
      } catch (error) {
        console.error('Erreur lors du chargement des cocktails:', error);
      } finally {
        setLoading(false);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !loading && displayedCocktails.length < totalCocktails) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    if (page > 1 || searchQuery) {
      loadMoreCocktails();
    }

    return () => {
      if (loadingRef.current) {
        observer.unobserve(loadingRef.current);
      }
    };
  }, [page, loading, totalCocktails, searchQuery]);

  return (
    <div>
      <SearchBar onSearch={handleSearch} placeholder="Rechercher par nom, ingrédient ou catégorie..." />
      <div ref={containerRef}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {displayedCocktails.map((cocktail) => (
            <Link
              key={cocktail._id}
              href={`/routes/cocktails/${cocktail._id}`}
              className="cocktail-card group glass-effect rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
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
        {displayedCocktails.length === 0 && !loading && (
          <div className="text-center py-8">
            <p className="text-gray-400">Aucun cocktail trouvé</p>
          </div>
        )}
        <div ref={loadingRef} className="h-10 flex items-center justify-center mt-8">
          {loading && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 