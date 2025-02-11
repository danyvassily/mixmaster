import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { verres, TypeVerre } from '@/data/verres';

const VerrerieSection: React.FC = () => {
  const [selectedVerre, setSelectedVerre] = useState<TypeVerre | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVerres = verres.filter(verre =>
    verre.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    verre.utilisationPour.some(usage => usage.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Barre de recherche */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Rechercher un type de verre ou un cocktail..."
          className="w-full px-4 py-2 rounded-lg bg-gray-800/80 border border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Grille des verres */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVerres.map((verre) => (
          <motion.div
            key={verre.nom}
            className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 cursor-pointer hover:border-blue-500 transition-colors"
            onClick={() => setSelectedVerre(verre)}
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-xl font-semibold text-blue-400 mb-2">{verre.nom}</h3>
            <p className="text-gray-300 mb-2">{verre.contenance}</p>
            <p className="text-gray-400 text-sm mb-2">{verre.description}</p>
            <div className="text-sm text-gray-500">
              Idéal pour : {verre.utilisationPour.slice(0, 3).join(', ')}
              {verre.utilisationPour.length > 3 && '...'}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal détails du verre */}
      {selectedVerre && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedVerre(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-900 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-blue-400 mb-4">{selectedVerre.nom}</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                <p className="text-gray-300">{selectedVerre.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Caractéristiques</h3>
                <ul className="space-y-2">
                  {selectedVerre.caracteristiques.map((carac, index) => (
                    <li key={index} className="text-gray-300 flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      {carac}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Utilisé pour</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedVerre.utilisationPour.map((cocktail, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-sm"
                    >
                      {cocktail}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-sm text-gray-400">
                Contenance : {selectedVerre.contenance}
              </div>
            </div>

            <button
              onClick={() => setSelectedVerre(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              aria-label="Fermer les détails du verre"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default VerrerieSection; 