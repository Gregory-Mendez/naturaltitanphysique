# Body Titan Fitness App

**Description**: Application de coaching en musculation personnalisée offrant une bibliothèque complète d'exercices avec vidéos de démonstration, programmes d'entraînement structurés, conseils nutritionnels et système de réservation de séances.

**Tech Stack**: React + TypeScript + Vite + Tailwind CSS | Backend: N/A | Auth: Système de mot de passe personnalisé (TitanGryx2024) | PWA: vite-plugin-pwa

## User Preferences
- **Language**: Français (fr-FR)
- **Code Style**: React fonctionnel avec TypeScript, Tailwind CSS pour le styling
- **Design System**: Thème sombre style salle de sport avec texture grille métallique et effets lumineux, couleurs du drapeau basque (rouge, vert, blanc)

## Directory Structure
- `/src`: Code frontend (components, pages, lib)
  - `/components`: Layout.tsx (navigation principale)
  - `/pages`: Home.tsx, Exercises.tsx, Programs.tsx, Nutrition.tsx, Products.tsx, Contact.tsx, Legal.tsx
  - `/lib`: lumi.ts (SDK Lumi)
- `/public`: Assets statiques

## Current Features

### Implemented
1. **Page d'accueil (Home.tsx)**: Présentation de TitanGryx, services proposés, appel à l'action
   - **Nouveau**: Section "Challenges Hebdomadaires" mettant en avant les programmes courts (Commando, Bras de Titan, Guerrier)
   - **Mise à jour**: Accès aux Challenges restreint uniquement aux abonnés "Premium Annuel"
   - **Mise à jour**: Fréquence du Challenge Commando modifiée à "Aléatoire 3x/semaine (Combiné)"
   - **Mise à jour**: Les cartes Challenges ouvrent désormais les détails du programme directement dans un modal sur la page d'accueil (plus de redirection)
   - Fichiers: `src/pages/Home.tsx`
2. **Bibliothèque d'exercices (Exercises.tsx)**: 
   - Plus de 380 exercices organisés en 19 catégories
   - **Nouveau**: Catégorie "Challenges Exclusifs (Premium Annuel)" avec restriction d'accès
   - Chaque exercice avec lien vidéo YouTube (5-10 secondes)
   - Catégories: Challenges Exclusifs, Pectoraux, Biceps, Triceps, Épaules, Dos, Trapèzes, Quadriceps, Ischio-jambiers, Mollets, Fessiers, Abdominaux, Avant-bras, Poids du corps, Élastiques, Souplesse/Mobilité, Échauffement, Exercices Programmes
   - Protection par code d'accès unique (généré par webhook) ou mot de passe admin (TitanGryx2024)
   - Fichiers: `src/pages/Exercises.tsx`
3. **Programmes d'entraînement (Programs.tsx)**: 
   - Programmes structurés (Débutant, Intermédiaire, Avancé, Prise de masse, Sèche/Définition, Force, Femmes)
   - **Nouveau**: Programmes "Semaine Type" & Challenges (Commando, Bras de Titan, Guerrier Pressé, Full Body Hebdo)
   - Chaque programme avec objectifs, niveau, durée, séances hebdomadaires et exercices détaillés
   - Fichiers: `src/pages/Programs.tsx`
4. **Nutrition (Nutrition.tsx)**: 
   - Protection par code d'accès unique ou mot de passe admin (TitanGryx2024)
   - Conseils nutritionnels détaillés (6 tips essentiels)
   - Calculateur de besoins caloriques avec macros
   - 5 plans alimentaires complets avec répartition MACROS (Protéines/Glucides/Lipides)
   - Guide complet de 12 suppléments avec descriptions détaillées : Whey, Créatine, BCAA, Oméga 3, Vitamine D, Magnésium, Multivitamines, Glutamine, Vitargo, ZMA, Caféine, Bêta-Alanine
   - Avertissement anti-dopage prominent
   - Conseils professionnels et ordre de priorités
   - Fichiers: `src/pages/Nutrition.tsx`
5. **Produits (Products.tsx)**: Page de présentation de l'offre structurée (Programmes, Nutrition, Challenges, Vidéos) - Fichiers: `src/pages/Products.tsx`
6. **Contact (Contact.tsx)**: Informations de contact (email, téléphone, adresse) - Fichiers: `src/pages/Contact.tsx`
7. **Navigation (Layout.tsx)**: Menu de navigation responsive avec logo et liens - Fichiers: `src/components/Layout.tsx`
8. **Paiement (Subscription.tsx)**: Intégration Stripe pour les abonnements avec période d'essai de 7 jours et validation CGV/Santé obligatoire - Fichiers: `src/pages/Subscription.tsx`
9. **Mentions Légales (Legal.tsx)**: CGV, Politique de confidentialité et Avertissement Santé - Fichiers: `src/pages/Legal.tsx`
10. **Admin (Admin.tsx)**: Panneau d'administration pour gérer les codes d'accès clients (protection par mot de passe TitanGryx2024) - Fichiers: `src/pages/Admin.tsx`

### Known Limitations
- Pas de système de réservation en ligne fonctionnel (formulaire de contact uniquement)
- Pas de base de données pour stocker les utilisateurs ou les réservations
- Système d'authentification basique (mot de passe unique pour accès exercices)

## Database Schema
**Type**: MongoDB (Lumi SDK)

### `access_codes`
```typescript
{
  code: string,       // Unique 8-char alphanumeric code
  email: string,      // User email
  planId: string,     // Plan purchased (e.g., 'premium_app_monthly')
  status: 'active' | 'revoked',
  createdAt: string   // ISO 8601 date
}
```

## Deno Functions

### `createCheckoutSession`
- **Purpose**: Créer une session de paiement Stripe pour les abonnements
- **Endpoint**: `POST /functions/v1/createCheckoutSession`
- **Input**: `{ planId: string, userId: string, returnUrl: string, provider?: 'stripe' | 'paypal' }`
- **Output**: `{ url: string }`
- **Auth**: Oui (via Lumi Auth)

### `stripeWebhook`
- **Purpose**: Gérer les événements Stripe (paiement réussi)
- **Trigger**: `checkout.session.completed`
- **Action**: Génère un code d'accès unique, stocke en DB, envoie un email au client
- **Env**: `STRIPE_WEBHOOK_SECRET`, `STRIPE_SECRET_KEY`

### `verifyAccessCode`
- **Purpose**: Vérifier la validité d'un code d'accès ou mot de passe admin
- **Endpoint**: `POST /functions/v1/verifyAccessCode`
- **Input**: `{ code: string }`
- **Output**: `{ valid: boolean, planId?: string, type?: 'client'|'admin' }`

## API Endpoints
- `POST /api/auth/login`: User login (Lumi Auth)
- `POST /functions/v1/createCheckoutSession`: Stripe Payment Session (Fallback & Séance Individuelle)

**External Integrations**: 
- YouTube (liens vidéos)
- Stripe (Paiements et abonnements via Stripe Payment Links & API)
- PayPal (Paiements sécurisés)
**Lumi SDK Tools Used**: LumiSdkDenoFunctionTool, CardDenoEnvWriteTool

## Improvement Opportunities

### High Priority
- [ ] **Système de réservation fonctionnel**: Intégrer une solution de calendrier et paiement en ligne
- [ ] **Base de données**: Ajouter MongoDB pour gérer utilisateurs, réservations, et progression
- [ ] **Authentification utilisateur**: Remplacer le système de mot de passe unique par un système d'authentification complet (Lumi Auth)

### Medium Priority
- [ ] **Suivi de progression**: Permettre aux utilisateurs de suivre leurs entraînements et progrès
- [ ] **Plans nutritionnels personnalisés**: Générer des plans alimentaires basés sur les objectifs
- [ ] **Système de paiement**: Intégrer Stripe ou PayPal pour les paiements en ligne

### Low Priority / Future Enhancements
- [ ] **Notifications**: Rappels d'entraînement et de séances
- [ ] **Communauté**: Forum ou chat pour les clients
- [ ] **Vidéos longues**: Tutoriels complets en plus des démos courtes

## Recent Updates (Latest First)

### 2025 - Session actuelle : Système de Mots de Passe Uniques
- ✅ **Codes d'Accès Client** : Chaque paiement Stripe génère un mot de passe unique (8 caractères alphanumériques)
- ✅ **Email Automatique** : Le code est envoyé par email au client après validation du paiement
- ✅ **Fonction Webhook** : `stripeWebhook` écoute les événements `checkout.session.completed` et crée les codes
- ✅ **Vérification Sécurisée** : `verifyAccessCode` valide les codes client ou le mot de passe admin (TitanGryx2024)
- ✅ **Base de Données** : Collection MongoDB `access_codes` pour stocker les codes avec statut et plan
- ✅ **Double Protection** : Admin garde son accès avec TitanGryx2024, clients avec leur code unique

### 2025 - Session actuelle : Social & Preuve Sociale
- ✅ **Témoignages Clients** : Ajout d'une section "Ils ont transformé leur physique" sur la page Produits avec 3 retours d'expérience détaillés (Aurélien L., Sarah B., Thomas M.)
- ✅ **Lien Instagram** : Intégration du logo et lien direct vers le compte `@gregouuz_e` dans le pied de page pour renforcer la communauté
- ✅ **Design** : Mise en page soignée des témoignages avec étoiles, photos de profil (initiales) et citations

### 2025 - Session actuelle : Refonte Page Produits
- ✅ **Détail de l'Offre** : Ajout d'une section "Pour qui ?" ciblant Débutants, Intermédiaires, Pressés et Passionnés
- ✅ **Clarté Tarifs** : Affichage direct des prix (6,99€/mois & 49€/an) sur la page Produits avec mention fiscale
- ✅ **Transparence** : Liste précise des fonctionnalités incluses (Programmes, Nutrition, Challenges, Vidéos)
- ✅ **UX** : Redirection directe vers le paiement depuis les cartes tarifs

### 2025 - Session actuelle : Conformité Légale & Fiscale
- ✅ **Mentions Légales Complètes** : Ajout de l'identité de l'éditeur, contact, hébergement et statut fiscal (Auto-entrepreneur)
- ✅ **Clause Fiscale** : Ajout de la mention obligatoire "TVA non applicable, art. 293 B du CGI" dans les tarifs et mentions légales
- ✅ **CGV Renforcées** : Mise à jour des conditions de vente avec clause spécifique de renonciation au droit de rétractation pour contenu numérique (Art. L221-28)
- ✅ **Transparence** : Structure claire en 4 sections (Mentions, CGV, Santé, RGPD)

### 2025 - Session actuelle : Page Produits
- ✅ **Nouvelle Page** : Création de la page "Produits" (/produits) présentant l'offre structurée
- ✅ **Contenu** : Sections Programmes, Nutrition, Challenges et Vidéos
- ✅ **Navigation** : Ajout de l'onglet Produits dans le menu principal

### 2025 - Session actuelle : Instagram & Confidentialité
- ✅ **Instagram** : Ajout du logo et lien direct vers le compte `gregouuz_e` dans le pied de page
- ✅ **Confidentialité** : Mise à jour du lien de pied de page pour mentionner explicitement "Confidentialité" (pointant vers la page Légale existante)

### 2025 - Session actuelle : Conformité RGPD
- ✅ **Politique de Confidentialité** : Refonte complète pour conformité RGPD (Règlement Général sur la Protection des Données)
- ✅ **Transparence** : Détail des données collectées, finalités, base légale et sécurité
- ✅ **Droits Utilisateurs** : Section explicite sur les droits d'accès, rectification, effacement et portabilité
- ✅ **Contact DPO** : Mise en avant de l'email de contact pour l'exercice des droits

### 2025 - Session actuelle : Intégration Stripe Links
- ✅ **Paiement Simplifié** : Intégration des liens de paiement Stripe directs pour les abonnements (6,99€ et 49€)
- ✅ **Résolution Erreur 500** : Contournement des erreurs API backend par l'utilisation de liens directs robustes
- ✅ **Tracking Utilisateur** : Injection automatique de l'ID utilisateur et de l'email dans le lien Stripe pour le suivi
- ✅ **Correction UX** : Ouverture des liens de paiement dans un nouvel onglet pour éviter les pages blanches et conflits PWA

### 2025 - Session actuelle : Ajout des Macros Nutrition
- ✅ **Détails Nutritionnels** : Ajout de la répartition des macronutriments (Protéines, Glucides, Lipides) pour chaque plan alimentaire
- ✅ **Affichage Clair** : Les macros sont affichées en bleu sous les calories pour une lecture rapide
- ✅ **Précision** : Valeurs adaptées à chaque objectif (Prise de masse, Sèche, Végétarien...)

### 2025 - Session actuelle : Corrections Critiques & UX
- ✅ **Correction Accès Essai Gratuit** : Le système détecte maintenant correctement les abonnements en période d'essai ("trialing") en plus des actifs
- ✅ **Correction Nutrition** : Correction du bug qui empêchait le déverrouillage automatique de la page Nutrition (propriété invalide)
- ✅ **Persistance du Mot de Passe** : Une fois le mot de passe "TitanGryx2024" entré, l'accès reste déverrouillé sur l'appareil (via LocalStorage) pour éviter de le ressaisir à chaque fois
- ✅ **Partage Facile** : Ajout du bouton de partage dans la navigation

### 2025 - Session actuelle : Amélioration UX Exercices
- ✅ **Déverrouillage Intelligent** : La page Exercices se déverrouille désormais automatiquement pour les abonnés Premium
- ✅ **Sécurité Hybride** : Le mot de passe "TitanGryx2024" reste disponible en secours
- ✅ **Feedback Visuel** : Toast de confirmation lors de l'accès automatique

### 2025 - Session actuelle : Fonctionnalité de Partage
- ✅ **Bouton Partager** : Ajout d'un bouton dédié dans la navigation (Desktop & Mobile)
- ✅ **Partage Natif** : Utilisation de l'API `navigator.share` pour ouvrir les apps de messagerie (WhatsApp, SMS...)
- ✅ **Fallback** : Copie automatique du lien dans le presse-papier si le partage natif n'est pas supporté

### 2025 - Session actuelle : Optimisation SEO (Référencement)
- ✅ **Visibilité Google** : Ajout des fichiers `robots.txt` et `sitemap.xml` pour guider les moteurs de recherche
- ✅ **Méta-données Avancées** : Ajout des mots-clés (Keywords), auteur et directives robots dans index.html
- ✅ **Social Cards** : Ajout des balises Open Graph (Facebook/WhatsApp) et Twitter Cards pour de beaux aperçus lors du partage

### 2025 - Session actuelle : Amélioration UX Nutrition
- ✅ **Déverrouillage Intelligent** : La page Nutrition se déverrouille désormais automatiquement pour les abonnés Premium connectés
- ✅ **Expérience Fluide** : Plus besoin de saisir le mot de passe "TitanGryx2024" si l'abonnement est actif
- ✅ **Feedback Visuel** : Ajout d'un Toast de confirmation lors du déverrouillage automatique

### 2025 - Session actuelle : Nouveaux Plans Nutritionnels
- ✅ **Diversité Alimentaire** : Ajout de 3 nouveaux plans nutritionnels complets
- ✅ **Plan Végétarien Athlétique** : Performance sans viande (Légumineuses, Oeufs, Laitiers) ~2300 kcal
- ✅ **Plan Budget Maîtrisé** : Efficacité à petit prix (Oeufs, Thon, Fromage Blanc) ~2500 kcal
- ✅ **Recettes Express** : Idées recettes hyper-protéinées (Pancakes Titan, Bowl Tiramisu Fit, Wrap Poulet...)

### 2025 - Session actuelle : Variation des Programmes
- ✅ **Diversification** : Modification du premier exercice de 3 programmes pour éviter la répétition du Squat
- ✅ **Programme Perte de Poids** : Début par "Fentes dynamiques"
- ✅ **Programme Maison** : Début par "Step-up (sur chaise)"
- ✅ **Full Body Intensif** : Début par "Soulevé de Terre"

### 2025 - Session actuelle : Exercices Exclusifs
- ✅ **Nouveaux Exercices** : Ajout des 3 Supersets du Challenge Guerrier Pressé dans l'onglet Exercices
- ✅ **Restriction d'Accès** : Ces nouveaux exercices sont visibles mais verrouillés pour les non-membres "Premium Annuel"
- ✅ **Sécurité Hybride** : Intégration de la vérification d'abonnement (Lumi Auth) au sein de la page protégée par mot de passe

### 2025 - Session actuelle : Mise à jour Vidéo
- ✅ **Correction Vidéo** : Mise à jour de 3 liens vidéo pour le challenge "Semaine Guerrier Pressé" (Squat+Pompes, Fentes+Rowing, Press+Crunch)
- ✅ **Correction Vidéo** : Mise à jour du lien pour l'exercice "Barre au front" dans le Challenge Bras de Titan

### 2025 - Session actuelle : Restriction Challenges
- ✅ **Accès Restreint** : Les 3 challenges hebdomadaires sont désormais réservés aux membres ayant un abonnement "Premium Annuel"
- ✅ **Mise à jour Programme** : Challenge Commando passe en fréquence "Aléatoire 3x/semaine (Combiné)"
- ✅ **Feedback Utilisateur** : Ajout d'un Toast de verrouillage si l'utilisateur n'a pas le bon abonnement

### 2025 - Session actuelle : Modal Challenges Home
- ✅ **Modal Interactif** : Les 3 challenges de la page d'accueil s'ouvrent maintenant dans un modal dédié au lieu de rediriger
- ✅ **Expérience Fluide** : Consultation immédiate du programme (échauffement, exercices, vidéos) sans quitter la Home
- ✅ **Données Intégrées** : Duplication locale des données challenges pour affichage rapide

### 2025 - Session actuelle : Corrections Rapides
- ✅ **Correction Vidéo** : Mise à jour du lien pour l'exercice "Thrusters" dans le Challenge Commando

### 2025 - Session actuelle : Section Challenges
- ✅ **Nouvelle Section Home** : Ajout d'un bloc "Challenges Hebdomadaires" sur la page d'accueil
- ✅ **Mise en avant** : Cartes interactives pour les programmes Commando, Bras de Titan et Guerrier Pressé
- ✅ **Design** : Intégration visuelle avec le thème (icônes, dégradés, badges)

### 2025 - Session actuelle : Nouveaux Programmes Hebdomadaires
- ✅ **5 Nouveaux Programmes** : Ajout de programmes courts sur 1 semaine pour casser la routine
- ✅ **Challenge Commando** : Programme Sèche Express 5 jours
- ✅ **Bras de Titan** : Spécialisation bras 3 jours
- ✅ **Guerrier Pressé** : Séances de 30 min pour les gens pressés
- ✅ **Full Body Hebdo** : Versions Débutant et Intermédiaire pour une semaine complète

### 2025 - Session précédente : Nettoyage et Mises à jour Vidéos
- ✅ **Correction Programme** : Remplacement 'Curl biceps haltères' par 'Curl biceps machine' dans le programme Haut du Corps Machine
- ✅ **Suppression Programmes** : Retrait des programmes "Bodybuilding Compétition", "Prise de Masse Femme" et "CrossFit"
- ✅ **Mise à jour Vidéos** : Actualisation des liens pour Soulevé de terre, Développé couché, Hip thrust et autres
- ✅ **Correction Liens** : Intégration de nouveaux YouTube Shorts

### 2025 - Session précédente : PWA et Sécurité
- ✅ **PWA Avancée** : Intégration de `vite-plugin-pwa` pour une gestion native de l'application (Service Worker, Cache, Installation)
- ✅ **Sécurité & Visibilité** : Configuration complète du manifest via Vite pour assurer la compatibilité Chrome/Android
- ✅ **Nettoyage** : Suppression du lien manifest manuel dans index.html (géré automatiquement)
- ✅ **Méta-données** : Titre de l'application harmonisé "Body Titan Fitness"

### 2025 - Session précédente : PWA et Nettoyage Plans
- ✅ **Correction Logo Mobile** : Revert au logo précédent (TitanGryx) suite à une erreur de fichier (format JPG)
- ✅ **Logo Mobile** : Mise à jour de l'icône de l'application (PWA et Favicon) avec le nouveau logo Body Titan (Poing Euskadi)
- ✅ **Notification Installation PWA** : Ajout d'un Toast automatique proposant l'installation de l'application sur mobile
- ✅ **PWA Activée** : Application installable sur mobile (Manifest.json ajouté) avec logo Body Titan
- ✅ **Bouton Installation** : Ajout d'une section "Installer l'Application" sur la page Abonnement
- ✅ **Nettoyage Booking** : Suppression des plans "Suivi Mensuel" et "Conseillé Complet" pour cohérence
- ✅ **Plans App** : Seuls les plans Premium App (6,99€ et 49€) sont conservés (100% digital)

### 2025 - Session précédente : Mentions Légales et Validation
- ✅ **Correction Affichage Abonnement** : Les cartes des plans (6,99€ et 49€) s'affichent désormais correctement (correction de la boucle de rendu vide)
- ✅ **Mentions Légales** : Création de la page dédiée avec CGV, Confidentialité et Avertissement Santé (prioritaire)
- ✅ **Validation Obligatoire** : Ajout d'une case à cocher d'acceptation des CGV/Santé avant le paiement
- ✅ **Nouveaux Plans Premium** : Distinction claire entre "Premium Mensuel" (6,99€) et "Premium Annuel" (49€)
- ✅ **Essai Gratuit** : Intégration de 7 jours d'essai gratuit pour les deux plans Premium via Stripe
- ✅ **Mise à jour Booking** : Ajout des plans Premium App (Mensuel/Annuel) dans l'onglet "Réserver" avec redirection directe vers le paiement
- ✅ **Intégration Cross-Page** : Les abonnements App dans "Réserver" redirigent désormais automatiquement vers le modal de paiement de la page Abonnement
- ✅ **Nettoyage** : Suppression de la section QR Code sur la page Abonnement (remplacée par lien direct)
- ✅ **Mise à jour Deno** : Fonction `createCheckoutSession` adaptée pour gérer les nouveaux ID de plans et périodes d'essai
- ✅ **Navigation** : Liens et redirections vérifiés pour l'expérience utilisateur

### 2025 - Session précédente : Mise à jour des abonnements et navigation
- ✅ **Intégration PayPal** : Activation du paiement via PayPal (mode one-time payment) pour tous les plans
- ✅ **Mise à jour Deno** : Fonction `createCheckoutSession` supporte désormais le paramètre `provider` ('stripe' ou 'paypal')
- ✅ **Interface** : Bouton PayPal activé sur la page Abonnement
- ✅ **Fonction Deno** : `createCheckoutSession` déployée pour gérer les transactions sécurisées
- ✅ **Nouveau Plan Premium App** : Ajout de l'abonnement digital à 6,99€/mois ou 49€/an avec essai gratuit 7 jours
- ✅ **Mise à jour Badge Premium** : Page d'accueil mise à jour avec les nouveaux tarifs et lien vers abonnements
- ✅ **Nettoyage** : Suppression de l'onglet "Réserver" et de l'offre "Séance Individuelle" pour se concentrer sur l'application 100% digitale
- ✅ **Phrase motivante ajoutée** : "Respire – Contrôle – Contracte – Expire" visible sur chaque exercice
- ✅ **Programme Push/Pull/Legs COMPLET** : Ajout des jours Pull (dos/biceps) et Legs (jambes)
- ✅ **Mise à jour 37 liens vidéo** : Exercices programmes mis à jour
- ⏳ **En cours** : Système de paiement CB/PayPal et QR code téléchargement

### 2024 - Session précédente : Sécurisation des contenus et mises à jour vidéos
- ✅ **Protection par mot de passe des Programmes** : Système de verrouillage identique aux Exercices et Nutrition (TitanGryx2024)
- ✅ **Mise à jour vidéos Trapèzes** : 10 exercices avec nouveaux liens YouTube Shorts
- ✅ **Mise à jour vidéos Quadriceps** : 15 exercices avec nouveaux liens YouTube Shorts
- ✅ **Mise à jour vidéos Ischio-jambiers** : 15 exercices avec nouveaux liens YouTube Shorts
- ✅ **Total cumulé** : 69 liens vidéo mis à jour sur cette session

### 2024 - Session précédente : Améliorations visuelles et nutrition
- ✅ **Fond style salle de sport** : Texture grille métallique, dégradé sombre, effets lumineux rouge/vert
- ✅ **Page Nutrition améliorée** : Système de verrouillage par mot de passe
- ✅ **12 suppléments détaillés** : Descriptions complètes, dosages, timing, mode d'emploi
- ✅ **Avertissement anti-dopage** : Message clair sur les produits 100% naturels et légaux
- ✅ **Calculateur caloriques** : Avec répartition macronutriments
- ✅ **Plans alimentaires** : Prise de masse et sèche avec 7 repas détaillés

### 2024 - Mise à jour massive de la bibliothèque d'exercices
- ✅ Ajout de 36 nouveaux exercices dans la catégorie "Exercices Programmes"
- ✅ Mise à jour de 14 liens vidéo pour les exercices Triceps avec nouveaux YouTube Shorts
- ✅ Total: 380+ exercices avec vidéos de démonstration

### 2024 - Mises à jour précédentes
- ✅ Mise à jour des liens vidéo Biceps (15 exercices)
- ✅ Mise à jour des liens vidéo Pectoraux (15 exercices)
- ✅ Structure complète de l'application avec 6 pages principales
- ✅ Thème visuel basque (rouge, vert, blanc) avec fond sombre

## Contact Information
- **Coach**: TitanGryx (Conseiller en musculation - 10 ans d'expérience)
- **Email**: bodytitan64@yahoo.com
- **Téléphone**: 06.62.11.84.44
- **Localisation**: Saint-Jean-de-Luz, FRANCE

## Pricing
- **Premium App**: 6,99€/mois ou 49€/an (Essai gratuit 7 jours)
