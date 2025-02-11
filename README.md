# 🍸 MixMaster

Application web moderne de gestion et découverte de cocktails, développée avec Next.js et TypeScript.

## 🌟 Fonctionnalités

- 📱 Interface utilisateur moderne et responsive
- 🔍 Recherche et filtrage avancés de cocktails
- ✨ Animations fluides avec GSAP et Framer Motion
- 📝 Création et gestion de cocktails personnalisés
- 🎥 Intégration de vidéos YouTube pour les tutoriels
- 🔐 Authentification utilisateur
- 💾 Stockage des données avec MongoDB

## 🛠 Technologies Utilisées

- **Frontend:**
  - Next.js 14
  - TypeScript
  - Tailwind CSS
  - GSAP (GreenSock Animation Platform)
  - Framer Motion

- **Backend:**
  - MongoDB
  - Firebase Authentication
  - API Routes Next.js

## 🚀 Installation

1. Clonez le repository :
```bash
git clone git@github.com:danyvassily/mixmaster.git
cd mixmaster
```

2. Installez les dépendances :
```bash
npm install
```

3. Créez un fichier `.env.local` à la racine du projet avec les variables d'environnement nécessaires :
```env
MONGODB_URI=votre_uri_mongodb
NEXT_PUBLIC_FIREBASE_API_KEY=votre_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=votre_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=votre_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=votre_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=votre_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=votre_app_id
```

4. Lancez le serveur de développement :
```bash
npm run dev
```

L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000).

## 📖 Structure du Projet

```
src/
├── app/                    # Routes et pages Next.js
├── components/            # Composants React réutilisables
├── context/              # Contextes React (Auth, etc.)
├── lib/                  # Utilitaires et configurations
├── models/               # Modèles MongoDB
└── types/               # Types TypeScript
```

## 🔧 Scripts Disponibles

- `npm run dev` : Lance le serveur de développement
- `npm run build` : Crée une version de production
- `npm start` : Lance la version de production
- `npm run lint` : Vérifie le code avec ESLint

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👤 Auteur

- **Dany Vassily** - [GitHub](https://github.com/danyvassily)
