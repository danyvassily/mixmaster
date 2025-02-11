import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface IllustrationCardProps {
  title: string;
  description: string;
  imagePath?: string;
  className?: string;
}

const IllustrationCard: React.FC<IllustrationCardProps> = ({
  title,
  description,
  imagePath,
  className = ''
}) => {
  return (
    <motion.div
      className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      {imagePath && (
        <div className="relative h-48 w-full">
          <Image
            src={imagePath}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </motion.div>
  );
};

export default IllustrationCard; 