export interface TypeVerre {
  nom: string;
  contenance: string;
  utilisationPour: string[];
  description: string;
  caracteristiques: string[];
  image?: string;
}

export const verres: TypeVerre[] = [
  {
    nom: "Verre à Cocktail",
    contenance: "90-150 ml",
    utilisationPour: [
      "Martini",
      "Manhattan",
      "Cosmopolitan",
      "Aviation",
      "Daiquiri"
    ],
    description: "Verre emblématique en forme de V sur pied, parfait pour les cocktails servis 'straight up' (sans glace)",
    caracteristiques: [
      "Forme en V pour maintenir la température",
      "Long pied pour éviter de réchauffer le cocktail",
      "Bord fin pour une dégustation optimale",
      "Contenance idéale de 120 ml"
    ]
  },
  {
    nom: "Old Fashioned",
    contenance: "180-300 ml",
    utilisationPour: [
      "Old Fashioned",
      "Negroni",
      "Sazerac",
      "Whiskey Sour",
      "White Russian"
    ],
    description: "Verre bas et large, parfait pour les cocktails nécessitant du muddling ou servis sur glace",
    caracteristiques: [
      "Base large et stable",
      "Parois épaisses",
      "Bord droit",
      "Capacité suffisante pour les glaçons"
    ]
  },
  {
    nom: "Highball",
    contenance: "240-350 ml",
    utilisationPour: [
      "Gin Tonic",
      "Moscow Mule",
      "Dark 'n' Stormy",
      "Paloma",
      "Long Island Iced Tea"
    ],
    description: "Verre haut et droit, idéal pour les cocktails longs avec beaucoup de glaçons et de mixer",
    caracteristiques: [
      "Forme cylindrique haute",
      "Grande capacité pour les sodas",
      "Parfait pour les boissons gazeuses",
      "Permet une bonne répartition des ingrédients"
    ]
  },
  {
    nom: "Collins",
    contenance: "300-400 ml",
    utilisationPour: [
      "Tom Collins",
      "John Collins",
      "Mojito",
      "Singapore Sling"
    ],
    description: "Plus haut et plus étroit qu'un Highball, parfait pour les cocktails très rafraîchissants",
    caracteristiques: [
      "Très haut et élancé",
      "Parfait pour les cocktails avec beaucoup de glace",
      "Idéal pour les boissons pétillantes",
      "Permet une belle présentation des garnitures"
    ]
  },
  {
    nom: "Coupe",
    contenance: "180-240 ml",
    utilisationPour: [
      "Champagne cocktails",
      "Daiquiri",
      "Sidecar",
      "Manhattan"
    ],
    description: "Verre élégant en forme de coupe de champagne évasée, parfait pour les cocktails servis sans glace",
    caracteristiques: [
      "Large ouverture pour les arômes",
      "Pied élégant",
      "Forme vintage et sophistiquée",
      "Parfait pour les cocktails classiques"
    ]
  },
  {
    nom: "Flûte à Champagne",
    contenance: "150-180 ml",
    utilisationPour: [
      "Kir Royal",
      "French 75",
      "Bellini",
      "Champagne cocktails"
    ],
    description: "Verre long et étroit, conçu pour préserver les bulles des cocktails pétillants",
    caracteristiques: [
      "Forme élancée pour préserver l'effervescence",
      "Long pied élégant",
      "Surface réduite pour moins de perte de bulles",
      "Parfait pour les cocktails au champagne"
    ]
  },
  {
    nom: "Hurricane",
    contenance: "450-500 ml",
    utilisationPour: [
      "Hurricane",
      "Piña Colada",
      "Mai Tai",
      "Zombie"
    ],
    description: "Grand verre en forme de lampe à huile, emblématique des cocktails tropicaux",
    caracteristiques: [
      "Forme distinctive en courbes",
      "Grande capacité pour les cocktails fruités",
      "Parfait pour les présentations élaborées",
      "Idéal pour les cocktails tiki"
    ]
  },
  {
    nom: "Mug en Cuivre",
    contenance: "350-400 ml",
    utilisationPour: [
      "Moscow Mule",
      "Dark 'n' Stormy",
      "Gin-Gin Mule"
    ],
    description: "Mug traditionnel en cuivre, maintient la fraîcheur et ajoute un aspect visuel unique",
    caracteristiques: [
      "Matériau conducteur pour un refroidissement optimal",
      "Anse pratique",
      "Aspect rustique et authentique",
      "Maintient les boissons très fraîches"
    ]
  },
  {
    nom: "Verre Irish Coffee",
    contenance: "240 ml",
    utilisationPour: [
      "Irish Coffee",
      "Café Royal",
      "Cocktails chauds"
    ],
    description: "Verre résistant à la chaleur avec pied, parfait pour les cocktails chauds",
    caracteristiques: [
      "Verre transparent résistant à la chaleur",
      "Pied pour la manipulation",
      "Parfait pour montrer les couches",
      "Bord évasé pour la crème"
    ]
  },
  {
    nom: "Verre à Margarita",
    contenance: "300-350 ml",
    utilisationPour: [
      "Margarita",
      "Frozen Daiquiri",
      "Cocktails givrés"
    ],
    description: "Large coupe évasée sur pied, parfaite pour les cocktails avec bord givré",
    caracteristiques: [
      "Large rebord pour le sel ou le sucre",
      "Double vasque caractéristique",
      "Pied stable",
      "Parfait pour les cocktails frozen"
    ]
  },
  {
    nom: "Nick & Nora",
    contenance: "150-180 ml",
    utilisationPour: [
      "Martini",
      "Manhattan",
      "Cocktails élégants sans glace"
    ],
    description: "Version plus petite et plus élégante du verre à cocktail classique",
    caracteristiques: [
      "Forme arrondie élégante",
      "Moins susceptible aux déversements",
      "Parfait pour les portions classiques",
      "Design vintage sophistiqué"
    ]
  },
  {
    nom: "Gobelet Julep",
    contenance: "350-400 ml",
    utilisationPour: [
      "Mint Julep",
      "Cocktails glacés",
      "Smashes"
    ],
    description: "Gobelet métallique traditionnel, parfait pour les cocktails très froids",
    caracteristiques: [
      "Matériau métallique pour un refroidissement maximal",
      "Formation de givre à l'extérieur",
      "Parfait pour la glace pilée",
      "Design historique authentique"
    ]
  }
]; 