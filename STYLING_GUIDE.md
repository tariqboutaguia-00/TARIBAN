# Styling Guide - Kanban App

## 🎨 Stylisation avec Tailwind CSS

Cette application Kanban a été entièrement stylisée avec **Tailwind CSS** pour offrir une interface moderne et responsive.

### ✨ Fonctionnalités de design

#### 🏠 Navigation
- **Barre de navigation fixe** avec couleurs contrastées
- **Menu responsive** avec transitions fluides
- **Logo et liens** avec effets de hover

#### 📱 Responsive Design
- **Desktop** : Colonnes côte à côte avec largeurs flexibles
- **Tablette** : Colonnes avec débordement horizontal si nécessaire 
- **Mobile** : Colonnes empilées verticalement (`flex-col lg:flex-row`)

#### 🃏 Cards & Components

**Colonnes du Kanban :**
- Couleurs thématiques par statut :
  - 🔴 **À faire** : Rouge (red-50/red-200)
  - 🟡 **En cours** : Jaune (yellow-50/yellow-200) 
  - 🟢 **Terminé** : Vert (green-50/green-200)
- Badges avec compteur de tâches
- Design avec bordures et ombres subtiles

**TaskCards :**
- **Effets de hover** avec transition d'ombre
- **Boutons colorés** selon l'action :
  - Voir : Bleu
  - Éditer : Gris
  - Déplacer gauche : Orange
  - Déplacer droite : Vert
- **Émojis** pour une interface plus intuitive

#### 🔍 Barre d'outils
- **Champ de recherche** avec icône SVG
- **Sélecteur de filtres** avec émojis
- **Layout responsive** qui s'adapte sur mobile

#### 📝 Formulaires
- **Champs stylisés** avec focus states (ring-2 ring-blue-500)
- **Boutons d'action** avec couleurs distinctives
- **Labels sémantiques** avec indicateurs obligatoires
- **Animations de transition** pour tous les états

### 🚀 Classes utilitaires personnalisées

```css
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;  
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

### 📱 Points de rupture responsive

- **sm:** 640px (tablettes)
- **md:** 768px (tablettes paysage)  
- **lg:** 1024px (desktop)
- **xl:** 1280px (large desktop)

### 🎯 Breakpoints critiques

1. **Mobile first** : Design de base optimisé mobile
2. **lg:flex-row** : Passage en colonnes horizontales sur grand écran
3. **sm:flex-row** : Header responsive sur tablette
4. **md:grid-cols-2** : Grilles à 2 colonnes sur tablette

### 🛠 Pour démarrer

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de dev 
npm run dev

# Démarrer le serveur API (dans un autre terminal)
npm run server
```

### 💡 Conseils d'utilisation

- Les **colonnes s'empilent automatiquement** sur mobile
- La **barre d'outils devient verticale** sur petit écran  
- Tous les **boutons ont des états de focus/hover** 
- Les **couleurs suivent une logique sémantique** (rouge=urgent, vert=fini, etc.)
