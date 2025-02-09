'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
}

export default function CocktailForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    instructions: '',
    ingredients: [{ name: '', quantity: '', unit: '' }],
    image: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleIngredientChange = (index: number, field: keyof Ingredient, value: string) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { name: '', quantity: '', unit: '' }],
    });
  };

  const removeIngredient = (index: number) => {
    const newIngredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await fetch('/api/cocktails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, isCustom: true }),
      });

      if (response.ok) {
        router.push('/routes/cocktails');
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Erreur lors de la création du cocktail');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setError(error instanceof Error ? error.message : 'Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 mb-4 text-red-500 bg-red-100 rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="cocktail-name" className="block text-sm font-medium mb-2">
          Nom du cocktail
        </label>
        <input
          id="cocktail-name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          placeholder="Entrez le nom du cocktail"
          title="Nom du cocktail"
          disabled={isSubmitting}
          required
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium mb-2">
          Catégorie
        </label>
        <input
          id="category"
          type="text"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          placeholder="Ex: Cocktail classique, Sans alcool, etc."
          title="Catégorie du cocktail"
          disabled={isSubmitting}
          required
        />
      </div>

      <div>
        <label htmlFor="image-url" className="block text-sm font-medium mb-2">
          URL de l'image
        </label>
        <input
          id="image-url"
          type="url"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          placeholder="https://exemple.com/image.jpg"
          title="URL de l'image du cocktail"
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Ingrédients
        </label>
        {formData.ingredients.map((ingredient, index) => (
          <div key={index} className="flex gap-4 mb-4">
            <input
              type="text"
              value={ingredient.name}
              onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
              placeholder="Nom de l'ingrédient"
              title={`Nom de l'ingrédient ${index + 1}`}
              className="flex-1 px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              disabled={isSubmitting}
              required
            />
            <input
              type="text"
              value={ingredient.quantity}
              onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
              placeholder="Quantité"
              title={`Quantité de l'ingrédient ${index + 1}`}
              className="w-24 px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              disabled={isSubmitting}
              required
            />
            <input
              type="text"
              value={ingredient.unit}
              onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
              placeholder="Unité"
              title={`Unité de l'ingrédient ${index + 1}`}
              className="w-24 px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              disabled={isSubmitting}
              required
            />
            {formData.ingredients.length > 1 && (
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="px-3 py-2 text-red-400 hover:text-red-300 disabled:opacity-50"
                title="Supprimer cet ingrédient"
                disabled={isSubmitting}
              >
                ×
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addIngredient}
          className="text-blue-400 hover:text-blue-300 disabled:opacity-50"
          title="Ajouter un nouvel ingrédient"
          disabled={isSubmitting}
        >
          + Ajouter un ingrédient
        </button>
      </div>

      <div>
        <label htmlFor="instructions" className="block text-sm font-medium mb-2">
          Instructions
        </label>
        <textarea
          id="instructions"
          value={formData.instructions}
          onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
          className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          rows={4}
          placeholder="Décrivez les étapes de préparation du cocktail"
          title="Instructions de préparation"
          disabled={isSubmitting}
          required
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Créer le cocktail"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Création en cours...' : 'Créer le cocktail'}
        </button>
      </div>
    </form>
  );
} 