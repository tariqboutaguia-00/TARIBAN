# TARIBAN - Tableau Kanban

## Description du projet

TARIBAN est une application de gestion de tâches basée sur la méthodologie Kanban. Elle permet d'organiser et de suivre l'avancement des tâches à travers trois colonnes principales : "À faire", "En cours" et "Terminé". 

## Technologies utilisées

- **Frontend** : React 19.2.0 avec Vite
- **Styling** : Tailwind CSS 4.1.17 (configuration) + Styles inline
- **Backend** : JSON Server (API REST simulée)
- **Drag & Drop** : @hello-pangea/dnd
- **Routage** : React Router
- **HTTP Client** : Axios

## Instructions pour lancer l'application

### Installation

1. Cloner le projet :

git clone [URL_DU_REPO]
cd projet-kanban


2. Installer les dépendances :

npm install

### Démarrage

1. **Démarrer le serveur JSON (API)** :

npm run server

2. **Démarrer l'application React** (dans un nouveau terminal) :

npm run dev

## Fonctionnalités implémentées

###  Gestion des tâches
- **Création rapide** : Saisie du titre et validation par Entrée
- **Affichage détaillé** : Vue complète avec titre, description, statut et date
- **Modification** : Édition des informations via formulaire 
- **Suppression** : Suppression avec confirmation

###  Interface Kanban
- **Trois colonnes** : À faire, En cours, Terminé
- **Design moderne** : Interface carte avec dégradés et ombres
- **Responsive** : Adaptation automatique aux différentes tailles d'écran
- **Navigation intuitive** : Double-clic pour accéder aux détails

###  Drag & Drop
- **Déplacement inter-colonnes** : Glisser-déposer entre statuts
- **Réorganisation** : Changement d'ordre au sein d'une même colonne
- **Persistance** : Sauvegarde automatique des positions
- **Feedback visuel** : Rotation et ombres pendant le déplacement

###  Recherche et filtres
- **Recherche textuelle** : Dans les titres et descriptions
- **Filtre par statut** : Affichage sélectif par colonne
- **Compteur de résultats** : Affichage du nombre de tâches trouvées

###  Persistance des données
- **API REST** : Communication avec JSON Server
- **Opérations CRUD** : Création, lecture, modification, suppression
- **Gestion d'ordre** : Système de positionnement des tâches
- **Dates automatiques** : Horodatage des créations

## Format des données

### Structure d'une tâche
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "status": "todo" | "inprogress" | "done",
  "createdAt": "ISO string",
  "createdDate": "DD/MM/YYYY",
  "order": "number"
}
```

## Développement

### Architecture
- **Composants fonctionnels** : Hooks React (useState, useEffect)
- **Gestion d'état local** : Pas de store global, état distribué
- **Services découplés** : API abstraite dans taskService.js
- **Styles inline** : Compatibilité garantie, pas de dépendance CSS

### Bonnes pratiques
- **Séparation des responsabilités** : Composants, pages, services
- **Gestion d'erreurs** : Try-catch avec feedback utilisateur
- **Optimisations** : Limitation des re-renders, opérations asynchrones
- **Code propre** : Nommage explicite, structure claire

## Licence

Ce projet est développé dans le cadre d'un exercice pédagogique.
