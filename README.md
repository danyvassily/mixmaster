# CocktailMaster

Une application moderne de gestion et de création de cocktails, développée avec Next.js, React et MongoDB.

## Fonctionnalités

- 🍸 Consultation des cocktails classiques de l'IBA
- 🔍 Recherche et filtrage des cocktails
- ✨ Interface utilisateur moderne et responsive
- ➕ Création de cocktails personnalisés
- 💾 Sauvegarde dans une base de données MongoDB

## Technologies Utilisées

- Next.js 14
- React
- TypeScript
- MongoDB & Mongoose
- Tailwind CSS
- Axios & Cheerio (pour le scraping)

## Installation

1. Clonez le dépôt :
```bash
git clone [URL_DU_REPO]
cd cocktail
```

2. Installez les dépendances :
```bash
npm install
```

3. Configurez les variables d'environnement :
Créez un fichier `.env.local` à la racine du projet avec :
```
MONGODB_URI=mongodb+srv://dany:azerty@cluster0.ujnql73.mongodb.net/cocktails
```

4. Importez les cocktails de l'IBA :
```bash
npx ts-node src/scripts/scrape-cocktails.ts
```

5. Lancez l'application :
```bash
npm run dev
```

L'application sera disponible sur `http://localhost:3000`

## Structure du Projet

```
src/
├── app/                    # Pages et routes Next.js
│   ├── api/               # Routes API
│   ├── routes/            # Routes de l'application
│   └── page.tsx           # Page d'accueil
├── components/            # Composants React
│   ├── ui/               # Composants d'interface
│   └── layout/           # Composants de mise en page
├── lib/                  # Utilitaires et configurations
├── models/               # Modèles Mongoose
└── scripts/             # Scripts utilitaires
```

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

## Licence

MIT
