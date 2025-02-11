export const CocktailSkeleton = () => {
  return (
    <div className="cocktail-card glass-effect rounded-lg overflow-hidden shadow-lg animate-pulse">
      <div className="relative">
        <div className="h-40 bg-gray-700/50" />
        <div className="absolute top-2 right-2">
          <div className="w-20 h-6 bg-gray-600/50 rounded-full" />
        </div>
      </div>
      <div className="p-4">
        <div className="h-6 bg-gray-600/50 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-700/50 rounded w-1/2 mb-3" />
        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-700/50 rounded w-1/3" />
          <div className="h-4 bg-gray-700/50 rounded w-4" />
        </div>
      </div>
    </div>
  );
};

export const CocktailGridSkeleton = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
      {Array.from({ length: 10 }).map((_, index) => (
        <CocktailSkeleton key={index} />
      ))}
    </div>
  );
}; 