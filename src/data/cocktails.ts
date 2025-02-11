export interface Ingredient {
  nom: string;
  quantite: string;
  unite?: string;
}

export interface Cocktail {
  nom: string;
  categorie: string;
  ingredients: Ingredient[];
  preparation: string[];
  verre: string;
  decoration?: string;
  description?: string;
}

export const cocktails: Cocktail[] = [
  {
    nom: "Mojito",
    categorie: "Long Drink",
    ingredients: [
      { nom: "Rhum blanc", quantite: "6", unite: "cl" },
      { nom: "Citron vert", quantite: "1/2" },
      { nom: "Sucre de canne", quantite: "2", unite: "cuillères à café" },
      { nom: "Menthe fraîche", quantite: "6-8", unite: "feuilles" },
      { nom: "Eau gazeuse", quantite: "qsp" }
    ],
    preparation: [
      "Piler les feuilles de menthe avec le sucre et le jus de citron",
      "Ajouter le rhum et remplir de glace pilée",
      "Compléter avec l'eau gazeuse",
      "Mélanger délicatement"
    ],
    verre: "Tumbler",
    decoration: "Feuilles de menthe et tranche de citron vert"
  },
  {
    nom: "Negroni",
    categorie: "Short Drink",
    ingredients: [
      { nom: "Gin", quantite: "3", unite: "cl" },
      { nom: "Campari", quantite: "3", unite: "cl" },
      { nom: "Vermouth rouge", quantite: "3", unite: "cl" }
    ],
    preparation: [
      "Verser tous les ingrédients dans un verre à mélange avec des glaçons",
      "Remuer jusqu'à ce que le mélange soit bien froid",
      "Filtrer dans un verre rempli de glaçons"
    ],
    verre: "Old Fashioned",
    decoration: "Zeste d'orange"
  },
  {
    nom: "Margarita",
    categorie: "Short Drink",
    ingredients: [
      { nom: "Tequila", quantite: "5", unite: "cl" },
      { nom: "Triple Sec", quantite: "3", unite: "cl" },
      { nom: "Jus de citron vert", quantite: "2", unite: "cl" }
    ],
    preparation: [
      "Givrer le bord du verre avec du sel",
      "Verser tous les ingrédients dans un shaker avec des glaçons",
      "Secouer énergiquement",
      "Filtrer dans le verre"
    ],
    verre: "Verre à cocktail",
    decoration: "Tranche de citron vert"
  },
  {
    nom: "Old Fashioned",
    categorie: "Short Drink",
    ingredients: [
      { nom: "Bourbon", quantite: "4.5", unite: "cl" },
      { nom: "Sucre", quantite: "1", unite: "morceau" },
      { nom: "Angostura bitters", quantite: "2-3", unite: "traits" },
      { nom: "Eau", quantite: "1", unite: "trait" }
    ],
    preparation: [
      "Dans un verre, écraser le sucre avec les bitters et l'eau",
      "Ajouter quelques glaçons et le bourbon",
      "Remuer jusqu'à ce que le verre soit bien froid"
    ],
    verre: "Old Fashioned",
    decoration: "Zeste d'orange et cerise cocktail"
  },
  {
    nom: "Daiquiri",
    categorie: "Short Drink",
    ingredients: [
      { nom: "Rhum blanc", quantite: "6", unite: "cl" },
      { nom: "Jus de citron vert", quantite: "3", unite: "cl" },
      { nom: "Sirop de sucre", quantite: "1.5", unite: "cl" }
    ],
    preparation: [
      "Verser tous les ingrédients dans un shaker avec des glaçons",
      "Secouer énergiquement",
      "Filtrer dans un verre à cocktail refroidi"
    ],
    verre: "Verre à cocktail",
    decoration: "Tranche de citron vert"
  },
  {
    nom: "Moscow Mule",
    categorie: "Long Drink",
    ingredients: [
      { nom: "Vodka", quantite: "4.5", unite: "cl" },
      { nom: "Jus de citron vert", quantite: "1.5", unite: "cl" },
      { nom: "Ginger Beer", quantite: "12", unite: "cl" }
    ],
    preparation: [
      "Verser la vodka et le jus de citron vert dans un mug en cuivre rempli de glaçons",
      "Compléter avec le ginger beer",
      "Mélanger délicatement"
    ],
    verre: "Mug en cuivre",
    decoration: "Tranche de citron vert et feuille de menthe"
  },
  {
    nom: "Gin Tonic",
    categorie: "Long Drink",
    ingredients: [
      { nom: "Gin", quantite: "5", unite: "cl" },
      { nom: "Tonic", quantite: "10", unite: "cl" }
    ],
    preparation: [
      "Remplir un verre de glaçons",
      "Verser le gin",
      "Compléter avec le tonic",
      "Mélanger délicatement"
    ],
    verre: "Tumbler",
    decoration: "Tranche de citron ou concombre"
  },
  {
    nom: "Cosmopolitan",
    categorie: "Short Drink",
    ingredients: [
      { nom: "Vodka citron", quantite: "4", unite: "cl" },
      { nom: "Cointreau", quantite: "1.5", unite: "cl" },
      { nom: "Jus de cranberry", quantite: "3", unite: "cl" },
      { nom: "Jus de citron vert", quantite: "1.5", unite: "cl" }
    ],
    preparation: [
      "Verser tous les ingrédients dans un shaker avec des glaçons",
      "Secouer énergiquement",
      "Filtrer dans un verre à cocktail refroidi"
    ],
    verre: "Verre à cocktail",
    decoration: "Zeste de citron ou tranche d'orange"
  },
  {
    nom: "Piña Colada",
    categorie: "Long Drink",
    ingredients: [
      { nom: "Rhum blanc", quantite: "4", unite: "cl" },
      { nom: "Rhum ambré", quantite: "2", unite: "cl" },
      { nom: "Jus d'ananas", quantite: "12", unite: "cl" },
      { nom: "Crème de coco", quantite: "4", unite: "cl" }
    ],
    preparation: [
      "Verser tous les ingrédients dans un blender avec de la glace pilée",
      "Mixer jusqu'à obtenir une consistance lisse et crémeuse",
      "Verser dans un verre hurricane"
    ],
    verre: "Hurricane",
    decoration: "Tranche d'ananas et cerise cocktail"
  },
  {
    nom: "Espresso Martini",
    categorie: "Short Drink",
    ingredients: [
      { nom: "Vodka", quantite: "4", unite: "cl" },
      { nom: "Liqueur de café", quantite: "2", unite: "cl" },
      { nom: "Espresso", quantite: "3", unite: "cl" },
      { nom: "Sirop de sucre", quantite: "1", unite: "cl" }
    ],
    preparation: [
      "Préparer un espresso et le laisser refroidir",
      "Verser tous les ingrédients dans un shaker avec des glaçons",
      "Secouer énergiquement",
      "Filtrer dans un verre à cocktail refroidi"
    ],
    verre: "Verre à cocktail",
    decoration: "3 grains de café"
  },
  {
    nom: "Mai Tai",
    categorie: "Long Drink",
    ingredients: [
      { nom: "Rhum blanc", quantite: "3", unite: "cl" },
      { nom: "Rhum ambré", quantite: "3", unite: "cl" },
      { nom: "Curaçao orange", quantite: "1.5", unite: "cl" },
      { nom: "Orgeat", quantite: "1", unite: "cl" },
      { nom: "Jus de citron vert", quantite: "2", unite: "cl" }
    ],
    preparation: [
      "Verser tous les ingrédients dans un shaker avec des glaçons",
      "Secouer énergiquement",
      "Filtrer dans un verre rempli de glace pilée"
    ],
    verre: "Tumbler",
    decoration: "Menthe fraîche et tranche de citron vert"
  },
  {
    nom: "French 75",
    categorie: "Sparkling",
    ingredients: [
      { nom: "Gin", quantite: "3", unite: "cl" },
      { nom: "Jus de citron", quantite: "1.5", unite: "cl" },
      { nom: "Sirop de sucre", quantite: "1", unite: "cl" },
      { nom: "Champagne", quantite: "6", unite: "cl" }
    ],
    preparation: [
      "Dans un shaker avec des glaçons, verser le gin, le jus de citron et le sirop",
      "Secouer énergiquement",
      "Filtrer dans une flûte à champagne",
      "Compléter avec le champagne"
    ],
    verre: "Flûte à champagne",
    decoration: "Zeste de citron"
  },
  {
    nom: "Whiskey Sour",
    categorie: "Short Drink",
    ingredients: [
      { nom: "Bourbon", quantite: "4.5", unite: "cl" },
      { nom: "Jus de citron", quantite: "3", unite: "cl" },
      { nom: "Sirop de sucre", quantite: "1.5", unite: "cl" },
      { nom: "Blanc d'œuf", quantite: "1", unite: "pc" }
    ],
    preparation: [
      "Réaliser un dry shake avec tous les ingrédients (sans glace)",
      "Ajouter des glaçons et secouer à nouveau énergiquement",
      "Filtrer dans un verre rempli de glaçons"
    ],
    verre: "Old Fashioned",
    decoration: "Zeste d'orange et cerise cocktail"
  },
  {
    nom: "Caipirinha",
    categorie: "Short Drink",
    ingredients: [
      { nom: "Cachaça", quantite: "5", unite: "cl" },
      { nom: "Citron vert", quantite: "1", unite: "pc" },
      { nom: "Sucre", quantite: "2", unite: "cuillères à café" }
    ],
    preparation: [
      "Couper le citron vert en quartiers",
      "Dans un verre, piler le citron avec le sucre",
      "Ajouter la cachaça et remplir de glace pilée",
      "Mélanger vigoureusement"
    ],
    verre: "Old Fashioned",
    decoration: "Quartier de citron vert"
  },
  {
    nom: "Bloody Mary",
    categorie: "Long Drink",
    ingredients: [
      { nom: "Vodka", quantite: "4.5", unite: "cl" },
      { nom: "Jus de tomate", quantite: "9", unite: "cl" },
      { nom: "Jus de citron", quantite: "1.5", unite: "cl" },
      { nom: "Sauce Worcestershire", quantite: "2-3", unite: "traits" },
      { nom: "Tabasco", quantite: "2-3", unite: "gouttes" },
      { nom: "Sel de céleri", quantite: "1", unite: "pincée" },
      { nom: "Poivre", quantite: "1", unite: "pincée" }
    ],
    preparation: [
      "Verser tous les ingrédients dans un verre mélangeur avec des glaçons",
      "Rouler doucement pour mélanger",
      "Filtrer dans un verre highball rempli de glaçons"
    ],
    verre: "Highball",
    decoration: "Branche de céleri et citron"
  },
  {
    nom: "Manhattan",
    categorie: "Short Drink",
    ingredients: [
      { nom: "Whiskey Rye", quantite: "5", unite: "cl" },
      { nom: "Vermouth rouge", quantite: "2", unite: "cl" },
      { nom: "Angostura bitters", quantite: "2", unite: "traits" }
    ],
    preparation: [
      "Verser tous les ingrédients dans un verre à mélange avec des glaçons",
      "Remuer jusqu'à ce que le mélange soit bien froid",
      "Filtrer dans un verre à cocktail refroidi"
    ],
    verre: "Verre à cocktail",
    decoration: "Cerise cocktail"
  },
  {
    nom: "Spritz",
    categorie: "Sparkling",
    ingredients: [
      { nom: "Aperol", quantite: "6", unite: "cl" },
      { nom: "Prosecco", quantite: "9", unite: "cl" },
      { nom: "Eau gazeuse", quantite: "3", unite: "cl" }
    ],
    preparation: [
      "Dans un verre rempli de glaçons, verser l'Aperol",
      "Ajouter le Prosecco",
      "Compléter avec l'eau gazeuse",
      "Mélanger délicatement"
    ],
    verre: "Verre à vin",
    decoration: "Tranche d'orange"
  },
  {
    nom: "Kir Royal",
    categorie: "Sparkling",
    ingredients: [
      { nom: "Crème de cassis", quantite: "2", unite: "cl" },
      { nom: "Champagne", quantite: "10", unite: "cl" }
    ],
    preparation: [
      "Verser la crème de cassis dans une flûte à champagne",
      "Compléter délicatement avec le champagne bien frais"
    ],
    verre: "Flûte à champagne",
    decoration: "Optionnel: une framboise fraîche"
  },
  {
    nom: "Long Island Iced Tea",
    categorie: "Long Drink",
    ingredients: [
      { nom: "Vodka", quantite: "2", unite: "cl" },
      { nom: "Gin", quantite: "2", unite: "cl" },
      { nom: "Rhum blanc", quantite: "2", unite: "cl" },
      { nom: "Tequila", quantite: "2", unite: "cl" },
      { nom: "Triple sec", quantite: "2", unite: "cl" },
      { nom: "Jus de citron", quantite: "3", unite: "cl" },
      { nom: "Sirop de sucre", quantite: "2", unite: "cl" },
      { nom: "Coca-Cola", quantite: "4", unite: "cl" }
    ],
    preparation: [
      "Verser tous les ingrédients sauf le coca dans un shaker avec des glaçons",
      "Secouer énergiquement",
      "Filtrer dans un verre long drink rempli de glaçons",
      "Compléter avec le coca",
      "Mélanger délicatement"
    ],
    verre: "Highball",
    decoration: "Tranche de citron"
  },
  {
    nom: "Mint Julep",
    categorie: "Long Drink",
    ingredients: [
      { nom: "Bourbon", quantite: "6", unite: "cl" },
      { nom: "Sirop de sucre", quantite: "1", unite: "cl" },
      { nom: "Menthe fraîche", quantite: "8-10", unite: "feuilles" },
      { nom: "Eau gazeuse", quantite: "2", unite: "cl" }
    ],
    preparation: [
      "Dans un verre, froisser délicatement les feuilles de menthe avec le sirop",
      "Ajouter le bourbon et remplir de glace pilée",
      "Mélanger jusqu'à ce que le verre soit givré",
      "Compléter avec un peu d'eau gazeuse"
    ],
    verre: "Julep ou Tumbler",
    decoration: "Bouquet de menthe fraîche"
  },
  {
    nom: "Aviation",
    categorie: "Short Drink",
    ingredients: [
      { nom: "Gin", quantite: "4.5", unite: "cl" },
      { nom: "Jus de citron", quantite: "1.5", unite: "cl" },
      { nom: "Marasquin", quantite: "1.5", unite: "cl" },
      { nom: "Crème de violette", quantite: "0.5", unite: "cl" }
    ],
    preparation: [
      "Verser tous les ingrédients dans un shaker avec des glaçons",
      "Secouer énergiquement",
      "Filtrer dans un verre à cocktail refroidi"
    ],
    verre: "Verre à cocktail",
    decoration: "Cerise au marasquin"
  },
  {
    nom: "Dark 'n' Stormy",
    categorie: "Long Drink",
    ingredients: [
      { nom: "Rhum ambré", quantite: "6", unite: "cl" },
      { nom: "Ginger Beer", quantite: "12", unite: "cl" },
      { nom: "Jus de citron vert", quantite: "1", unite: "cl" }
    ],
    preparation: [
      "Remplir un verre de glaçons",
      "Verser le ginger beer",
      "Faire flotter délicatement le rhum par-dessus",
      "Ajouter le jus de citron vert"
    ],
    verre: "Highball",
    decoration: "Tranche de citron vert"
  },
  {
    nom: "Sidecar",
    categorie: "Short Drink",
    ingredients: [
      { nom: "Cognac", quantite: "5", unite: "cl" },
      { nom: "Cointreau", quantite: "2", unite: "cl" },
      { nom: "Jus de citron", quantite: "2", unite: "cl" }
    ],
    preparation: [
      "Givrer le bord du verre avec du sucre",
      "Verser tous les ingrédients dans un shaker avec des glaçons",
      "Secouer énergiquement",
      "Filtrer dans le verre préparé"
    ],
    verre: "Verre à cocktail",
    decoration: "Zeste d'orange"
  },
  {
    nom: "Paloma",
    categorie: "Long Drink",
    ingredients: [
      { nom: "Tequila", quantite: "5", unite: "cl" },
      { nom: "Jus de citron vert", quantite: "1", unite: "cl" },
      { nom: "Soda pamplemousse", quantite: "12", unite: "cl" },
      { nom: "Sel", quantite: "1", unite: "pincée" }
    ],
    preparation: [
      "Saler le bord du verre",
      "Remplir de glaçons",
      "Verser la tequila et le jus de citron vert",
      "Compléter avec le soda pamplemousse",
      "Mélanger délicatement"
    ],
    verre: "Highball",
    decoration: "Tranche de pamplemousse"
  },
  {
    nom: "White Russian",
    categorie: "Short Drink",
    ingredients: [
      { nom: "Vodka", quantite: "5", unite: "cl" },
      { nom: "Liqueur de café", quantite: "2", unite: "cl" },
      { nom: "Crème liquide", quantite: "3", unite: "cl" }
    ],
    preparation: [
      "Dans un verre rempli de glaçons, verser la vodka et la liqueur de café",
      "Mélanger",
      "Faire flotter délicatement la crème sur le dessus"
    ],
    verre: "Old Fashioned",
    decoration: "Grains de café"
  },
  {
    nom: "Amaretto Sour",
    categorie: "Short Drink",
    ingredients: [
      { nom: "Amaretto", quantite: "5", unite: "cl" },
      { nom: "Jus de citron", quantite: "3", unite: "cl" },
      { nom: "Sirop de sucre", quantite: "1", unite: "cl" },
      { nom: "Blanc d'œuf", quantite: "1", unite: "pc" }
    ],
    preparation: [
      "Réaliser un dry shake avec tous les ingrédients",
      "Ajouter des glaçons et secouer à nouveau",
      "Filtrer dans un verre rempli de glaçons"
    ],
    verre: "Old Fashioned",
    decoration: "Cerise cocktail et zeste d'orange"
  },
  {
    nom: "Tom Collins",
    categorie: "Long Drink",
    ingredients: [
      { nom: "Gin", quantite: "4.5", unite: "cl" },
      { nom: "Jus de citron", quantite: "3", unite: "cl" },
      { nom: "Sirop de sucre", quantite: "1.5", unite: "cl" },
      { nom: "Eau gazeuse", quantite: "6", unite: "cl" }
    ],
    preparation: [
      "Dans un shaker avec des glaçons, verser le gin, le jus de citron et le sirop",
      "Secouer énergiquement",
      "Filtrer dans un verre collins rempli de glaçons",
      "Compléter avec l'eau gazeuse"
    ],
    verre: "Collins",
    decoration: "Tranche de citron et cerise cocktail"
  },
  {
    nom: "Bramble",
    categorie: "Short Drink",
    ingredients: [
      { nom: "Gin", quantite: "4", unite: "cl" },
      { nom: "Jus de citron", quantite: "2", unite: "cl" },
      { nom: "Sirop de sucre", quantite: "1", unite: "cl" },
      { nom: "Crème de mûre", quantite: "1.5", unite: "cl" }
    ],
    preparation: [
      "Verser le gin, le jus de citron et le sirop dans un shaker avec des glaçons",
      "Secouer énergiquement",
      "Filtrer dans un verre rempli de glace pilée",
      "Faire couler la crème de mûre sur le dessus"
    ],
    verre: "Old Fashioned",
    decoration: "Mûres fraîches et tranche de citron"
  },
  {
    nom: "Irish Coffee",
    categorie: "Hot Drink",
    ingredients: [
      { nom: "Whiskey irlandais", quantite: "4", unite: "cl" },
      { nom: "Café chaud", quantite: "12", unite: "cl" },
      { nom: "Sucre brun", quantite: "2", unite: "cuillères à café" },
      { nom: "Crème fouettée", quantite: "3", unite: "cl" }
    ],
    preparation: [
      "Chauffer le verre avec de l'eau chaude",
      "Vider l'eau et ajouter le sucre et le café chaud",
      "Mélanger jusqu'à dissolution du sucre",
      "Ajouter le whiskey",
      "Faire flotter délicatement la crème fouettée sur le dessus"
    ],
    verre: "Verre Irish Coffee",
    decoration: "Râpure de noix de muscade"
  },
  {
    nom: "Pisco Sour",
    categorie: "Short Drink",
    ingredients: [
      { nom: "Pisco", quantite: "6", unite: "cl" },
      { nom: "Jus de citron vert", quantite: "3", unite: "cl" },
      { nom: "Sirop de sucre", quantite: "2", unite: "cl" },
      { nom: "Blanc d'œuf", quantite: "1", unite: "pc" },
      { nom: "Angostura bitters", quantite: "2", unite: "traits" }
    ],
    preparation: [
      "Réaliser un dry shake avec tous les ingrédients sauf les bitters",
      "Ajouter des glaçons et secouer à nouveau",
      "Filtrer dans un verre",
      "Ajouter les traits d'Angostura sur la mousse"
    ],
    verre: "Verre à cocktail",
    decoration: "Traits d'Angostura en motif"
  },
  {
    nom: "Singapore Sling",
    categorie: "Long Drink",
    ingredients: [
      { nom: "Gin", quantite: "3", unite: "cl" },
      { nom: "Cherry brandy", quantite: "1.5", unite: "cl" },
      { nom: "Cointreau", quantite: "0.75", unite: "cl" },
      { nom: "DOM Bénédictine", quantite: "0.75", unite: "cl" },
      { nom: "Jus d'ananas", quantite: "12", unite: "cl" },
      { nom: "Jus de citron vert", quantite: "1.5", unite: "cl" },
      { nom: "Sirop de grenadine", quantite: "1", unite: "cl" },
      { nom: "Angostura bitters", quantite: "1", unite: "trait" }
    ],
    preparation: [
      "Verser tous les ingrédients sauf la grenadine dans un shaker avec des glaçons",
      "Secouer énergiquement",
      "Filtrer dans un verre hurricane rempli de glaçons",
      "Faire couler la grenadine",
      "Mélanger délicatement"
    ],
    verre: "Hurricane",
    decoration: "Tranche d'ananas et cerise cocktail"
  },
  {
    nom: "Gimlet",
    categorie: "Short Drink",
    ingredients: [
      { nom: "Gin", quantite: "6", unite: "cl" },
      { nom: "Cordial lime", quantite: "3", unite: "cl" }
    ],
    preparation: [
      "Verser les ingrédients dans un shaker avec des glaçons",
      "Secouer énergiquement",
      "Filtrer dans un verre à cocktail refroidi"
    ],
    verre: "Verre à cocktail",
    decoration: "Tranche de citron vert"
  },
  {
    nom: "Clover Club",
    categorie: "Short Drink",
    ingredients: [
      { nom: "Gin", quantite: "4.5", unite: "cl" },
      { nom: "Jus de citron", quantite: "1.5", unite: "cl" },
      { nom: "Sirop de framboise", quantite: "1.5", unite: "cl" },
      { nom: "Blanc d'œuf", quantite: "1", unite: "pc" }
    ],
    preparation: [
      "Réaliser un dry shake avec tous les ingrédients",
      "Ajouter des glaçons et secouer à nouveau",
      "Filtrer finement dans un verre à cocktail refroidi"
    ],
    verre: "Verre à cocktail",
    decoration: "Framboises fraîches"
  },
  {
    nom: "Penicillin",
    categorie: "Short Drink",
    ingredients: [
      { nom: "Scotch whisky", quantite: "6", unite: "cl" },
      { nom: "Jus de citron", quantite: "2.5", unite: "cl" },
      { nom: "Sirop de miel", quantite: "2", unite: "cl" },
      { nom: "Sirop de gingembre", quantite: "1", unite: "cl" },
      { nom: "Whisky tourbé", quantite: "0.5", unite: "cl" }
    ],
    preparation: [
      "Verser tous les ingrédients sauf le whisky tourbé dans un shaker avec des glaçons",
      "Secouer énergiquement",
      "Filtrer dans un verre rempli de glaçons",
      "Faire flotter le whisky tourbé sur le dessus"
    ],
    verre: "Old Fashioned",
    decoration: "Gingembre confit et zeste de citron"
  },
  {
    nom: "Last Word",
    categorie: "Short Drink",
    ingredients: [
      { nom: "Gin", quantite: "2.2", unite: "cl" },
      { nom: "Chartreuse verte", quantite: "2.2", unite: "cl" },
      { nom: "Marasquin", quantite: "2.2", unite: "cl" },
      { nom: "Jus de citron vert", quantite: "2.2", unite: "cl" }
    ],
    preparation: [
      "Verser tous les ingrédients dans un shaker avec des glaçons",
      "Secouer énergiquement",
      "Filtrer dans un verre à cocktail refroidi"
    ],
    verre: "Verre à cocktail",
    decoration: "Cerise au marasquin"
  },
  {
    nom: "Vieux Carré",
    categorie: "Short Drink",
    ingredients: [
      { nom: "Cognac", quantite: "2.2", unite: "cl" },
      { nom: "Rye whiskey", quantite: "2.2", unite: "cl" },
      { nom: "Vermouth rouge", quantite: "2.2", unite: "cl" },
      { nom: "DOM Bénédictine", quantite: "1", unite: "cl" },
      { nom: "Peychaud's bitters", quantite: "2", unite: "traits" },
      { nom: "Angostura bitters", quantite: "2", unite: "traits" }
    ],
    preparation: [
      "Dans un verre à mélange rempli de glaçons, verser tous les ingrédients",
      "Remuer longuement jusqu'à ce que le mélange soit bien froid",
      "Filtrer dans un verre rempli de glaçons"
    ],
    verre: "Old Fashioned",
    decoration: "Zeste de citron et cerise cocktail"
  },
  {
    nom: "Sazerac",
    categorie: "Short Drink",
    ingredients: [
      { nom: "Cognac ou Rye whiskey", quantite: "6", unite: "cl" },
      { nom: "Sucre", quantite: "1", unite: "morceau" },
      { nom: "Peychaud's bitters", quantite: "3", unite: "traits" },
      { nom: "Absinthe", quantite: "1", unite: "trait" }
    ],
    preparation: [
      "Rincer un verre old fashioned refroidi avec l'absinthe et jeter l'excédent",
      "Dans un autre verre, écraser le sucre avec les bitters et un peu d'eau",
      "Ajouter le cognac ou le rye et des glaçons",
      "Remuer jusqu'à ce que le verre soit bien froid",
      "Filtrer dans le verre rincé à l'absinthe"
    ],
    verre: "Old Fashioned",
    decoration: "Zeste de citron"
  }
]; 