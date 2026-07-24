# 💊 PharmaGuard — Application Mobile React Native (Expo)

Application mobile Dark Neon destinée à aider les habitants de Ngaoundéré à trouver des médicaments et des pharmacies de garde. 
PharmaGuard est construit avec React Native et Expo, et propose un design moderne, une navigation fluide et des interactions adaptées aux usages santé locaux.

---

## 🎯 Objectif du projet

PharmaGuard vise à :
- Permettre la recherche rapide de médicaments et de pharmacies à proximité
- Afficher les pharmacies de garde et leurs disponibilités
- Présenter des fiches détaillées de médicaments et de pharmacies
- Offrir un chatbot multilingue (français + Fulfuldé) pour l’aide pharmaceutique
- Fournir une interface sombre et ergonomique pour le mobile

---

## 📱 Fonctionnalités principales

- Écran d’accueil avec accès rapide aux catégories et aux alertes santé
- Carte interactive des pharmacies avec localisation et fiche détaillée
- Recherche de médicaments avec suggestions et historique
- Chatbot IA pour poser des questions pharma
- Profil utilisateur avec favoris et paramètres
- Notifications locales pour les gardes et alertes santé
- Thème dark neon adapté à l’identité visuelle du projet

---

## 🧱 Architecture du projet

Le projet est structuré pour séparer clairement l’UI, la navigation et les données :

- `App.js` : point d’entrée de l’application
- `src/navigation/AppNavigator.js` : configuration de la navigation principale (`Stack.Navigator` et `Tab.Navigator`)
- `src/screens/` : écrans de l’application
- `src/components/UI.js` : composants réutilisables (cartes, badges, boutons, etc.)
- `src/data/mockData.js` : données factices pour pharmacies, médicaments et notifications
- `src/theme/colors.js` : palette de couleurs et thèmes

---

## 🧭 Flux de navigation

- `SplashScreen` → page de démarrage
- `LoginScreen` → connexion / inscription
- `HomeScreen` → point d’entrée principal
- `MapScreen` → carte des pharmacies
- `SearchScreen` → recherche de médicaments
- `ChatbotScreen` → conversation avec le PharmaBot
- `ProfileScreen` → profil, favoris et paramètres
- `MedicationDetailScreen` → détail d’un médicament
- `PharmacyDetailScreen` → détail d’une pharmacie
- `NotificationsScreen` → alertes et notifications

---

## 🚀 Installation

### Prérequis

- Node.js 18+ → https://nodejs.org
- npm 9+
- Expo CLI globalement installé
- Expo Go sur smartphone (Android / iOS)

### Installation des dépendances

```bash
cd pharmaguard
npm install
```

### Lancer le projet

```bash
npm run start
```

Puis scannez le QR code avec Expo Go ou utilisez un émulateur.

---

## 🛠️ Commandes utiles

```bash
npm run start      # ouvre Expo
npm run android    # ouvre sur Android
npm run ios        # ouvre sur iOS
npm run web        # ouvre dans le navigateur
npx expo start --clear  # vide le cache
```

---

## 📦 Dépendances

Versions actuelles installées :

- `expo` ~54.0.36
- `react` 19.1.0
- `react-native` 0.81.5
- `@react-navigation/native` ^6.1.17
- `@react-navigation/native-stack` ^6.9.26
- `@react-navigation/bottom-tabs` ^6.6.1
- `@expo/vector-icons` ^15.0.3
- `react-native-safe-area-context` ~5.6.0
- `react-native-screens` ~4.16.0
- `react-native-url-polyfill` ^4.0.0

DevDependencies :

- `@babel/core` ^7.25.2
- `@expo/metro-config` ^57.0.7
- `babel-preset-expo` ~54.0.10
- `expo-doctor` ^1.20.1

---

## 🧩 Structure des fichiers

```
App.js
app.json
babel.config.js
package.json
README.md
src/
  components/
    UI.js
  data/
    mockData.js
  navigation/
    AppNavigator.js
  screens/
    ChatbotScreen.js
    HomeScreen.js
    LoginScreen.js
    MapScreen.js
    MedicationDetailScreen.js
    NotificationsScreen.js
    PharmacyDetailScreen.js
    ProfileScreen.js
    SearchScreen.js
    SplashScreen.js
  theme/
    colors.js
```

---

## 🎨 Personnalisation

### Modifier les couleurs

Éditez `src/theme/colors.js` pour adapter la palette des composants.

### Modifier les données

Éditez `src/data/mockData.js` pour changer les pharmacies, médicaments, horaires et notifications.

### Ajouter un nouvel écran

1. Créez `src/screens/NouvelEcran.js`
2. Importez l’écran dans `src/navigation/AppNavigator.js`
3. Ajoutez une route dans le `Stack.Navigator` ou le `Tab.Navigator`

---

## 🌍 Internationalisation

Le projet contient déjà des éléments en français et Fulfuldé. Pour aller plus loin :

- installez `react-i18next` ou `i18n-js`
- créez des fichiers de traduction dans `src/locales/`
- encapsulez les chaînes textuelles dans des fonctions de traduction

---

## 🐞 Dépannage

### Expo ne démarre pas

```bash
npm run start -- --clear
```

### Module introuvable

- Vérifiez que tous les fichiers sont correctement nommés
- Vérifiez la casse des imports
- Relancez Expo après avoir vidé le cache

### Problème de connexion Expo Go

- Assurez-vous que l’ordinateur et le mobile sont sur le même réseau
- Essayez `npx expo start --tunnel`

---

## 🤝 Contribution

Pour contribuer :

1. Clonez le dépôt
2. Installez les dépendances
3. Créez une branche feature
4. Ajoutez du code propre et testez localement
5. Ouvrez une pull request avec une description claire

---

## 📄 Licence

Projet privé / usage interne. Adaptez selon vos besoins.
# pharmaguard
