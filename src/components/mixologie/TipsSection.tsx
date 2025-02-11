import React from 'react';
import { motion } from 'framer-motion';

interface Tip {
  title: string;
  description: string;
  category: string;
}

const tips: Tip[] = [
  {
    category: "Préparation",
    title: "Organisation du matériel",
    description: "Préparez tout votre matériel et vos ingrédients avant de commencer. Cette mise en place (ou 'mise en place' en français) est cruciale pour un service fluide."
  },
  {
    category: "Préparation",
    title: "Qualité des ingrédients",
    description: "Utilisez toujours des ingrédients frais et de qualité. La qualité de vos cocktails dépend directement de celle de vos ingrédients."
  },
  {
    category: "Technique",
    title: "Mesures précises",
    description: "Utilisez toujours des doseurs pour mesurer vos ingrédients. La précision est la clé d'un cocktail équilibré."
  },
  {
    category: "Technique",
    title: "Température",
    description: "Servez toujours vos cocktails à la bonne température. Refroidissez vos verres à l'avance si nécessaire."
  },
  {
    category: "Présentation",
    title: "Garniture",
    description: "La garniture doit être fraîche et comestible. Elle doit compléter le cocktail, pas simplement le décorer."
  },
  {
    category: "Présentation",
    title: "Propreté",
    description: "Gardez votre espace de travail propre et organisé. Essuyez les bords du verre avant de servir."
  }
];

const TipsSection: React.FC = () => {
  const categories = Array.from(new Set(tips.map(tip => tip.category)));

  return (
    <div className="space-y-8">
      {categories.map((category, categoryIndex) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: categoryIndex * 0.2 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-semibold text-white">{category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tips
              .filter(tip => tip.category === category)
              .map((tip, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gray-800/50 p-6 rounded-lg shadow-md border border-gray-700"
                >
                  <h4 className="font-semibold text-lg mb-2 text-blue-400">
                    {tip.title}
                  </h4>
                  <p className="text-gray-300">
                    {tip.description}
                  </p>
                </motion.div>
              ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TipsSection; 