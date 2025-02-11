import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { outils, Outil } from '@/data/outils';

const OutilsSection: React.FC = () => {
  const [selectedOutil, setSelectedOutil] = useState<Outil | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategorie, setSelectedCategorie] = useState<string>('all');

  const categories = ["all", "Préparation", "Mesure", "Service", "Accessoire"];

  const filteredOutils = outils.filter(outil => {
    const matchesSearch = 
      outil.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      outil.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      outil.utilisation.some(u => u.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategorie = selectedCategorie === 'all' || outil.categorie === selectedCategorie;
    
    return matchesSearch && matchesCategorie;
  });

  return (
    <div className="space-y-6">
      {/* Filtres */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Rechercher un outil..."
          className="flex-1 px-4 py-2 rounded-lg bg-gray-800/80 border border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={selectedCategorie}
          onChange={(e) => setSelectedCategorie(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-800/80 border border-gray-700 text-white focus:border-blue-500 focus:outline-none"
          aria-label="Filtrer par catégorie"
        >
          <option value="all">Toutes les catégories</option>
          {categories.slice(1).map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Grille des outils */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOutils.map((outil) => (
          <motion.div
            key={outil.nom}
            className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 cursor-pointer hover:border-blue-500 transition-colors"
            onClick={() => setSelectedOutil(outil)}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-semibold text-blue-400">{outil.nom}</h3>
              <span className="px-2 py-1 text-xs rounded-full bg-blue-900/50 text-blue-300">
                {outil.categorie}
              </span>
            </div>
            <p className="text-gray-300 text-sm mb-3">{outil.description}</p>
            <div className="text-sm text-gray-400">
              Utilisations principales : {outil.utilisation.slice(0, 2).join(', ')}
              {outil.utilisation.length > 2 && '...'}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal détails de l'outil */}
      <AnimatePresence>
        {selectedOutil && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedOutil(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-2xl font-bold text-blue-400">{selectedOutil.nom}</h2>
                <span className="px-3 py-1 rounded-full bg-blue-900/50 text-blue-300 text-sm">
                  {selectedOutil.categorie}
                </span>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                  <p className="text-gray-300">{selectedOutil.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Caractéristiques</h3>
                  <ul className="space-y-2">
                    {selectedOutil.caracteristiques.map((carac, index) => (
                      <li key={index} className="text-gray-300 flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        {carac}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Utilisation</h3>
                  <ul className="space-y-2">
                    {selectedOutil.utilisation.map((usage, index) => (
                      <li key={index} className="text-gray-300 flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        {usage}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Conseils d'utilisation</h3>
                  <ul className="space-y-2">
                    {selectedOutil.conseils.map((conseil, index) => (
                      <li key={index} className="text-gray-300 flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        {conseil}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => setSelectedOutil(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                aria-label="Fermer les détails de l'outil"
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

export default OutilsSection; 