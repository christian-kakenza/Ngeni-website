# 🚀 AVANT LE DÉPLOIEMENT — Checklist complète NGENI

> Document généré après audit complet de l'application.
> **Score actuel : 70/100** — Il manque des configurations critiques, quelques pages, et des contenus réels.
> Une fois tout complété : **100% prêt pour la mise en ligne.**

---

## 📋 COMMENT UTILISER CE DOCUMENT

Ce document est divisé en **2 grandes parties** :

- **PARTIE A** — Ce que **toi** dois me fournir (textes, images, URLs, clés, etc.)
- **PARTIE B** — Ce que **moi** je vais coder et configurer (pages, corrections, config)

Donne-moi les éléments de la Partie A → Je complète la Partie B → On déploie.

---

---

# PARTIE A — CE QUE TU DOIS ME FOURNIR

---

## 🔴 CRITIQUE — Sans ça, l'application NE PEUT PAS être mise en ligne

---

### A1. Variables d'environnement (Production)

Je dois créer un fichier `.env` de production. Fournis-moi les valeurs suivantes :

```
# BASE DE DONNÉES (PostgreSQL pour la production)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DBNAME"
# Exemple Supabase : postgresql://postgres:motdepasse@db.xxxx.supabase.co:5432/postgres
# Exemple Railway : postgresql://postgres:motdepasse@monorail.proxy.rlwy.net:PORT/railway
# Exemple PlanetScale, Neon, etc. → donne-moi le connection string

# AUTH.JS (IMPORTANT : génère une clé secrète aléatoire)
AUTH_SECRET="une_chaine_aleatoire_de_32_caracteres_minimum"
# Pour générer : openssl rand -base64 32

# URL DE TON SITE EN PRODUCTION
AUTH_URL="https://ton-domaine.com"
NEXTAUTH_URL="https://ton-domaine.com"
```

**Optionnel mais recommandé pour la prod :**
```
# OpenAI (si tu veux activer les fonctionnalités IA)
OPENAI_API_KEY="sk-..."

# Email (pour recevoir les demandes du formulaire de contact)
# Choix : Resend (gratuit 100 emails/jour) OU SendGrid OU autre
RESEND_API_KEY="re_..."         # Si tu utilises Resend
# OU
SENDGRID_API_KEY="SG...."      # Si tu utilises SendGrid
EMAIL_TO="ton@email.com"       # Où envoyer les notifications de contact
```

> **Où héberger la base de données ?** Je te recommande **Supabase** (gratuit) ou **Neon** (gratuit).
> Dis-moi ce que tu choisis et je t'accompagne.

---
**reponses**

Merci pour ces précisions sur la production. Voici mes choix pour finaliser NGENI :

Base de données : Je vais utiliser Supabase (PostgreSQL). Pour l'instant, prépare le fichier .env.example et configure schema.prisma pour qu'il soit prêt à accepter une URL PostgreSQL au lieu de SQLite.

Auth Secret : Je te donne l'autorisation de générer toi-même une clé AUTH_SECRET sécurisée et de l'ajouter directement dans mon fichier .env local.

URLs : Pour l'instant, utilise https://ngeni.vercel.ai ou .app  comme placeholder pour AUTH_URL et NEXTAUTH_URL. Je la modifierai quand j'aurai mon domaine final.

Emails & IA : Prépare l'intégration avec Resend pour le formulaire de contact et laisse les variables OPENAI_API_KEY prêtes dans le fichier .env.

Ta mission :

Crée ou mets à jour le fichier .env sur mon ordinateur avec ces placeholders.

Modifie le provider dans prisma/schema.prisma de "sqlite" vers "postgresql".

Assure-toi que le code est prêt pour le déploiement sur Vercel.

Dis-moi quand c'est prêt pour que je puisse aller créer mon compte Supabase et récupérer les vraies clés.


### A2. Favicon & Logo officiel

Le site n'a pas de favicon. Fournis-moi :

- [ ] **`favicon.ico`** — L'icône du site (16×16, 32×32, 48×48)
- [ ] **`favicon.png`** — Version PNG 512×512 (pour PWA et mobile)
- [ ] *(Optionnel)* **`logo.svg`** ou **`logo.png`** — Si tu veux remplacer le logo texte "NGENI" actuel par un vrai logo

> Si tu n'as pas de favicon, dis-le moi et je génère un favicon simple à partir du logo NGENI actuel.

**autres repondes**

j ai cree un dossier images et j'ai mis les logos et favicon labas et je veux que tu utilise les versions svg(Tres inportant dans ce dossier tu vas aussi touver une images d un sreenshot nomer "typographie a utiliser.modele" j'ai besoin que tu utilise cette typographie sur l'ensemble su site et que tu reduise un tout petit peu la taille des textes pour la beaute ultime)
---

### A3. Hébergement — Où déployer ?

Dis-moi où tu veux déployer :

- [ ] **Vercel** *(recommandé pour Next.js — gratuit pour commencer)*
- [ ] **Netlify**
- [ ] **Railway** (fullstack avec DB incluse)
- [ ] **VPS / Serveur dédié** (DigitalOcean, OVH, etc.)
- [ ] Autre : ___________

> Si tu choisis **Vercel** (recommandé), il te faut :
> 1. Un compte Vercel (vercel.com)
> 2. Le repo GitHub connecté au compte Vercel
> 3. Les variables d'environnement à rentrer dans le dashboard Vercel

---

## 🟠 HAUTE PRIORITÉ — Nécessaire pour un site complet et professionnel

---

### A4. Section Portfolio — Projets réels

La section "Nos Réalisations" a actuellement **3 cartes avec des images placeholder** et des **boutons désactivés**.

Pour chaque projet réel que tu veux afficher, fournis-moi :

**Projet 1 :**
- [ ] Titre du projet
- [ ] Client (nom de l'entreprise ou "Client confidentiel")
- [ ] Description courte (1-2 phrases)
- [ ] Service concerné (ex: SaaS, RPA, Web...)
- [ ] Résultat obtenu (ex: "Réduction des délais de 40%")
- [ ] Image ou screenshot (JPG/PNG, min 800×600)
- [ ] Lien vers le projet (URL ou "#" si confidentiel)
- [ ] Année de réalisation

*(Répéter pour chaque projet — minimum 3, idéalement 6)*

> Si tu n'as pas encore de projets à montrer, je peux garder les placeholders avec un message "Premiers projets en cours — Contactez-nous" et activer les boutons.

---

### A5. Équipe — Liens réseaux sociaux réels

Les 6 membres de l'équipe ont leurs profils sociaux qui pointent vers `"#"` (lien vide).

Pour chaque membre, fournis-moi les vraies URLs :

| Membre | LinkedIn | GitHub | Twitter/X | Autre |
|--------|----------|--------|-----------|-------|
| Membre 1 | | | | |
| Membre 2 | | | | |
| Membre 3 | | | | |
| Membre 4 | | | | |
| Membre 5 | | | | |
| Membre 6 | | | | |

> Si un membre n'a pas de profil sur un réseau, laisse vide et je retire l'icône.


**reponses pour cette partie pour le moment je veux que tu complete seulement pour moi ceo et pour mon assistant cofondateur**

menbre1: prenom Christian; nom kakenza CEO & Fondateur
Expert Full-Stack. Deep expertise en Next.js, tRPC, Prisma et architecture cloud.

Membre 2:prenom Jade;nom Mabaso
Ingénieur IA spécialisé en NLP, vision par ordinateur et agents autonomes LLM. co-fondateur

Membre 3:prenom David ;nom Nsapu CTO & Architecte IA
Architecte IA certifiée Google & AWS(....................)a completer


les autres tu peut laisser vide pour le moment
---

### A6. Informations de contact officielles

Ces informations apparaissent dans le footer, la section Contact, et les pages services.
Confirme ou corrige :

- [ ] **Email principal :** `contact@ngeni.ai` ✅ ou remplacer par : ___________
- [ ] **Adresse :** `Kinshasa, RDC` ✅ ou remplacer par : ___________
- [ ] **Horaires :** `Lun — Ven, 08:00 — 18:00` ✅ ou remplacer par : ___________
- [ ] **Téléphone :** (aucun actuellement) → Ajouter : ___________ ou laisser vide
- [ ] **WhatsApp :** (aucun actuellement) → Ajouter : ___________ ou laisser vide

---
**reponses pour ici**

Dans la derniere section la partie ou tu as deja mis ca "Démarrons Ensemble
Partagez votre projet et notre équipe vous contacte sous 24h.

Email

contact@ngeni.ai
Localisation

Kinshasa, République Démocratique du Congo

Horaires

Lun — Ven, 08:00 — 18:00 (CAT)"

je veux que a la place de localisation ou tu as mis Kinshasa,RDC je veuxque tu cree deux nouvelle case une pour lubumbashi rdc et l autre pour pretoria sa je vais completer les detail plus tard(Jai besoin que tu fasse la meme chose sur toutes les section contact par exemple dans le footer)

### A7. Domaine officiel du site

Quel est le domaine que tu vas utiliser ?

- [ ] **ngeni.ai** (domaine idéal si disponible) -----> mon choix
- [ ] **ngeni.cd** (RDC spécifique)
- [ ] **ngeni.tech**
- [ ] Autre : ___________

> Ce domaine est nécessaire pour :
> - Corriger le fichier `robots.txt` (actuellement `localhost:3000`)
> - Configurer les URL Auth.js
> - Générer correctement le sitemap

---

## 🟡 MOYENNE PRIORITÉ — Améliore le site mais peut être fait après le lancement

---

### A8. Page Politique de Confidentialité

Le footer a un lien "Politique de confidentialité" qui pointe vers "/" (la page d'accueil).
Deux options :

- [ ] **Option A** : Tu me fournis le texte de ta politique de confidentialité → Je crée la page
- [ ] **Option B** : Je génère une politique de confidentialité standard pour une agence tech africaine -----> fait ca 
- [ ] **Option C** : Retirer ce lien temporairement jusqu'à ce que tu aies le document

---

### A9. Conditions d'Utilisation (CGU)

Même situation que A8.

- [ ] **Option A** : Tu me fournis le texte → Je crée la page
- [ ] **Option B** : Je génère des CGU standards-----> fait ca
- [ ] **Option C** : Retirer ce lien temporairement

---

### A10. Image de partage réseaux sociaux (OG Image)

Quand quelqu'un partage ton site sur LinkedIn, Facebook, WhatsApp — il y a une image qui apparaît.
Actuellement pas configurée.

- [ ] Fournis une image 1200×630px (JPG/PNG) pour le partage social
- [ ] OU je génère une image simple avec le logo NGENI sur fond sombre

(ignore pour le moment)

---

### A11. Notifications email pour le formulaire Contact

Quand quelqu'un remplit le formulaire de contact, les données vont dans la base de données **mais tu ne reçois pas d'email de notification**.

Pour activer les emails :
- [ ] Crée un compte **Resend** (resend.com — gratuit 100 emails/jour) → Fournis-moi la clé API `RESEND_API_KEY`(---> tu peut configurer ca je te donne l autorisation)
- [ ] Confirme l'email de réception :---->mon email---> christian.kakenza0@gmail.com___________
- [ ] OU dis-moi que tu préfères vérifier manuellement dans le dashboard (pas d'email)

---

---

# PARTIE B — CE QUE MOI JE VAIS CODER

> Ces éléments ne nécessitent rien de ta part — je les complète directement.

---> autre chose que tu peut faire fait le toutes les ameliorations possible

## B1. 🔴 Corrections critiques (je fais sans toi)

| # | Quoi | Fichier | Statut |
|---|------|---------|--------|
| B1.1 | Corriger `robots.txt` avec le vrai domaine | `public/robots.txt` | ⏳ En attente de A7 |
| B1.2 | Sécuriser `next.config.mjs` (domaines images trop ouverts) | `next.config.mjs` | ✅ Prêt à faire |
| B1.3 | Script de build : ajouter `prisma generate` avant `next build` | `package.json` | ✅ Prêt à faire |
| B1.4 | Corriger sitemap : ajouter toutes les pages services | `src/app/sitemap.ts` | ✅ Prêt à faire |

---

## B2. 🟠 Pages manquantes (je crée)

| # | Page | Description | Statut |
|---|------|-------------|--------|
| B2.1 | `/dashboard/profile` | Page profil utilisateur (nom, email, avatar) | ⏳ En attente de rien — je fais dès que tu valides |
| B2.2 | `/privacy` | Politique de confidentialité | ⏳ En attente de A8 |
| B2.3 | `/terms` | Conditions d'utilisation | ⏳ En attente de A9 |

---

## B3. 🟡 Améliorations (je fais)

| # | Quoi | Détail | Statut |
|---|------|--------|--------|
| B3.1 | Email notifications contact | Intégrer Resend pour notifs email | ⏳ En attente de A11 |
| B3.2 | OG Image pour les réseaux sociaux | Image de partage automatique | ⏳ En attente de A10 |
| B3.3 | Favicon | Ajouter l'icône du site | ⏳ En attente de A2 |
| B3.4 | Liens sociaux de l'équipe | Remplacer "#" par vrais profils | ⏳ En attente de A5 |
| B3.5 | Portfolio avec vrais projets | Remplacer placeholders | ⏳ En attente de A4 |

---

## B4. ✅ Déjà complet — Rien à faire

| Composant | État |
|-----------|------|
| Landing page (9 sections) | ✅ Complet |
| Mega-menu desktop "Spécialités" | ✅ Complet |
| Accordion services mobile | ✅ Complet |
| Pages détail services (10/10) | ✅ Complet |
| Système Auth (login/register) | ✅ Complet |
| Dashboard (projets + tâches) | ✅ Complet |
| Formulaire de contact + validation | ✅ Complet |
| tRPC routers (5 routers) | ✅ Complet |
| Internationalisation FR/EN | ✅ Complet |
| Middleware auth + i18n | ✅ Complet |
| Page 404 | ✅ Complet |
| Design responsive mobile/desktop | ✅ Complet |

---

---

# RÉSUMÉ — Ce qu'il te faut absolument

Pour mettre le site en ligne aujourd'hui, le **minimum vital** est :

| Priorité | Élément | Section |
|----------|---------|---------|
| 🔴 Critique | Connection string base de données PostgreSQL | A1 |
| 🔴 Critique | AUTH_SECRET (clé secrète 32 chars) | A1 |
| 🔴 Critique | Domaine du site (ex: ngeni.ai) | A7 |
| 🔴 Critique | Choix hébergeur (Vercel recommandé) | A3 |
| 🟠 Haute | Favicon (ou je génère un simple) | A2 |
| 🟠 Haute | Confirmer email `contact@ngeni.ai` | A6 |

**Les éléments 🟡 Moyens peuvent être complétés APRÈS le lancement** sans bloquer la mise en ligne.

---

## 🗓️ Plan proposé

```
Toi : fournis les éléments critiques (A1, A2, A3, A6, A7)
  ↓
Moi : complète la Partie B + intègre tes assets
  ↓
Test final ensemble (30 min)
  ↓
🚀 DÉPLOIEMENT
```

---

*Document créé le 22/02/2026 — Audit complet de l'application NGENI v2*
