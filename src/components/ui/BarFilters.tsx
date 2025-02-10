'use client';

import { useState, useEffect } from 'react';

export interface BarFilters {
  priceRange: string[];
  minRating: number;
  specialities: string[];
  sortBy: 'rating' | 'price' | 'distance' | 'default';
}

const defaultFilters: BarFilters = {
  priceRange: [],
  minRating: 0,
  specialities: [],
  sortBy: 'default'
};

interface BarFiltersProps {
  onFilterChange: (filters: BarFilters) => void;
}

export default function BarFilters({ onFilterChange }: BarFiltersProps) {
  const [filters, setFilters] = useState<BarFilters>(defaultFilters);

  const specialities = [
    'Cocktails Signature',
    'Mixologie Moléculaire',
    'Spiritueux Français',
    'Cocktails Classiques',
    'Vins Naturels',
    'Bières Artisanales'
  ];

  const priceRanges = ['€', '€€', '€€€', '€€€€'];

  const handlePriceRangeChange = (price: string) => {
    const newPriceRange = filters.priceRange.includes(price)
      ? filters.priceRange.filter(p => p !== price)
      : [...filters.priceRange, price];
    
    setFilters(prev => ({
      ...prev,
      priceRange: newPriceRange
    }));
  };

  const handleSpecialityChange = (speciality: string) => {
    const newSpecialities = filters.specialities.includes(speciality)
      ? filters.specialities.filter(s => s !== speciality)
      : [...filters.specialities, speciality];
    
    setFilters(prev => ({
      ...prev,
      specialities: newSpecialities
    }));
  };

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Filtres de prix */}
        <div>
          <h3 className="text-white font-semibold mb-3">Prix</h3>
          <div className="flex flex-wrap gap-2">
            {priceRanges.map(price => (
              <button
                key={price}
                onClick={() => handlePriceRangeChange(price)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filters.priceRange.includes(price)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {price}
              </button>
            ))}
          </div>
        </div>

        {/* Filtre de note minimale */}
        <div>
          <h3 className="text-white font-semibold mb-3">Note minimale</h3>
          <input
            type="range"
            min="0"
            max="5"
            step="0.5"
            value={filters.minRating}
            onChange={(e) => setFilters(prev => ({ ...prev, minRating: parseFloat(e.target.value) }))}
            className="w-full accent-blue-600"
          />
          <div className="text-gray-400 text-sm mt-1">
            {filters.minRating} étoiles et plus
          </div>
        </div>

        {/* Tri */}
        <div>
          <h3 className="text-white font-semibold mb-3">Trier par</h3>
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters(prev => ({ 
              ...prev, 
              sortBy: e.target.value as BarFilters['sortBy']
            }))}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
          >
            <option value="default">Par défaut</option>
            <option value="rating">Meilleure note</option>
            <option value="price">Prix croissant</option>
            <option value="distance">Distance</option>
          </select>
        </div>
      </div>

      {/* Spécialités */}
      <div className="mt-6">
        <h3 className="text-white font-semibold mb-3">Spécialités</h3>
        <div className="flex flex-wrap gap-2">
          {specialities.map(speciality => (
            <button
              key={speciality}
              onClick={() => handleSpecialityChange(speciality)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filters.specialities.includes(speciality)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {speciality}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 