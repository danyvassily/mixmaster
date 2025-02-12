import React from 'react';
import { motion } from 'framer-motion';
import { Bar } from '@/models/Bar';

interface BarCardProps {
  bar: Bar;
  onClick?: () => void;
}

const BarCard: React.FC<BarCardProps> = ({ bar, onClick }) => {
  return (
    <motion.div
      className="bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden cursor-pointer border border-gray-800"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-white mb-2">{bar.name}</h3>
          <div className="bg-amber-400/20 px-3 py-1 rounded-full">
            <div className="flex items-center space-x-1">
              <span className="text-amber-400 material-icons text-sm">star</span>
              <span className="text-sm font-semibold text-white">{bar.rating}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <p className="text-sm text-gray-300 line-clamp-2">{bar.description}</p>
          
          <div className="flex items-center text-gray-300 text-sm">
            <span className="material-icons text-amber-400 text-lg mr-2">location_on</span>
            <span className="line-clamp-1">{bar.address}</span>
          </div>
          
          {bar.openingHours && (
            <div className="flex items-center text-gray-300 text-sm">
              <span className="material-icons text-amber-400 text-lg mr-2">schedule</span>
              <span>{bar.openingHours}</span>
            </div>
          )}
          
          <div className="flex flex-wrap gap-2 mt-3">
            {bar.specialties?.map((specialty, index) => (
              <span 
                key={index}
                className="text-xs px-2 py-1 rounded-full bg-amber-400/10 text-amber-400"
              >
                {specialty}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-700">
            <span className="text-amber-400 font-semibold">{bar.priceRange}</span>
            <motion.button
              className="text-sm px-4 py-1 rounded-full bg-amber-400/20 text-amber-400 hover:bg-amber-400/30 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Plus d'infos
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BarCard; 