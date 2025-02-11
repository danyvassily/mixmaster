'use client';

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import TipsSection from '@/components/mixologie/TipsSection';
import CocktailCategories from '@/components/mixologie/CocktailCategories';
import SearchBar from '@/components/mixologie/SearchBar';
import CocktailList from '@/components/mixologie/CocktailList';
import VerrerieSection from '@/components/mixologie/VerrerieSection';
import OutilsSection from '@/components/mixologie/OutilsSection';

// Types pour nos sections
type Section = {
  id: string;
  title: string;
  content: React.ReactNode;
};

const MixologiePage = () => {
  const [activeSection, setActiveSection] = useState('histoire');
  const [searchTerm, setSearchTerm] = useState('');

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  };

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term.toLowerCase());
    // Trouver la section la plus pertinente basée sur le terme de recherche
    const sectionKeywords: { [key: string]: string[] } = {
      histoire: ['histoire', 'origines', 'évolution', 'kir', 'hemingway', 'negroni'],
      regles: ['règles', 'base', 'classiques', 'ingrédients', 'dosage'],
      categories: ['catégories', 'short drinks', 'long drinks', 'sparklings', 'shooters'],
      verres: ['verres', 'cocktail', 'tumbler', 'flûte', 'champagne'],
      techniques: ['techniques', 'shaker', 'mélange', 'préparation'],
      conseils: ['conseils', 'astuces', 'organisation', 'matériel', 'température']
    };

    for (const [section, keywords] of Object.entries(sectionKeywords)) {
      if (keywords.some(keyword => term.toLowerCase().includes(keyword))) {
        setActiveSection(section);
        break;
      }
    }
  }, []);

  const sections: Section[] = [
    {
      id: 'histoire',
      title: 'Histoire de la Mixologie',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4 text-white">Origines et Évolution</h3>
          <p className="text-gray-300">
            L&apos;art de la mixologie est intrinsèquement lié à la célébration et au plaisir. 
            Les cocktails, qu&apos;ils soient alcoolisés ou non, sont souvent au cœur des festivités.
          </p>
          <div className="bg-gray-800/50 p-4 rounded-lg mt-4 border border-gray-700">
            <h4 className="font-semibold mb-2 text-white">Personnalités Marquantes</h4>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li><span className="font-medium text-blue-400">Félix Kir</span> - Chanoine et maire de Dijon, créateur du fameux Kir</li>
              <li><span className="font-medium text-blue-400">Ernest Hemingway</span> - Inspiration du "Papa Doble" à La Havane</li>
              <li><span className="font-medium text-blue-400">Comte Camillo Negroni</span> - Créateur du cocktail Negroni en 1919</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'regles',
      title: 'Règles de Base',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4 text-white">Les 10 Règles Essentielles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Maîtriser les classiques",
              "Une seule eau-de-vie de base",
              "Maximum 6 ingrédients",
              "Maximum 7 cl d'alcool",
              "Équilibre des '3 S' (Sweet, Sour, Strong)",
              "Décoration comestible",
              "Ordre de confection précis",
              "Mesures en cl ou ml",
              "Adapter le dosage à la verrerie",
              "Glace de qualité"
            ].map((rule, index) => (
              <div key={index} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <span className="font-semibold text-blue-400">#{index + 1}</span> <span className="text-gray-300">{rule}</span>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'categories',
      title: 'Catégories',
      content: <CocktailCategories />
    },
    {
      id: 'cocktails',
      title: 'Recettes',
      content: <CocktailList />
    },
    {
      id: 'verres',
      title: 'Verrerie',
      content: <VerrerieSection />
    },
    {
      id: 'techniques',
      title: 'Techniques',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4 text-white">Méthodes de Préparation</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Au Shaker",
                steps: [
                  "Remplir de glace",
                  "Verser les ingrédients",
                  "Frapper 15-20 secondes",
                  "Filtrer dans le verre"
                ]
              },
              {
                name: "Au Verre à Mélange",
                steps: [
                  "Remplir de glace",
                  "Verser les ingrédients",
                  "Mélanger délicatement",
                  "Filtrer dans le verre"
                ]
              },
              {
                name: "Direct au Verre",
                steps: [
                  "Ajouter la glace",
                  "Verser les ingrédients",
                  "Mélanger si nécessaire",
                  "Décorer"
                ]
              }
            ].map((technique, index) => (
              <div key={index} className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <h4 className="font-semibold text-lg mb-3 text-blue-400">{technique.name}</h4>
                <ul className="space-y-2">
                  {technique.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-center text-gray-300">
                      <span className="w-6 h-6 rounded-full bg-blue-900/50 text-blue-400 flex items-center justify-center mr-2 text-sm">
                        {stepIndex + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'conseils',
      title: 'Conseils Pratiques',
      content: <TipsSection />
    },
    {
      id: 'outils',
      title: 'Outils',
      content: <OutilsSection />
    }
  ];

  return (
    <motion.div 
      className="min-h-screen bg-black/90 p-6 md:p-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
          L&apos;Art de la <span className="text-blue-400">Mixologie</span>
        </h1>

        {/* Barre de recherche */}
        <SearchBar 
          onSearch={handleSearch}
          placeholder="Rechercher des techniques, verres, conseils..."
        />
        
        {/* Navigation */}
        <div className="flex flex-wrap gap-4 mb-8">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-6 py-2 rounded-full transition-all ${
                activeSection === section.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>

        {/* Contenu */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-lg border border-gray-800"
        >
          {sections.find(s => s.id === activeSection)?.content}
        </motion.div>

        {/* Bouton retour en haut */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Retour en haut"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default MixologiePage; 