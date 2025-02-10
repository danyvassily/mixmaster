'use client';

import CocktailForm from '@/components/ui/CocktailForm';

export default function CreateCocktailPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Créer un nouveau cocktail</h1>
      <CocktailForm />
    </div>
  );
} 