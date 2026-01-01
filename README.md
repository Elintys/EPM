
Voici un **README.md complet et professionnel** pour ton application mobile **GuestPass (EPM)** développée en **React Native (JavaScript)**, connectée à ton **API Node.js / MongoDB** :

---

```markdown
# GuestPass (EPM) — Application Mobile Événementielle

GuestPass (EPM) est une application mobile multiplateforme (iOS & Android) développée en **React Native (JavaScript)**, permettant aux utilisateurs de **découvrir, gérer et participer à des événements**.  
Elle est connectée à une **API Node.js + Express + MongoDB (Elyntis Platform Management)**.

---

## 📱 Fonctionnalités principales

### Utilisateurs
- Création de compte / connexion (email, Google, Apple ID)
- Mise à jour du profil utilisateur (photo, bio, préférences)
- Historique de participation aux événements
- Gestion des billets achetés (QR code inclus)

### Événements
- Liste des événements disponibles (filtrage par catégorie, date, localisation)
- Détails complets (description, organisateur, lieu, images)
- Ajout aux favoris
- Achat ou réservation de billet

### Billets & Accès
- Génération automatique de QR code pour chaque billet
- Validation d’accès via scan à l’entrée (staff side)
- Historique de participation

### Organisations
- Page publique de l’organisation
- Liste des événements organisés
- Possibilité de suivre une organisation

---

## Architecture technique

### Stack principale
| Catégorie | Technologie |
|------------|--------------|
| Framework Mobile | **React Native (CLI)** |
| Langage | **JavaScript** |
| Gestion d’état | **Redux Toolkit** |
| Navigation | **React Navigation v7** |
| Requêtes API | **Axios** |
| Authentification | **JWT / OAuth2 (via API Elyntis) / firebase auth** |
| Base de données locale | **AsyncStorage** |

---

## Structure du projet



EPM-app/
│
├── src/
│   ├── api/              # Gestion des appels à l’API Elyntis
│   ├── assets/           # Images, icônes, fonts
│   ├── components/       # Composants réutilisables
│   ├── hooks/            # Custom hooks
│   ├── navigation/       # Stack, Tab & Auth Navigators
│   ├── screens/          # Pages principales (Home, Event, Profile, etc.)
│   ├── store/            # Redux/Zustand store
│   ├── types/            # Types et interfaces (JSDoc)
│   └── utils/            # Fonctions utilitaires
│
├── App.jsx               # Point d’entrée principal
├── package.json
└── README.md

````

---

## 🎬 Démonstration

Cliquez ci-dessous pour visionner la démo de l’application :

[Voir la démo EPM](./assets/demo.mp4)


---

## Installation et exécution

### Cloner le projet
```bash
git clone https://github.com/Elintys/EPM.git
cd EPM
````

### Installer les dépendances

```bash
npm install
# ou
yarn install
```

### Configurer les variables d’environnement

Crée un fichier `.env` à la racine du projet :

```
API_BASE_URL=https://api.elyntis.com
GOOGLE_CLIENT_ID=xxxx.apps.googleusercontent.com
APPLE_CLIENT_ID=com.guestpass.ios
```

###  Lancer l’application

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```


---

## Authentification

L’application communique avec l’API Elintys via un système JWT :

* `POST /auth/register`
* `POST /auth/login`
* `GET /auth/me` pour récupérer le profil utilisateur
* Les tokens sont stockés localement via **AsyncStorage (bare RN)**.

---

## Exemple d’intégration API

```js
import axios from 'axios';
import { API_BASE_URL } from '@env';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getEvents = async () => {
  const res = await api.get('/events');
  return res.data;
};
```

---

## Design & UX

* Palette : tons **violets et dorés** (identité Elintys)
* Typographie : **Poppins / Inter**
* Expérience fluide et minimaliste
* Interface bilingue : Français / Anglais

---

## Build & Déploiement

### Android

```bash
npm build:android
```

### iOS

```bash
npm build:ios
```

Les builds peuvent ensuite être téléchargés et publiés sur **Google Play** et **App Store**.

---

## 🧑‍💻 Équipe

* **Product Owner / Designer** : Aurel Noe Kenfack
* **Développeur Mobile** : Aurel Noe Kenfack
* **API Backend** : Elyntis API (Node.js + MongoDB)

---

## 📄 Licence

Ce projet est distribué sous la licence **MIT**.
© 2025 Elintys. Tous droits réservés.

---

## 🌐 Liens utiles

* [🌍 Site Web Elyntis](https://www.elintys.com)
* [💻 API Node.js Repository](https://github.com/Elintys/elintys-api.git)
* [📱 Application Mobile GuestPass (EPM)](https://github.com/Elintys/EPM.git)

```

---


# EPM
