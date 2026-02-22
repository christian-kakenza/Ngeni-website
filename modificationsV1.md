# Plan d'Exécution : Modifications V1 (Projet NGENI)

**Contexte pour l'Agent IA :**
Ce document contient 14 modifications majeures de design, d'UX et de contenu basées sur des tests réels (PC et Mobile). 
**RÈGLE STRICTE :** Tu as un accès complet à ma base de code. Tu dois appliquer ces modifications **directement dans les fichiers concernés**, ÉTAPE PAR ÉTAPE. Ne modifie pas tout en un seul bloc. 

Pour chaque étape, ton cycle de travail doit être exactement le suivant :
1. Analyse l'étape demandée.
2. Modifie le(s) fichier(s) directement dans mon projet.
3. Dis-moi quels fichiers tu viens de modifier et résume brièvement l'action.
4. **ARRÊTE-TOI ET ATTENDS MA CONFIRMATION.** Je vais vérifier le résultat en direct sur mon navigateur. Je te dirai de passer à l'étape suivante uniquement quand j'aurai validé ton travail. Je ne copierai-collerai aucun code moi-même.

---

## Étape 1 : Rebranding global (Nom)
* **Action :** Remplacer toutes les occurrences de "WhiteboxAi" et "WHITEBOXIA" par **NGENI**.
* **Cible :** `layout.tsx`, `page.tsx`, composants de navigation, metadata SEO, footer, etc.

## Étape 2 : Typographie "Luxury Tech" (Style Linear / Raycast)
* **Problème :** La police actuelle ressemble à un document Word basique, trop petite et peu lisible.
* **Action :** Implémenter une typographie moderne, crisp et très lisible inspirée de Raycast ou Linear (ex: polices Inter, Geist, ou SF Pro). Augmenter légèrement les tailles de base (text-base, text-lg) et optimiser l'interligne (leading) et le tracking pour un rendu premium.

## Étape 3 : Gestion des Thèmes (Clair / Sombre)
* **Action :** Ajouter un support complet pour le mode Clair (Light Mode) via `next-themes`.
* **Comportement :** - Par défaut : S'aligner sur les préférences système de l'appareil de l'utilisateur (System default).
  - Le mode clair ne doit pas être "éblouissant", mais conserver l'aspect premium et agréable à l'œil (couleurs de fond douces, contrastes maîtrisés).
* **UI :** Ajouter un bouton (Toggle) de changement de thème (Clair/Sombre/Système) juste à côté du bouton de changement de langue dans la navigation.

## Étape 4 : Hero Section (Accueil)
* **Action 1 :** Ajouter un fond animé (mouvements fluides, particules subtiles ou lueur mouvante) derrière le texte principal : *"L’intelligence Artificielle au service de l’Afrique"*.
* **Action 2 :** Supprimer la liste des technologies (Nest.js, TypeScript, PostgreSQL, etc.).
* **Action 3 :** Remplacer par 3 boutons clairs pour annoncer le futur téléchargement de notre application de suivi : "Télécharger pour iOS", "Télécharger pour Android", et "Explorer sur AppGallery (Huawei)".

## Étape 5 : Header Mobile Minimaliste
* **Problème :** Le header mobile est trop chargé.
* **Action :** Sur les petits écrans (`md:hidden`), le header ne doit contenir **que deux éléments** :
  1. Le logo (NGENI) à gauche.
  2. Le bouton Hamburger (3 tirets) à droite pour ouvrir le menu.

## Étape 6 : Smooth Scrolling (Navigation interne)
* **Action :** Activer le défilement doux (smooth scroll) pour les ancres. Par exemple, cliquer sur "Équipe" dans la navigation desktop doit faire glisser la page de manière fluide jusqu'à la section correspondante au lieu d'un saut instantané.

## Étape 7 : Refonte de la Section Services (et Sous-pages)
* **Action 1 :** Retirer les numéros affichés sur chaque carte de service. Ne garder que la spécialité.
* **Action 2 :** Rendre chaque carte entièrement cliquable.
* **Action 3 :** Créer des pages de détails dynamiques ou statiques pour chaque service qui parle de chaque services en detail et montre sont importences dans le developpement de l afrique en gelerale et de la rdc en particulier {engager agents si possible pour faire des recherche sur internet pour plus de clarter}(ex: `/services/nom-du-service`).
* **Contenu attendu par page :** Le design doit être ultra-professionnel, responsive, inclure des graphiques style "Dashboard/App", des images de haute qualité, et un texte détaillé et pertinent sur l'offre de ce service spécifiquement en RDC (République Démocratique du Congo et en afrique).

## Étape 8 : Section Équipe
* **Action 1 :** Renommer le titre de la section "Notre équipe" par simplement **"Équipe"**.
* **Action 2 :** Ajouter des icônes/liens pour **GitHub, Discord, et Twitter (X)** en plus de LinkedIn pour chaque membre.

## Étape 9 : Animation de la Section Témoignages
* **Action :** Transformer la grille/liste des témoignages ("Ce que disent nos clients") en un carrousel à défilement horizontal automatique (de gauche à droite).
* **Comportement :** L'utilisateur doit toujours pouvoir interagir manuellement avec (scroll au doigt ou à la souris) sans casser l'animation.

## Étape 10 : Masquage de la Section Tarifs
* **Action :** Mettre en commentaire (comment out) tout le code de la section "Tarifs/Pricing". Ne pas la supprimer, juste la cacher pour l'instant de l'interface utilisateur.

## Étape 11 : Mise en valeur du Footer
* **Action :** Mettre en gras et rendre plus visibles les titres des colonnes du Footer : **"Nos services"**, **"Entreprise"**, et **"Contact"**.

## Étape 12 : UX Connexion et Chatbot
* **Action 1 (Auth) :** Ajouter un bouton/lien clair "Retour à l'accueil" sur les pages de Connexion et de Création de compte.
* **Action 2 (Chatbot UI) :** Permettre la fermeture du widget chatbot en cliquant à l'extérieur de celui-ci (Click Outside).
* **Action 3 (Chatbot State) :** La conversation ne doit pas être perdue si l'utilisateur ferme le widget sans rafraîchir la page (cacher le composant via CSS ou React State, ne pas le démonter). Pour un utilisateur connecté, l'historique de session doit persister tant qu'il ne se déconnecte pas ou ne force pas un rafraîchissement complet.

## Étape 13 : Nettoyage des Numérotations Visuelles
* **Action :** Supprimer toutes les numérotations chiffrées (1, 2, 3...) qui ne font pas pro sur :
  - Les cartes de la section Services (déjà mentionné à l'étape 7).
  - Le menu de navigation mobile.
  - La section "Comment nous travaillons" (Processus).

## Étape 14 : Nouvelle Section "Portfolio / Nos Réalisations"
* **Action :** Remplacer visuellement l'ancienne place de la section Tarifs par une nouvelle section présentant nos produits déjà créés.
* **Contenu :** Préparer des emplacements (placeholders) pour un minimum de 3 projets (Sites web, SaaS, etc.). Prévoir la place pour l'image, le titre, la description courte et un lien "Voir le projet". Je fournirai les liens et détails plus tard.

**CONSIGNES DE SÉCURITÉ ET DE LANGUE (CRUCIAL) :**
1. **Intégrité du code :** Ne touche ABSOLUMENT PAS aux fichiers, fonctions ou styles que je n'ai pas mentionnés dans les étapes ci-dessous. Ton intervention doit être chirurgicale.
2. **Respect de la Langue :** Le site est bilingue (Français/Anglais). Lorsque tu modifies un texte ou un titre, assure-toi de mettre à jour les deux versions (fichiers de traduction ou dossiers `[locale]`) sans changer la langue d'origine. Ne traduis pas en anglais ce qui doit rester en français et vice-versa.
3. **Conservation des fonctionnalités :** Ne modifie pas la logique tRPC, Prisma ou NextAuth existante, sauf si c'est explicitement demandé pour l'étape en cours.