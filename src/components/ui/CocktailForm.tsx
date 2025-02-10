'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { LoadingSpinner } from './LoadingSpinner';

export default function CocktailForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { user, signInWithGoogle } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    ingredients: [''],
    instructions: [''],
    image: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!user) {
      try {
        await signInWithGoogle();
      } catch (error) {
        setError('Veuillez vous connecter pour créer un cocktail');
        return;
      }
    }

    try {
      setLoading(true);
      
      // Ajouter le cocktail à Firestore
      const cocktailData = {
        ...formData,
        userId: user?.uid,
        userEmail: user?.email,
        createdAt: new Date().toISOString(),
      };

      const docRef = await addDoc(collection(db, 'cocktails'), cocktailData);
      
      router.push(`/routes/cocktails/${docRef.id}`);
    } catch (error) {
      setError('Une erreur est survenue lors de la création du cocktail');
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayChange = (index: number, value: string, field: 'ingredients' | 'instructions') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayField = (field: 'ingredients' | 'instructions') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  if (loading) return <LoadingSpinner />;

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {!user && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
          <button
            type="button"
            onClick={signInWithGoogle}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Se connecter avec Google pour créer un cocktail
          </button>
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nom du cocktail
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Entrez le nom du cocktail"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="Décrivez votre cocktail"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Image URL
        </label>
        <input
          id="image"
          type="url"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="URL de l'image du cocktail"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Ingrédients
        </label>
        {formData.ingredients.map((ingredient, index) => (
          <div key={index} className="mt-2">
            <input
              type="text"
              value={ingredient}
              onChange={(e) => handleArrayChange(index, e.target.value, 'ingredients')}
              placeholder={`Ingrédient ${index + 1}`}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayField('ingredients')}
          className="mt-2 text-sm text-indigo-600 hover:text-indigo-500"
        >
          + Ajouter un ingrédient
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Instructions
        </label>
        {formData.instructions.map((instruction, index) => (
          <div key={index} className="mt-2">
            <input
              type="text"
              value={instruction}
              onChange={(e) => handleArrayChange(index, e.target.value, 'instructions')}
              placeholder={`Étape ${index + 1}`}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayField('instructions')}
          className="mt-2 text-sm text-indigo-600 hover:text-indigo-500"
        >
          + Ajouter une instruction
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Créer le cocktail
      </button>
    </form>
  );
} 