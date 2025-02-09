import CocktailForm from '@/components/ui/CocktailForm';

export default function CreateCocktailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16 px-4">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-center mb-12">
          Créer un Nouveau Cocktail
        </h1>
        
        <div className="bg-gray-800 rounded-lg p-8">
          <CocktailForm />
        </div>
      </div>
    </div>
  );
} 