'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Bar } from '@/models/Bar';
import BarFilters, { BarFilters as IBarFilters } from '@/components/ui/BarFilters';

// Données temporaires pour la démonstration
const MOCK_BARS: Bar[] = [
  {
    id: '1',
    name: 'Fréquence',
    address: '20 rue Keller, Paris 11e',
    description: 'Bar aux influences nippones proposant des cocktails millimétrés, une ambiance funk des années 80 et de délicieuses petites assiettes.',
    rating: 5.0,
    specialties: ['Cocktails Signature', 'Cuisine Japonaise', 'Vinyles'],
    imageUrl: '/images/bars/frequence.jpg',
    priceRange: '€€'
  },
  {
    id: '2',
    name: 'Danico',
    address: '6 rue Vivienne, Paris 2e',
    description: 'Bar velours et marbre caché au fond du restaurant Daroco, proposant des cocktails érudits avec des techniques innovantes comme la clarification et la distillation.',
    rating: 5.0,
    specialties: ['Cocktails Créatifs', 'Mixologie Moléculaire'],
    imageUrl: '/images/bars/danico.jpg',
    priceRange: '€€€'
  },
  {
    id: '3',
    name: 'Cambridge Public House',
    address: '8 rue de Poitou, Paris 3e',
    description: 'Un pub anglais revisité avec une approche éco-responsable des cocktails, utilisant des ingrédients de saison et locaux.',
    rating: 5.0,
    specialties: ['Cocktails Durables', 'Pub', 'Produits Locaux'],
    imageUrl: '/images/bars/cambridge.jpg',
    priceRange: '€'
  },
  {
    id: '4',
    name: 'Andy Wahloo',
    address: '69 rue des Gravilliers, Paris 3e',
    description: 'Bar élégant aux influences maghrébines et orientales, avec une piste de danse disco et une ambiance qui se délure en soirée.',
    rating: 4.0,
    specialties: ['Cocktails Orientaux', 'Danse', 'Ambiance Festive'],
    imageUrl: '/images/bars/andy-wahloo.jpg',
    priceRange: '€€€'
  },
  {
    id: '5',
    name: 'Bluebird',
    address: '12 rue Saint-Bernard, Paris 11e',
    description: 'Bar moderniste années 50 avec pierres de lave et aquarium iconique, proposant des cocktails inventifs dans une ambiance rétro.',
    rating: 4.0,
    specialties: ['Cocktails Classiques', 'Ambiance Rétro'],
    imageUrl: '/images/bars/bluebird.jpg',
    priceRange: '€€'
  },
  {
    id: '6',
    name: 'Monsieur Antoine',
    address: '17 avenue Parmentier, Paris 11e',
    description: 'Bar à cocktails de quartier élégant avec une déco bois et métal, proposant des créations originales à prix raisonnables.',
    rating: 5.0,
    specialties: ['Cocktails Signature', 'Bar de Quartier'],
    imageUrl: '/images/bars/monsieur-antoine.jpg',
    priceRange: '€€'
  },
  {
    id: '7',
    name: 'Divine',
    address: '61 rue d\'Hauteville, Paris 10e',
    description: 'Diner moderniste avec boule à facettes et ambiance hip-hop, servant des cocktails voyageurs et une cuisine réconfortante.',
    rating: 4.0,
    specialties: ['Cocktails Créatifs', 'Street Food', 'Ambiance Hip-Hop'],
    imageUrl: '/images/bars/divine.jpg',
    priceRange: '€€'
  },
  {
    id: '8',
    name: 'Little Red Door',
    address: '60 rue Charlot, Paris 3e',
    description: 'Un des bars les plus réputés de Paris, reconnu internationalement pour ses cocktails créatifs et son ambiance intimiste.',
    rating: 4.9,
    specialties: ['Cocktails Signature', 'Bar Caché'],
    imageUrl: '/images/bars/little-red-door.jpg',
    priceRange: '€€€'
  },
  {
    id: '9',
    name: 'Le Syndicat',
    address: '51 rue du Faubourg Saint-Denis, Paris 10e',
    description: 'Bar spécialisé dans les spiritueux français avec une ambiance underground unique.',
    rating: 4.8,
    specialties: ['Spiritueux Français', 'Cocktails Créatifs'],
    imageUrl: '/images/bars/le-syndicat.jpg',
    priceRange: '€€'
  },
  {
    id: '10',
    name: 'Candelaria',
    address: '52 rue de Saintonge, Paris 3e',
    description: 'Speakeasy caché derrière une taqueria, proposant des cocktails inspirés de la mixologie mexicaine.',
    rating: 4.7,
    specialties: ['Cocktails Mexicains', 'Tacos', 'Bar Caché'],
    imageUrl: '/images/bars/candelaria.jpg',
    priceRange: '€€'
  },
  {
    id: '11',
    name: 'Combat',
    address: '63 rue de Belleville, Paris 19e',
    description: 'Bar à cocktails moderne et chaleureux proposant des créations originales à base de produits de saison.',
    rating: 4.6,
    specialties: ['Cocktails de Saison', 'Bar de Quartier'],
    imageUrl: '/images/bars/combat.jpg',
    priceRange: '€€'
  },
  {
    id: '12',
    name: 'Sherry Butt',
    address: '20 rue Beautreillis, Paris 4e',
    description: 'Bar à cocktails et à whiskies dans une ancienne boucherie, ambiance tamisée et canapés confortables.',
    rating: 4.7,
    specialties: ['Whiskies', 'Cocktails Signature'],
    imageUrl: '/images/bars/sherry-butt.jpg',
    priceRange: '€€€'
  },
  {
    id: '13',
    name: 'Bisou',
    address: '15 boulevard du Temple, Paris 3e',
    description: 'Bar sans carte où les cocktails sont créés sur mesure selon vos goûts et envies.',
    rating: 4.8,
    specialties: ['Cocktails Sur Mesure', 'Bar Créatif'],
    imageUrl: '/images/bars/bisou.jpg',
    priceRange: '€€'
  },
  {
    id: '14',
    name: 'Le Comptoir Général',
    address: '80 quai de Jemmapes, Paris 10e',
    description: 'Bar colonial dans un lieu atypique, proposant des cocktails exotiques et une ambiance unique.',
    rating: 4.5,
    specialties: ['Cocktails Exotiques', 'Décor Unique'],
    imageUrl: '/images/bars/comptoir-general.jpg',
    priceRange: '€€'
  },
  {
    id: '15',
    name: 'Lulu White',
    address: '12 rue Frochot, Paris 9e',
    description: 'Bar à absinthe inspiré des années folles, avec musique live et cocktails d\'époque.',
    rating: 4.6,
    specialties: ['Absinthe', 'Jazz Live'],
    imageUrl: '/images/bars/lulu-white.jpg',
    priceRange: '€€'
  },
  {
    id: '16',
    name: 'La Mezcaleria',
    address: '13 boulevard du Temple, Paris 3e',
    description: 'Bar spécialisé en mezcal et tequila, caché derrière le restaurant Café Chilango.',
    rating: 4.7,
    specialties: ['Mezcal', 'Tequila', 'Bar Caché'],
    imageUrl: '/images/bars/mezcaleria.jpg',
    priceRange: '€€'
  },
  {
    id: '17',
    name: 'Le Perchoir Marais',
    address: '33 rue de la Verrerie, Paris 4e',
    description: 'Rooftop bar avec vue panoramique sur Paris, cocktails raffinés et ambiance décontractée.',
    rating: 4.5,
    specialties: ['Vue Panoramique', 'Cocktails Signature'],
    imageUrl: '/images/bars/perchoir-marais.jpg',
    priceRange: '€€€'
  },
  {
    id: '18',
    name: 'Dramä',
    address: '48 rue de l\'Échiquier, Paris 10e',
    description: 'Bar festif proposant une ambiance décontractée avec karaoké et événements culturels. Cocktails abordables (max 13€) et petites assiettes à partager dans un cadre mi-cosy mi-industriel.',
    rating: 4.5,
    specialties: ['Karaoké', 'Cocktails Abordables', 'Ambiance Festive'],
    imageUrl: '/images/bars/drama.jpg',
    priceRange: '€'
  },
  {
    id: '19',
    name: 'Tiger',
    address: '13 rue Princesse, Paris 6e',
    description: 'Premier bar à gin de Paris avec plus de 130 références, dirigé par Lorenzo Dos Santos. Un refuge urbain décoré avec goût proposant des Gin&Tonic d\'exception et des cocktails signature originaux.',
    rating: 4.8,
    specialties: ['Gin', 'Cocktails Signature', 'Bar Spécialisé'],
    imageUrl: '/images/bars/tiger.jpg',
    priceRange: '€€€'
  },
  {
    id: '20',
    name: 'Le Vieux Carré',
    address: '108 rue Amelot, Paris 11e',
    description: 'Bar à cocktails aux airs de speakeasy, nommé d\'après un cocktail mythique de la Nouvelle-Orléans. Ambiance feutrée et cocktails créatifs comme le Douce Flamme au gin et à la framboise.',
    rating: 4.7,
    specialties: ['Cocktails Créatifs', 'Ambiance Speakeasy', 'Tapas'],
    imageUrl: '/images/bars/vieux-carre.jpg',
    priceRange: '€€'
  },
  {
    id: '21',
    name: 'Lavomatic',
    address: '30 rue René Boulanger, Paris 10e',
    description: 'Bar caché à l\'étage d\'une laverie, concept unique avec des balançoires en bois et une ambiance colorée. Cocktails créatifs dans un cadre original.',
    rating: 4.6,
    specialties: ['Bar Caché', 'Décor Original', 'Cocktails Créatifs'],
    imageUrl: '/images/bars/lavomatic.jpg',
    priceRange: '€€'
  },
  {
    id: '22',
    name: 'Dirty Dick',
    address: '10 rue Frochot, Paris 9e',
    description: 'Bar tiki proposant une large sélection de rhums dans une ambiance hawaïenne kitsch. Parfait pour s\'évader le temps d\'une soirée.',
    rating: 4.5,
    specialties: ['Rhums', 'Cocktails Tiki', 'Ambiance Hawaïenne'],
    imageUrl: '/images/bars/dirty-dick.jpg',
    priceRange: '€€'
  },
  {
    id: '23',
    name: 'Moonshiner',
    address: '5 rue Sedaine, Paris 11e',
    description: 'Bar secret caché derrière une pizzeria, dans un style prohibition avec une impressionnante carte de whiskies et des cocktails d\'époque.',
    rating: 4.8,
    specialties: ['Whiskies', 'Bar Caché', 'Ambiance Prohibition'],
    imageUrl: '/images/bars/moonshiner.jpg',
    priceRange: '€€'
  },
  {
    id: '24',
    name: 'Café Moderne',
    address: '19 rue Keller, Paris 11e',
    description: 'Haut lieu du cocktail où officient des bartenders de renommée mondiale comme Jennifer le Nechet. Cocktails inventifs accompagnés de délicieuses boulettes.',
    rating: 4.9,
    specialties: ['Cocktails Signature', 'Cuisine', 'Bartenders Étoilés'],
    imageUrl: '/images/bars/cafe-moderne.jpg',
    priceRange: '€€€'
  },
  {
    id: '25',
    name: 'La Bonhomie',
    address: '22 rue d\'Enghien, Paris 10e',
    description: 'Grand espace de 200m² chaleureux avec bar central proposant des cocktails originaux et une cuisine méditerranéenne raffinée. Ambiance conviviale et équipe sympathique.',
    rating: 4.7,
    specialties: ['Cocktails Créatifs', 'Cuisine Méditerranéenne', 'Grande Capacité'],
    imageUrl: '/images/bars/bonhomie.jpg',
    priceRange: '€€'
  }
];

export default function BarsPage() {
  const [bars] = useState<Bar[]>(MOCK_BARS);
  const [filteredBars, setFilteredBars] = useState<Bar[]>(MOCK_BARS);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<IBarFilters>({
    priceRange: [],
    minRating: 0,
    specialities: [],
    sortBy: 'default'
  });

  useEffect(() => {
    let filtered = [...bars];

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(bar => 
        bar.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bar.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bar.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtre par prix
    if (activeFilters.priceRange.length > 0) {
      filtered = filtered.filter(bar => activeFilters.priceRange.includes(bar.priceRange || ''));
    }

    // Filtre par note minimale
    if (activeFilters.minRating > 0) {
      filtered = filtered.filter(bar => bar.rating >= activeFilters.minRating);
    }

    // Filtre par spécialités
    if (activeFilters.specialities.length > 0) {
      filtered = filtered.filter(bar =>
        bar.specialties.some(specialty => activeFilters.specialities.includes(specialty))
      );
    }

    // Tri
    switch (activeFilters.sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'price':
        filtered.sort((a, b) => (a.priceRange?.length || 0) - (b.priceRange?.length || 0));
        break;
      // Le tri par distance sera implémenté plus tard
    }

    setFilteredBars(filtered);
  }, [searchTerm, activeFilters, bars]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">
        Découvrez les Meilleurs Bars à Cocktails
      </h1>

      {/* Barre de recherche */}
      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Rechercher un bar..."
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Filtres */}
      <BarFilters onFilterChange={setActiveFilters} />

      {/* Grille des bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBars.map((bar) => (
          <div
            key={bar.id}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="relative h-48">
              <Image
                src={bar.imageUrl}
                alt={`Photo du bar ${bar.name}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-2">{bar.name}</h2>
              <p className="text-gray-400 text-sm mb-4">{bar.address}</p>
              <p className="text-gray-300 mb-4">{bar.description}</p>

              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`w-5 h-5 ${
                      index < Math.floor(bar.rating)
                        ? 'text-yellow-400'
                        : 'text-gray-600'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-gray-400">{bar.rating}/5</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {bar.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBars.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          <p>Aucun bar ne correspond à vos critères.</p>
        </div>
      )}
    </div>
  );
} 