# Plan d'Exécution : Modifications V2 (Design & Animations)

**CONSIGNES DE SÉCURITÉ ET DE LANGUE :**
1. **Intégrité :** Ne modifie pas la logique tRPC, Prisma ou Auth.
2. **Bilinguisme :** Le site reste en FR/EN. Mets à jour les deux fichiers de traduction si tu ajoutes du texte.
3. **Thème :** Le site est en `forcedTheme="dark"`. Assure-toi que tous les nouveaux composants rendent parfaitement sur fond noir.

---

## Étape 1 : Implémentation du Background Animé Alterné (Zébré)
* **Composant source :** L'utilisateur a fourni le code d'un composant `BackgroundPaths` (basé sur Framer Motion et SVG).
* **Action 1 (Création) :** Crée un fichier `src/components/ui/background-paths.tsx` et insères-y le code des "FloatingPaths". 
* **Action 2 (Adaptation cruciale) :** Modifie le composant principal `BackgroundPaths` pour qu'il agisse comme un **Wrapper de section**. Retire le `title` et le bouton "Discover Excellence" codés en dur. Il doit plutôt accepter une prop `{ children: React.ReactNode }` et l'afficher au-dessus des lignes animées (z-index supérieur).
* **Action 3 (Application alternée) :** Dans `src/app/[locale]/(public)/page.tsx`, applique ce nouveau composant Wrapper de manière **alternée** sur les sections pour créer un rythme bicolore/zébré. 
  - *Exemple d'alternance attendue :* Hero (Avec fond animé) -> Services (Sans fond, noir uni) -> Processus/À propos (Avec fond animé) -> Portfolio (Sans fond, noir uni) -> Contact (Avec fond animé).

## Étape 2 : Création d'un Mega-Menu pour "Services" (Header)
* **Composant source :** L'utilisateur souhaite intégrer un effet de "Header 3" de 21st.dev utilisant `NavigationMenu` de Shadcn UI.
* **Action 1 :** Assure-toi que `@radix-ui/react-navigation-menu` (ou `npx shadcn@latest add navigation-menu`) est installé et configuré.
* **Action 2 :** Dans `src/components/layout/Navbar.tsx`, remplace le lien simple "Services" de la navigation Desktop par un `NavigationMenu`.
* **Action 3 :** Au survol (hover) de "Services", un panneau (Mega-menu) doit s'ouvrir de manière fluide avec un fond "glassmorphism" sombre (`bg-background/95 backdrop-blur-lg`).
* **Contenu du panneau :** Récupère les données de `services-data.ts` (créé en V1) pour générer dynamiquement une grille (ex: 2 colonnes) listant les services avec leur icône, leur titre court et un petit texte descriptif.
* **Responsive :** Garde la version mobile intacte (le tiroir latéral créé en V1), cet effet de Mega-Menu est principalement pour la version Desktop (`md:flex`).