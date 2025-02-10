import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Bar } from '@/models/Bar';

interface BarCardProps {
  bar: Bar;
  onClick?: () => void;
}

const BarCard: React.FC<BarCardProps> = ({ bar, onClick }) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
    >
      <div className="relative h-48 w-full">
        <Image
          src={bar.imageUrl}
          alt={bar.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full">
          <div className="flex items-center space-x-1">
            <span className="text-yellow-400 material-icons text-sm">star</span>
            <span className="text-sm font-semibold">{bar.rating}</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{bar.name}</h3>
        
        <div className="space-y-2">
          <p className="text-sm text-gray-600 line-clamp-2">{bar.description}</p>
          
          <div className="flex items-center text-gray-500 text-sm">
            <span className="material-icons text-purple-600 text-lg mr-1">location_on</span>
            <span className="line-clamp-1">{bar.address}</span>
          </div>
          
          <div className="flex items-center text-gray-500 text-sm">
            <span className="material-icons text-purple-600 text-lg mr-1">schedule</span>
            <span>{bar.openingHours}</span>
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <span className="text-purple-600 font-semibold">{bar.priceRange}</span>
            <span className="text-sm text-gray-500">{bar.speciality}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BarCard; 