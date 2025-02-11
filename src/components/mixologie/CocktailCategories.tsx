import React from 'react';
import { motion } from 'framer-motion';

interface CocktailCategory {
  name: string;
  description: string;
  examples: string[];
}

const categories: CocktailCategory[] = [
  {
    name: "Short Drinks",
    description: "Cocktails courts (7 à 10 cl) généralement plus alcoolisés, servis sans glace dans un verre à cocktail.",
    examples: ["Manhattan", "Martini", "Negroni"]
  },
  {
    name: "Long Drinks",
    description: "Cocktails longs (12 cl et plus) moins alcoolisés, servis avec de la glace dans un tumbler.",
    examples: ["Mojito", "Gin Tonic", "Cuba Libre"]
  },
  {
    name: "Sparklings",
    description: "Cocktails pétillants à base de champagne ou de vin effervescent, servis en flûte.",
    examples: ["Kir Royal", "French 75", "Bellini"]
  },
  {
    name: "Shooters",
    description: "Petits cocktails (3 à 6 cl) servis dans un verre à shot, destinés à être bus d'un trait.",
    examples: ["B52", "Kamikaze", "Jägerbomb"]
  },
  {
    name: "Sans Alcool",
    description: "Mocktails élaborés sans alcool, parfaits pour tous les moments de la journée.",
    examples: ["Virgin Mojito", "Shirley Temple", "Virgin Colada"]
  }
];

const CocktailCategories: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-md border border-amber-100"
          >
            <h3 className="text-xl font-semibold text-amber-900 mb-3">
              {category.name}
            </h3>
            <p className="text-gray-600 mb-4">
              {category.description}
            </p>
            <div className="bg-amber-50 p-4 rounded-lg">
              <h4 className="font-medium text-amber-800 mb-2">Exemples:</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {category.examples.map((example, i) => (
                  <li key={i}>{example}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="bg-amber-50 p-6 rounded-lg mt-8">
        <h3 className="text-lg font-semibold text-amber-900 mb-3">
          À Noter
        </h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center">
            <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
            Les proportions et techniques varient selon la catégorie
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
            Adaptez la force et la douceur selon les préférences
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
            La présentation doit être adaptée à la catégorie
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CocktailCategories; 