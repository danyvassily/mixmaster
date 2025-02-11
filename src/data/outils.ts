export interface Outil {
  nom: string;
  description: string;
  utilisation: string[];
  caracteristiques: string[];
  conseils: string[];
  image?: string;
  categorie: "Préparation" | "Mesure" | "Service" | "Accessoire";
}

export const outils: Outil[] = [
  {
    nom: "Shaker Boston",
    categorie: "Préparation",
    description: "Composé de deux parties (grand gobelet en inox et petit verre), c'est l'outil emblématique du bartender pour mélanger les cocktails",
    utilisation: [
      "Cocktails avec jus de fruits",
      "Cocktails avec crème ou œuf",
      "Cocktails nécessitant une émulsion"
    ],
    caracteristiques: [
      "Grande partie en inox de 800ml",
      "Petit verre en verre de 400ml",
      "Joint étanche entre les deux parties",
      "Filtration efficace grâce au strainer"
    ],
    conseils: [
      "Toujours vérifier l'étanchéité avant utilisation",
      "Frapper énergiquement pendant 8-12 secondes",
      "Tenir le shaker horizontalement pour une meilleure émulsion",
      "Nettoyer et sécher après chaque utilisation"
    ]
  },
  {
    nom: "Shaker Parisien",
    categorie: "Préparation",
    description: "Shaker en trois parties (corps, couvercle avec crépine intégrée et bouchon), traditionnel en Europe",
    utilisation: [
      "Cocktails classiques",
      "Préparations simples",
      "Cocktails élégants"
    ],
    caracteristiques: [
      "Capacité de 500-700ml",
      "Crépine intégrée",
      "Design élégant",
      "Tout en inox"
    ],
    conseils: [
      "Vérifier régulièrement l'état de la crépine",
      "Ne pas trop remplir (max 2/3)",
      "Maintenir le couvercle fermement pendant l'utilisation",
      "Idéal pour le service en salle"
    ]
  },
  {
    nom: "Verre à Mélange",
    categorie: "Préparation",
    description: "Grand verre en cristal ou verre épais utilisé pour mélanger délicatement les cocktails",
    utilisation: [
      "Cocktails spiritueux (Manhattan, Martini)",
      "Mélanges délicats",
      "Cocktails transparents"
    ],
    caracteristiques: [
      "Capacité de 500-600ml",
      "Bec verseur",
      "Verre épais et résistant",
      "Gradué pour les mesures"
    ],
    conseils: [
      "Toujours utiliser une cuillère à mélange",
      "Remplir aux 2/3 de glace",
      "Mélanger doucement pour ne pas diluer excessivement",
      "Filtrer avec une passoire à glaçons"
    ]
  },
  {
    nom: "Pilon",
    categorie: "Préparation",
    description: "Outil pour écraser les ingrédients (fruits, herbes, sucre) directement dans le verre",
    utilisation: [
      "Mojito",
      "Caipirinha",
      "Cocktails avec fruits frais",
      "Muddled cocktails"
    ],
    caracteristiques: [
      "Bout dentelé ou lisse",
      "Manche ergonomique",
      "Matériau résistant (bois ou inox)",
      "Longueur adaptée au verre"
    ],
    conseils: [
      "Ne pas trop écraser les herbes (risque d'amertume)",
      "Piler doucement les agrumes (éviter l'écorce)",
      "Nettoyer immédiatement après utilisation",
      "Choisir un pilon adapté au type de verre"
    ]
  },
  {
    nom: "Passoire à Glaçons (Strainer)",
    categorie: "Service",
    description: "Filtre les glaçons et les éléments solides lors du service des cocktails",
    utilisation: [
      "Filtration après shaker",
      "Service des cocktails au verre à mélange",
      "Double filtration"
    ],
    caracteristiques: [
      "Ressort en spirale",
      "Ergots de maintien",
      "Design adapté aux verres",
      "Inox de qualité"
    ],
    conseils: [
      "Maintenir fermement contre le shaker/verre",
      "Vérifier régulièrement l'état du ressort",
      "Nettoyer après chaque service",
      "Utiliser avec une passoire fine si nécessaire"
    ]
  },
  {
    nom: "Cuillère à Mélange",
    categorie: "Préparation",
    description: "Longue cuillère torsadée pour mélanger les cocktails délicatement",
    utilisation: [
      "Mélange dans le verre à mélange",
      "Construction de cocktails en couches",
      "Ajustement des saveurs"
    ],
    caracteristiques: [
      "Longueur 30-40cm",
      "Manche torsadé",
      "Bout lesté",
      "Inox de qualité"
    ],
    conseils: [
      "Tenir par le haut du manche",
      "Faire glisser entre les doigts pour tourner",
      "Mouvement fluide et régulier",
      "Ne pas taper contre le verre"
    ]
  },
  {
    nom: "Jigger",
    categorie: "Mesure",
    description: "Double mesureur conique pour doser précisément les ingrédients",
    utilisation: [
      "Mesure précise des spiritueux",
      "Dosage des sirops et jus",
      "Respect des recettes"
    ],
    caracteristiques: [
      "Double mesure (2cl/4cl standard)",
      "Graduations intermédiaires",
      "Bord précis pour verser",
      "Inox ou cuivre"
    ],
    conseils: [
      "Tenir à hauteur des yeux pour la précision",
      "Remplir jusqu'au bord",
      "Nettoyer entre chaque ingrédient",
      "Choisir la bonne capacité selon les recettes"
    ]
  },
  {
    nom: "Presse-Agrumes",
    categorie: "Préparation",
    description: "Outil pour extraire le jus frais des agrumes",
    utilisation: [
      "Extraction de jus de citron",
      "Jus de lime frais",
      "Préparation de cocktails frais"
    ],
    caracteristiques: [
      "Design ergonomique",
      "Matériau résistant aux acides",
      "Récupération efficace du jus",
      "Filtration des pépins"
    ],
    conseils: [
      "Presser à température ambiante",
      "Nettoyer immédiatement (acidité)",
      "Éviter de presser l'écorce",
      "Utiliser des fruits bien mûrs"
    ]
  },
  {
    nom: "Blender",
    categorie: "Préparation",
    description: "Mixeur puissant pour les cocktails glacés et frozen",
    utilisation: [
      "Piña Colada",
      "Daiquiri Frozen",
      "Cocktails avec fruits",
      "Smoothies alcoolisés"
    ],
    caracteristiques: [
      "Puissance adaptée (minimum 500W)",
      "Lames spéciales glace",
      "Bol gradué",
      "Programme cocktails"
    ],
    conseils: [
      "Ne pas surcharger en glace",
      "Mixer par impulsions",
      "Nettoyer immédiatement",
      "Vérifier la consistance régulièrement"
    ]
  },
  {
    nom: "Râpe à Zestes",
    categorie: "Accessoire",
    description: "Outil pour prélever les zestes d'agrumes pour la décoration et les arômes",
    utilisation: [
      "Zestes pour décoration",
      "Extraction des huiles essentielles",
      "Finition des cocktails"
    ],
    caracteristiques: [
      "Microplans fins",
      "Manche ergonomique",
      "Surface large",
      "Inox de qualité"
    ],
    conseils: [
      "Râper uniquement la partie colorée",
      "Mouvement léger et régulier",
      "Nettoyer soigneusement",
      "Utiliser des agrumes non traités"
    ]
  },
  {
    nom: "Couteau de Bar",
    categorie: "Préparation",
    description: "Couteau polyvalent pour la découpe des fruits et garnitures",
    utilisation: [
      "Découpe des fruits",
      "Préparation des garnitures",
      "Zestes d'agrumes",
      "Découpe précise"
    ],
    caracteristiques: [
      "Lame courte et précise",
      "Manche ergonomique",
      "Acier inoxydable",
      "Taille compacte"
    ],
    conseils: [
      "Maintenir toujours bien aiguisé",
      "Utiliser une planche adaptée",
      "Nettoyer et sécher après usage",
      "Ranger dans un étui protecteur"
    ]
  },
  {
    nom: "Bec Verseur (Pourer)",
    categorie: "Service",
    description: "Bouchon verseur pour un contrôle précis du débit des spiritueux",
    utilisation: [
      "Service précis des spiritueux",
      "Contrôle du débit",
      "Free pouring"
    ],
    caracteristiques: [
      "Débit calibré",
      "Bouchon étanche",
      "Design anti-gouttes",
      "Matériau alimentaire"
    ],
    conseils: [
      "Nettoyer régulièrement",
      "Vérifier le débit avant service",
      "Changer si déformé",
      "Protéger de la poussière"
    ]
  }
]; 