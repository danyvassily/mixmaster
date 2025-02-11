import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cocktail } from '@/data/cocktails';
import { cocktails } from '@/data/cocktails';

const CocktailList: React.FC = () => {
  const [selectedCocktail, setSelectedCocktail] = useState<Cocktail | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = Array.from(new Set(cocktails.map(c => c.categorie)));

  const filteredCocktails = cocktails.filter(cocktail => {
    const matchesSearch = cocktail.nom.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || cocktail.categorie === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Filtres */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Rechercher un cocktail..."
          className="px-4 py-2 rounded-lg bg-gray-800/80 border border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Rechercher un cocktail"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-800/80 border border-gray-700 text-white focus:border-blue-500 focus:outline-none"
          aria-label="Filtrer par catégorie"
        >
          <option value="all">Toutes les catégories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Liste des cocktails */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCocktails.map((cocktail) => (
          <motion.div
            key={cocktail.nom}
            className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 cursor-pointer hover:border-blue-500 transition-colors"
            onClick={() => setSelectedCocktail(cocktail)}
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-xl font-semibold text-blue-400 mb-2">{cocktail.nom}</h3>
            <p className="text-gray-400 mb-2">{cocktail.categorie}</p>
            <p className="text-gray-300 text-sm">
              {cocktail.ingredients.length} ingrédients • {cocktail.verre}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Modal détails du cocktail */}
      <AnimatePresence>
        {selectedCocktail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedCocktail(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-blue-400 mb-4">{selectedCocktail.nom}</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Ingrédients</h3>
                  <ul className="space-y-2">
                    {selectedCocktail.ingredients.map((ing, index) => (
                      <li key={index} className="text-gray-300">
                        • {ing.quantite} {ing.unite} {ing.nom}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Préparation</h3>
                  <ol className="space-y-2">
                    {selectedCocktail.preparation.map((step, index) => (
                      <li key={index} className="text-gray-300">
                        <span className="text-blue-400 font-medium mr-2">{index + 1}.</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="flex flex-wrap gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Verre:</span>
                    <span className="text-gray-300 ml-2">{selectedCocktail.verre}</span>
                  </div>
                  {selectedCocktail.decoration && (
                    <div>
                      <span className="text-gray-400">Décoration:</span>
                      <span className="text-gray-300 ml-2">{selectedCocktail.decoration}</span>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => setSelectedCocktail(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                aria-label="Fermer la recette"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CocktailList; 