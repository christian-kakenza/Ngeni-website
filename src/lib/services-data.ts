// ============================================================
// Services Data — Bilingual (FR/EN) content for all 10 NGENI services
// Used by the dynamic service detail pages: /[locale]/services/[slug]
// ============================================================

export type ServiceContent = {
  title: string;
  subtitle: string;
  badge: string;
  tag: string;
  hero_description: string;
  overview_title: string;
  overview: string;
  africa_title: string;
  africa: string;
  stats: { value: string; label: string }[];
  features: { title: string; description: string }[];
  tech_stack: string[];
  cta_title: string;
  cta_description: string;
};

export type ServiceDetail = {
  slug: string;
  fr: ServiceContent;
  en: ServiceContent;
};

export const SERVICES: ServiceDetail[] = [
  // ─────────────────────────────────────────────
  // 01 — RPA
  // ─────────────────────────────────────────────
  {
    slug: "rpa",
    fr: {
      title: "Automatisation Intelligente des Processus",
      subtitle: "RPA & IA",
      badge: "Automatisation",
      tag: "Automatisation",
      hero_description:
        "Libérez vos équipes des tâches répétitives grâce à l'automatisation pilotée par l'IA. NGENI conçoit et déploie des agents intelligents qui prennent en charge vos workflows les plus complexes.",
      overview_title: "Qu'est-ce que la RPA augmentée par l'IA ?",
      overview:
        "La RPA (Robotic Process Automation) augmentée par l'IA va bien au-delà de la simple automatisation des clics et des formulaires. Nos agents IA apprennent de vos processus, s'adaptent aux exceptions et prennent des décisions contextuelles en temps réel.\n\nNGENI déploie des robots logiciels capables de traiter des factures, gérer des demandes administratives, répondre à des emails clients et synchroniser des données entre systèmes hétérogènes — le tout sans intervention humaine.",
      africa_title: "Un levier transformationnel pour l'Afrique",
      africa:
        "Dans un contexte où les ressources humaines qualifiées sont encore rares et coûteuses en RDC et en Afrique sub-saharienne, la RPA représente un avantage compétitif immédiat. Les administrations publiques, les banques et les entreprises de télécom peuvent réduire leurs délais de traitement de 80 % et réaffecter leurs équipes à des tâches à forte valeur ajoutée.\n\nNGENI a déjà automatisé des processus pour des entreprises à Kinshasa, permettant d'éliminer jusqu'à 90 % des erreurs humaines sur les rapports financiers mensuels.",
      stats: [
        { value: "80%", label: "Réduction du temps de traitement" },
        { value: "90%", label: "Réduction des erreurs humaines" },
        { value: "24/7", label: "Disponibilité des agents IA" },
        { value: "3×", label: "Productivité des équipes" },
      ],
      features: [
        {
          title: "Agents IA adaptatifs",
          description:
            "Nos agents apprennent de vos exceptions et s'améliorent en continu sans reprogrammation manuelle.",
        },
        {
          title: "Automatisation des workflows financiers",
          description:
            "Traitement automatique des factures, rapprochements bancaires, et génération de rapports comptables.",
        },
        {
          title: "Gestion des demandes administratives",
          description:
            "Traitement des demandes RH, des congés, des approbations et de la documentation interne.",
        },
        {
          title: "Intégration multi-systèmes",
          description:
            "Connexion fluide entre vos ERP, CRM, messageries et bases de données existantes.",
        },
        {
          title: "Monitoring en temps réel",
          description:
            "Tableau de bord de surveillance avec alertes intelligentes sur les anomalies détectées.",
        },
        {
          title: "Audit et traçabilité",
          description:
            "Chaque action des agents est journalisée pour une conformité réglementaire totale.",
        },
      ],
      tech_stack: ["Node.js", "BullMQ", "Redis", "Puppeteer", "Python", "n8n"],
      cta_title: "Prêt à automatiser vos processus ?",
      cta_description:
        "Discutons de vos workflows actuels et identifions ensemble les 3 processus à automatiser en priorité.",
    },
    en: {
      title: "Intelligent Process Automation",
      subtitle: "RPA & AI",
      badge: "Automation",
      tag: "Automation",
      hero_description:
        "Free your teams from repetitive tasks with AI-driven automation. NGENI designs and deploys intelligent agents that handle your most complex workflows.",
      overview_title: "What is AI-augmented RPA?",
      overview:
        "AI-augmented RPA goes far beyond simple click-and-form automation. Our AI agents learn from your processes, adapt to exceptions, and make contextual decisions in real time.\n\nNGENI deploys software robots capable of processing invoices, managing administrative requests, responding to customer emails, and syncing data between heterogeneous systems — all without human intervention.",
      africa_title: "A transformational lever for Africa",
      africa:
        "In a context where skilled human resources are still scarce and costly in DRC and sub-Saharan Africa, RPA represents an immediate competitive advantage. Government agencies, banks, and telecom companies can reduce processing times by 80% and reassign their teams to high-value tasks.\n\nNGENI has already automated processes for companies in Kinshasa, eliminating up to 90% of human errors in monthly financial reports.",
      stats: [
        { value: "80%", label: "Processing time reduction" },
        { value: "90%", label: "Human error reduction" },
        { value: "24/7", label: "AI agent availability" },
        { value: "3×", label: "Team productivity boost" },
      ],
      features: [
        {
          title: "Adaptive AI agents",
          description:
            "Our agents learn from your exceptions and improve continuously without manual reprogramming.",
        },
        {
          title: "Financial workflow automation",
          description:
            "Automatic invoice processing, bank reconciliations, and accounting report generation.",
        },
        {
          title: "Administrative request handling",
          description:
            "Processing of HR requests, leave applications, approvals, and internal documentation.",
        },
        {
          title: "Multi-system integration",
          description:
            "Seamless connection between your existing ERPs, CRMs, messaging systems, and databases.",
        },
        {
          title: "Real-time monitoring",
          description:
            "Monitoring dashboard with intelligent alerts on detected anomalies.",
        },
        {
          title: "Audit & traceability",
          description:
            "Every agent action is logged for full regulatory compliance.",
        },
      ],
      tech_stack: ["Node.js", "BullMQ", "Redis", "Puppeteer", "Python", "n8n"],
      cta_title: "Ready to automate your processes?",
      cta_description:
        "Let's discuss your current workflows and identify the top 3 processes to automate first.",
    },
  },

  // ─────────────────────────────────────────────
  // 02 — Agents IA
  // ─────────────────────────────────────────────
  {
    slug: "agents",
    fr: {
      title: "Création d'Agents IA Personnalisés",
      subtitle: "Chatbots & Assistants",
      badge: "IA Conversationnelle",
      tag: "IA Conversationnelle",
      hero_description:
        "Des assistants virtuels intelligents qui comprennent le contexte, mémorisent les conversations et résolvent les problèmes de vos clients — en français, swahili et lingala.",
      overview_title: "Des agents IA au-delà du chatbot basique",
      overview:
        "Les chatbots traditionnels suivent des scripts rigides. Nos agents IA s'appuient sur des LLM (Large Language Models) de pointe pour comprendre l'intention, maintenir le contexte sur plusieurs échanges et réaliser des actions concrètes : réserver, commander, transmettre.\n\nNGENI conçoit des assistants virtuels intégrés à vos systèmes métier — WhatsApp, votre site web, votre application mobile — avec une personnalité et un ton qui reflètent votre marque.",
      africa_title: "L'IA conversationnelle pour l'Afrique francophone",
      africa:
        "Avec plus de 400 millions de francophones en Afrique, et une pénétration massive de WhatsApp et des smartphones, le chatbot IA représente une révolution pour le service client africain. Les PME congolaises peuvent désormais offrir un support 24h/24 sans augmenter leur masse salariale.\n\nNos agents supportent le français, l'anglais, le swahili et le lingala — une première qui permet d'atteindre toutes les couches de la population.",
      stats: [
        { value: "95%", label: "Satisfaction client moyenne" },
        { value: "<2s", label: "Temps de réponse moyen" },
        { value: "12+", label: "Langues supportées" },
        { value: "60%", label: "Réduction coût support" },
      ],
      features: [
        { title: "Compréhension contextuelle", description: "L'agent retient le contexte de toute la conversation et ne répète jamais les mêmes questions inutilement." },
        { title: "Multi-canal", description: "Un seul agent déployé sur WhatsApp, Messenger, votre site web et votre app mobile simultanément." },
        { title: "Multilingue africain", description: "Support natif du français, swahili, lingala et anglais pour toucher toute la clientèle." },
        { title: "Actions réelles", description: "L'agent peut réserver, commander, payer, ou escalader vers un humain selon le contexte." },
        { title: "Base de connaissance", description: "Alimentez l'agent de vos FAQ, catalogues et documents internes pour des réponses précises." },
        { title: "Analytics & amélioration", description: "Tableau de bord des conversations pour identifier les lacunes et améliorer les réponses en continu." },
      ],
      tech_stack: ["tRPC", "Next.js", "OpenAI API", "LangChain", "Prisma", "Redis"],
      cta_title: "Créez votre assistant IA sur mesure",
      cta_description: "En 2 semaines, nous livrons un chatbot opérationnel sur votre canal principal.",
    },
    en: {
      title: "Custom AI Agent Development",
      subtitle: "Chatbots & Assistants",
      badge: "Conversational AI",
      tag: "Conversational AI",
      hero_description:
        "Intelligent virtual assistants that understand context, remember conversations, and solve your customers' problems — in French, Swahili, and Lingala.",
      overview_title: "AI agents beyond basic chatbots",
      overview:
        "Traditional chatbots follow rigid scripts. Our AI agents leverage cutting-edge LLMs to understand intent, maintain context across multiple exchanges, and take concrete actions: book, order, escalate.\n\nNGENI designs virtual assistants integrated into your business systems — WhatsApp, your website, your mobile app — with a personality and tone that reflects your brand.",
      africa_title: "Conversational AI for Francophone Africa",
      africa:
        "With over 400 million French speakers in Africa and massive WhatsApp and smartphone penetration, AI chatbots represent a revolution for African customer service. Congolese SMEs can now offer 24/7 support without increasing payroll.\n\nOur agents support French, English, Swahili, and Lingala — a first that enables reaching all segments of the population.",
      stats: [
        { value: "95%", label: "Average customer satisfaction" },
        { value: "<2s", label: "Average response time" },
        { value: "12+", label: "Supported languages" },
        { value: "60%", label: "Support cost reduction" },
      ],
      features: [
        { title: "Contextual understanding", description: "The agent retains the full conversation context and never repeats unnecessary questions." },
        { title: "Multi-channel", description: "One agent deployed on WhatsApp, Messenger, your website, and mobile app simultaneously." },
        { title: "African multilingual", description: "Native support for French, Swahili, Lingala, and English to reach all customers." },
        { title: "Real actions", description: "The agent can book, order, pay, or escalate to a human based on context." },
        { title: "Knowledge base", description: "Feed the agent your FAQs, catalogs, and internal documents for precise answers." },
        { title: "Analytics & improvement", description: "Conversation dashboard to identify gaps and continuously improve responses." },
      ],
      tech_stack: ["tRPC", "Next.js", "OpenAI API", "LangChain", "Prisma", "Redis"],
      cta_title: "Build your custom AI assistant",
      cta_description: "In 2 weeks, we deliver an operational chatbot on your main channel.",
    },
  },

  // ─────────────────────────────────────────────
  // 03 — SaaS
  // ─────────────────────────────────────────────
  {
    slug: "saas",
    fr: {
      title: "SaaS sur Mesure",
      subtitle: "Plateformes Évolutives",
      badge: "Développement SaaS",
      tag: "SaaS",
      hero_description:
        "Des plateformes cloud robustes, scalables et sécurisées construites pour durer. De la gestion scolaire à la télémédecine, NGENI livre des SaaS africains de niveau mondial.",
      overview_title: "Le SaaS : moteur de la transformation digitale africaine",
      overview:
        "Un SaaS (Software as a Service) est une application web accessible depuis n'importe quel navigateur, sans installation. Les utilisateurs s'abonnent et accèdent à leurs données en temps réel, depuis Kinshasa, Lubumbashi ou Goma.\n\nNGENI maîtrise l'ensemble de la chaîne : conception UX/UI, développement backend robuste, intégration de paiements (Mobile Money, Stripe), déploiement sur cloud AWS/Vercel, et maintenance continue.",
      africa_title: "Des SaaS pensés pour les réalités africaines",
      africa:
        "Le continent africain a besoin de SaaS conçus pour ses contraintes : connexions internet instables, paiements Mobile Money (M-Pesa, Airtel Money, Orange Money), interfaces multilingues et support offline.\n\nNGENI a développé plusieurs plateformes SaaS en RDC : système de gestion scolaire, plateforme de microfinance, et logiciel de gestion hospitalière. Ces outils remplacent les feuilles Excel et les cahiers papier par des solutions numériques fiables.",
      stats: [
        { value: "99.9%", label: "Disponibilité garantie" },
        { value: "2 sem.", label: "MVP livré en 2 semaines" },
        { value: "10×", label: "Scalabilité du système" },
        { value: "100%", label: "Données sécurisées" },
      ],
      features: [
        { title: "Architecture multi-tenant", description: "Un seul déploiement pour des centaines de clients isolés — sécurité et performances optimales." },
        { title: "Paiements africains intégrés", description: "Mobile Money (M-Pesa, Airtel Money), Orange Money, et cartes bancaires via Stripe." },
        { title: "Offline-first", description: "L'application fonctionne même sans connexion internet et se synchronise dès que le réseau revient." },
        { title: "Tableau de bord analytique", description: "KPIs en temps réel, rapports exportables et graphiques interactifs pour vos décideurs." },
        { title: "Contrôle d'accès granulaire", description: "Gestion fine des rôles : administrateur, manager, opérateur, client — avec permissions personnalisables." },
        { title: "API REST & Webhooks", description: "Intégration facile avec vos outils tiers via une API documentée et des webhooks configurables." },
      ],
      tech_stack: ["Next.js 14", "Prisma", "PostgreSQL", "Stripe", "tRPC", "Tailwind CSS", "Vercel"],
      cta_title: "Votre SaaS africain commence ici",
      cta_description: "Un MVP fonctionnel en 2 semaines, une plateforme scalable pour les 10 prochaines années.",
    },
    en: {
      title: "Custom SaaS Development",
      subtitle: "Scalable Platforms",
      badge: "SaaS Development",
      tag: "SaaS",
      hero_description:
        "Robust, scalable, and secure cloud platforms built to last. From school management to telemedicine, NGENI delivers world-class African SaaS.",
      overview_title: "SaaS: the engine of African digital transformation",
      overview:
        "A SaaS (Software as a Service) is a web application accessible from any browser, without installation. Users subscribe and access their data in real time, from Kinshasa, Lubumbashi, or Goma.\n\nNGENI masters the entire chain: UX/UI design, robust backend development, payment integration (Mobile Money, Stripe), deployment on AWS/Vercel cloud, and ongoing maintenance.",
      africa_title: "SaaS designed for African realities",
      africa:
        "The African continent needs SaaS built for its constraints: unstable internet connections, Mobile Money payments (M-Pesa, Airtel Money, Orange Money), multilingual interfaces, and offline support.\n\nNGENI has developed several SaaS platforms in DRC: school management system, microfinance platform, and hospital management software. These tools replace Excel spreadsheets and paper notebooks with reliable digital solutions.",
      stats: [
        { value: "99.9%", label: "Uptime guaranteed" },
        { value: "2 wks", label: "MVP delivered in 2 weeks" },
        { value: "10×", label: "System scalability" },
        { value: "100%", label: "Secure data" },
      ],
      features: [
        { title: "Multi-tenant architecture", description: "One deployment for hundreds of isolated clients — optimal security and performance." },
        { title: "Integrated African payments", description: "Mobile Money (M-Pesa, Airtel Money), Orange Money, and bank cards via Stripe." },
        { title: "Offline-first", description: "The app works even without internet and syncs as soon as the network returns." },
        { title: "Analytics dashboard", description: "Real-time KPIs, exportable reports, and interactive charts for your decision-makers." },
        { title: "Granular access control", description: "Fine-grained role management: admin, manager, operator, client — with customizable permissions." },
        { title: "REST API & Webhooks", description: "Easy integration with third-party tools via a documented API and configurable webhooks." },
      ],
      tech_stack: ["Next.js 14", "Prisma", "PostgreSQL", "Stripe", "tRPC", "Tailwind CSS", "Vercel"],
      cta_title: "Your African SaaS starts here",
      cta_description: "A functional MVP in 2 weeks, a scalable platform for the next 10 years.",
    },
  },

  // ─────────────────────────────────────────────
  // 04 — Web
  // ─────────────────────────────────────────────
  {
    slug: "web",
    fr: {
      title: "Développement de Sites Web Professionnels",
      subtitle: "Web & Digital",
      badge: "Web Design",
      tag: "Web Design",
      hero_description:
        "Des sites web ultra-performants, beaux et convertissants. NGENI crée votre vitrine digitale avec les technologies les plus modernes pour dominer les résultats de recherche en Afrique.",
      overview_title: "Votre présence digitale, votre premier vendeur",
      overview:
        "Un site web professionnel n'est plus optionnel en Afrique — c'est la première impression que vos clients, partenaires et investisseurs ont de votre entreprise. NGENI construit des sites web qui combinent design premium, performances techniques irréprochables et optimisation SEO.\n\nNos sites sont développés avec Next.js 14 (le framework React le plus avancé), garantissant des temps de chargement inférieurs à 1 seconde et un score Google PageSpeed supérieur à 95/100.",
      africa_title: "La révolution digitale africaine commence par votre site",
      africa:
        "En RDC, plus de 25 millions d'internautes utilisent Internet via smartphone. Un site non optimisé pour mobile est invisible pour 90 % de votre marché potentiel. NGENI conçoit des sites mobile-first, légers et rapides même sur des connexions 3G.\n\nNos clients à Kinshasa ont vu leur trafic organique multiplié par 5 en 6 mois grâce à notre approche SEO localisée — intégrant des recherches en français, lingala et swahili.",
      stats: [
        { value: "<1s", label: "Temps de chargement" },
        { value: "95+", label: "Score Google PageSpeed" },
        { value: "5×", label: "Trafic organique moyen" },
        { value: "100%", label: "Responsive & Mobile-first" },
      ],
      features: [
        { title: "Design premium sur mesure", description: "Chaque site est unique — pas de templates génériques. Votre identité visuelle, vos couleurs, votre ton." },
        { title: "SEO local africain", description: "Optimisation pour les recherches en français, anglais, swahili et lingala sur Google Afrique." },
        { title: "Performance extrême", description: "Next.js Server-Side Rendering, images optimisées, et CDN global pour des chargements quasi-instantanés." },
        { title: "CMS sans code", description: "Gérez vous-même vos contenus, actualités et produits via une interface intuitive — sans coder." },
        { title: "Formulaires & CRM intégrés", description: "Captez vos leads directement depuis le site et synchronisez-les avec votre CRM." },
        { title: "Sécurité SSL & RGPD", description: "Certificats SSL, politique de confidentialité et conformité aux réglementations de protection des données." },
      ],
      tech_stack: ["Next.js 14", "Tailwind CSS", "TypeScript", "Sanity CMS", "Vercel", "Cloudinary"],
      cta_title: "Votre site professionnel en 3 semaines",
      cta_description: "Design, développement, SEO et lancement — tout inclus. Aucune surprise sur la facture.",
    },
    en: {
      title: "Professional Website Development",
      subtitle: "Web & Digital",
      badge: "Web Design",
      tag: "Web Design",
      hero_description:
        "Ultra-performant, beautiful, and converting websites. NGENI creates your digital showcase with the most modern technologies to dominate search results in Africa.",
      overview_title: "Your digital presence, your first salesperson",
      overview:
        "A professional website is no longer optional in Africa — it's the first impression your customers, partners, and investors have of your business. NGENI builds websites that combine premium design, impeccable technical performance, and SEO optimization.\n\nOur sites are developed with Next.js 14 (the most advanced React framework), guaranteeing load times under 1 second and a Google PageSpeed score above 95/100.",
      africa_title: "The African digital revolution starts with your website",
      africa:
        "In DRC, over 25 million internet users access the web via smartphone. A non-mobile-optimized site is invisible to 90% of your potential market. NGENI designs mobile-first, lightweight, and fast websites even on 3G connections.\n\nOur clients in Kinshasa saw their organic traffic multiplied by 5 in 6 months thanks to our localized SEO approach — integrating searches in French, Lingala, and Swahili.",
      stats: [
        { value: "<1s", label: "Load time" },
        { value: "95+", label: "Google PageSpeed score" },
        { value: "5×", label: "Average organic traffic" },
        { value: "100%", label: "Responsive & Mobile-first" },
      ],
      features: [
        { title: "Custom premium design", description: "Every site is unique — no generic templates. Your visual identity, your colors, your tone." },
        { title: "Local African SEO", description: "Optimization for searches in French, English, Swahili, and Lingala on Google Africa." },
        { title: "Extreme performance", description: "Next.js Server-Side Rendering, optimized images, and global CDN for near-instant loading." },
        { title: "No-code CMS", description: "Manage your own content, news, and products through an intuitive interface — no coding required." },
        { title: "Forms & integrated CRM", description: "Capture your leads directly from the site and sync them with your CRM." },
        { title: "SSL & GDPR security", description: "SSL certificates, privacy policy, and compliance with data protection regulations." },
      ],
      tech_stack: ["Next.js 14", "Tailwind CSS", "TypeScript", "Sanity CMS", "Vercel", "Cloudinary"],
      cta_title: "Your professional site in 3 weeks",
      cta_description: "Design, development, SEO, and launch — all included. No surprises on the invoice.",
    },
  },

  // ─────────────────────────────────────────────
  // 05 — Medical
  // ─────────────────────────────────────────────
  {
    slug: "medical",
    fr: {
      title: "Solutions IA pour le Secteur Médical",
      subtitle: "HealthTech & IA",
      badge: "HealthTech",
      tag: "HealthTech",
      hero_description:
        "Transformer la santé en Afrique grâce à l'intelligence artificielle. NGENI développe des outils de détection précoce, de gestion hospitalière et de télémédecine adaptés aux réalités du terrain.",
      overview_title: "L'IA au service de la santé africaine",
      overview:
        "La RDC fait face à un déficit criant de médecins (moins d'1 pour 10 000 habitants) et à une concentration des spécialistes dans les grandes villes. L'IA médicale de NGENI permet de démocratiser l'accès aux diagnostics spécialisés dans les zones rurales grâce à des outils d'aide à la décision clinique.\n\nNos solutions analysent des images médicales (radiographies, échographies), détectent des anomalies et assistent les infirmiers et médecins généralistes à poser des diagnostics plus précis — même sans spécialiste sur place.",
      africa_title: "Un impact vital pour la RDC et l'Afrique",
      africa:
        "Le paludisme, la tuberculose et les maladies chroniques représentent encore la majorité des décès évitables en Afrique subsaharienne. La détection précoce par IA peut réduire la mortalité de 30 à 50 % pour ces pathologies.\n\nNGENI développe des outils de diagnostic IA déployables sur des tablettes Android dans des cliniques rurales sans connexion internet stable, permettant d'étendre la couverture de santé à des millions de personnes non desservies.",
      stats: [
        { value: "94%", label: "Précision diagnostique IA" },
        { value: "70%", label: "Réduction délai diagnostic" },
        { value: "10×", label: "Couverture géographique" },
        { value: "30%", label: "Réduction mortalité évitable" },
      ],
      features: [
        { title: "Analyse d'images médicales", description: "Détection automatique d'anomalies sur radiographies, ECG et échographies par deep learning." },
        { title: "Aide à la décision clinique", description: "L'IA suggère des diagnostics différentiels et des protocoles de traitement basés sur les symptômes." },
        { title: "Dossier médical électronique", description: "Centralisation sécurisée de l'historique patient, accessible hors ligne dans les zones rurales." },
        { title: "Télémédecine", description: "Consultations vidéo avec spécialistes de Kinshasa ou de l'étranger pour les patients en brousse." },
        { title: "Pharmacovigilance IA", description: "Détection automatique des interactions médicamenteuses dangereuses avant la délivrance." },
        { title: "Surveillance épidémiologique", description: "Détection précoce des épidémies via l'analyse en temps réel des données de consultations." },
      ],
      tech_stack: ["Python", "TensorFlow", "PyTorch", "Next.js", "Prisma", "FHIR API"],
      cta_title: "Améliorons la santé en Afrique ensemble",
      cta_description: "Que vous soyez clinique, hôpital ou startup HealthTech, NGENI est votre partenaire technologique.",
    },
    en: {
      title: "AI Solutions for the Medical Sector",
      subtitle: "HealthTech & AI",
      badge: "HealthTech",
      tag: "HealthTech",
      hero_description:
        "Transforming healthcare in Africa through artificial intelligence. NGENI develops early detection tools, hospital management systems, and telemedicine solutions adapted to real-world conditions.",
      overview_title: "AI in service of African healthcare",
      overview:
        "DRC faces a critical shortage of doctors (less than 1 per 10,000 inhabitants) and a concentration of specialists in major cities. NGENI's medical AI democratizes access to specialized diagnostics in rural areas through clinical decision support tools.\n\nOur solutions analyze medical images (X-rays, ultrasounds), detect anomalies, and assist nurses and general practitioners in making more accurate diagnoses — even without a specialist on site.",
      africa_title: "A vital impact for DRC and Africa",
      africa:
        "Malaria, tuberculosis, and chronic diseases still account for the majority of preventable deaths in sub-Saharan Africa. Early AI detection can reduce mortality by 30-50% for these conditions.\n\nNGENI develops AI diagnostic tools deployable on Android tablets in rural clinics without stable internet, enabling healthcare coverage to reach millions of underserved people.",
      stats: [
        { value: "94%", label: "AI diagnostic accuracy" },
        { value: "70%", label: "Diagnostic delay reduction" },
        { value: "10×", label: "Geographic coverage" },
        { value: "30%", label: "Preventable mortality reduction" },
      ],
      features: [
        { title: "Medical image analysis", description: "Automatic anomaly detection on X-rays, ECGs, and ultrasounds via deep learning." },
        { title: "Clinical decision support", description: "AI suggests differential diagnoses and treatment protocols based on symptoms." },
        { title: "Electronic medical record", description: "Secure centralization of patient history, accessible offline in rural areas." },
        { title: "Telemedicine", description: "Video consultations with specialists in Kinshasa or abroad for remote patients." },
        { title: "AI pharmacovigilance", description: "Automatic detection of dangerous drug interactions before dispensing." },
        { title: "Epidemiological surveillance", description: "Early epidemic detection through real-time analysis of consultation data." },
      ],
      tech_stack: ["Python", "TensorFlow", "PyTorch", "Next.js", "Prisma", "FHIR API"],
      cta_title: "Let's improve healthcare in Africa together",
      cta_description: "Whether you're a clinic, hospital, or HealthTech startup, NGENI is your technology partner.",
    },
  },

  // ─────────────────────────────────────────────
  // 06 — Agriculture
  // ─────────────────────────────────────────────
  {
    slug: "agriculture",
    fr: {
      title: "IA & Automatisation pour l'Agriculture",
      subtitle: "AgriTech & IA",
      badge: "AgriTech",
      tag: "AgriTech",
      hero_description:
        "Nourrir l'Afrique grâce à l'intelligence artificielle. NGENI équipe les agriculteurs congolais d'outils de détection de maladies, d'optimisation des rendements et de gestion logistique.",
      overview_title: "L'agriculture africaine à l'ère de l'IA",
      overview:
        "L'agriculture emploie plus de 60 % de la population active en RDC et représente le socle de la sécurité alimentaire. Pourtant, les pertes de récoltes atteignent 30 à 40 % faute d'outils de diagnostic et de gestion modernes.\n\nNGENI déploie des solutions IA accessibles via smartphone : analyse photographique des cultures pour détecter maladies et carences, prévisions météorologiques localisées, et recommandations de fertilisation optimisée.",
      africa_title: "Sécurité alimentaire : un enjeu de développement",
      africa:
        "La RDC dispose de 80 millions d'hectares de terres arables — l'une des plus grandes réserves agricoles au monde — mais seulement 10 % sont exploitées. L'IA peut multiplier la productivité des terres exploitées par 3 à 5, transformant la RDC en grenier de l'Afrique centrale.\n\nNos outils AgriTech ont permis à des coopératives agricoles de Bandundu et du Bas-Congo d'augmenter leurs rendements de maïs de 45 % en une saison grâce à la détection précoce du striga et des carences en azote.",
      stats: [
        { value: "45%", label: "Augmentation des rendements" },
        { value: "35%", label: "Réduction des pertes post-récolte" },
        { value: "90%", label: "Précision détection maladies" },
        { value: "3×", label: "Revenus agriculteurs" },
      ],
      features: [
        { title: "Diagnostic phytosanitaire IA", description: "Photographiez votre culture avec un smartphone — l'IA identifie la maladie et recommande le traitement." },
        { title: "Prévisions météo localisées", description: "Alertes climatiques hyper-locales pour anticiper sécheresses, inondations et périodes optimales de plantation." },
        { title: "Optimisation de la fertilisation", description: "Recommandations d'engrais personnalisées basées sur l'analyse des sols et l'historique des cultures." },
        { title: "Traçabilité de la chaîne agricole", description: "Suivi du champ à la table : qualité, transport, stockage et certification pour l'export." },
        { title: "Marché en ligne agricole", description: "Plateforme mettant en relation agriculteurs et acheteurs pour éliminer les intermédiaires." },
        { title: "IoT & capteurs de terrain", description: "Capteurs d'humidité, de température et de pH du sol pour une agriculture de précision." },
      ],
      tech_stack: ["Python", "Computer Vision", "TensorFlow", "IoT", "Next.js", "Prisma"],
      cta_title: "Modernisons l'agriculture congolaise",
      cta_description: "Pour les coopératives, agronomes et institutions agricoles — contactez NGENI.",
    },
    en: {
      title: "AI & Automation for Agriculture",
      subtitle: "AgriTech & AI",
      badge: "AgriTech",
      tag: "AgriTech",
      hero_description:
        "Feeding Africa through artificial intelligence. NGENI equips Congolese farmers with disease detection tools, yield optimization, and logistics management.",
      overview_title: "African agriculture in the AI era",
      overview:
        "Agriculture employs over 60% of the active population in DRC and represents the foundation of food security. Yet crop losses reach 30-40% due to lack of modern diagnostic and management tools.\n\nNGENI deploys AI solutions accessible via smartphone: photographic crop analysis to detect diseases and deficiencies, localized weather forecasts, and optimized fertilization recommendations.",
      africa_title: "Food security: a development challenge",
      africa:
        "DRC has 80 million hectares of arable land — one of the world's largest agricultural reserves — but only 10% is exploited. AI can multiply the productivity of cultivated land by 3-5, transforming DRC into the breadbasket of Central Africa.\n\nOur AgriTech tools have enabled agricultural cooperatives in Bandundu and Bas-Congo to increase their corn yields by 45% in one season through early detection of striga and nitrogen deficiencies.",
      stats: [
        { value: "45%", label: "Yield increase" },
        { value: "35%", label: "Post-harvest loss reduction" },
        { value: "90%", label: "Disease detection accuracy" },
        { value: "3×", label: "Farmer income" },
      ],
      features: [
        { title: "AI phytosanitary diagnosis", description: "Photograph your crop with a smartphone — AI identifies the disease and recommends treatment." },
        { title: "Localized weather forecasts", description: "Hyper-local climate alerts to anticipate droughts, floods, and optimal planting periods." },
        { title: "Fertilization optimization", description: "Personalized fertilizer recommendations based on soil analysis and crop history." },
        { title: "Agricultural chain traceability", description: "Farm-to-table tracking: quality, transport, storage, and certification for export." },
        { title: "Online agricultural marketplace", description: "Platform connecting farmers and buyers to eliminate intermediaries." },
        { title: "IoT & field sensors", description: "Moisture, temperature, and soil pH sensors for precision agriculture." },
      ],
      tech_stack: ["Python", "Computer Vision", "TensorFlow", "IoT", "Next.js", "Prisma"],
      cta_title: "Let's modernize Congolese agriculture",
      cta_description: "For cooperatives, agronomists, and agricultural institutions — contact NGENI.",
    },
  },

  // ─────────────────────────────────────────────
  // 07 — Education
  // ─────────────────────────────────────────────
  {
    slug: "education",
    fr: {
      title: "Solutions IA pour l'Éducation et la Formation",
      subtitle: "EduTech & IA",
      badge: "EduTech",
      tag: "EduTech",
      hero_description:
        "Démocratiser l'accès à une éducation de qualité en Afrique grâce à l'IA. NGENI crée des plateformes éducatives intelligentes pour les universités, écoles et centres de formation.",
      overview_title: "L'EduTech africaine : former la génération suivante",
      overview:
        "L'Afrique compte la population jeune la plus importante au monde — plus de 600 millions de personnes de moins de 25 ans. Leur formation représente le plus grand défi et la plus grande opportunité de développement du continent.\n\nNGENI développe des plateformes EduTech qui utilisent l'IA pour personnaliser l'apprentissage, identifier les élèves en difficulté, automatiser l'évaluation et fournir un tutorat intelligent disponible 24h/24.",
      africa_title: "L'IA pour combler le fossé éducatif africain",
      africa:
        "En RDC, le taux de scolarisation dans le supérieur est inférieur à 5 % et les universités manquent d'enseignants qualifiés. L'EduTech peut multiplier la capacité pédagogique par 10 en permettant à un professeur de toucher des milliers d'étudiants via des cours en ligne assistés par IA.\n\nNGENI a déployé des systèmes de gestion académique dans des universités à Kinshasa, permettant la gestion de 15 000 étudiants avec un personnel administratif réduit de 60 %.",
      stats: [
        { value: "10×", label: "Capacité pédagogique" },
        { value: "60%", label: "Réduction coûts administratifs" },
        { value: "40%", label: "Amélioration résultats étudiants" },
        { value: "15k+", label: "Étudiants gérés par plateforme" },
      ],
      features: [
        { title: "Apprentissage adaptatif", description: "L'IA ajuste le parcours pédagogique de chaque apprenant selon ses progrès et lacunes." },
        { title: "Gestion académique complète", description: "Inscriptions, notes, emplois du temps, examens et diplômes — tout dans une seule plateforme." },
        { title: "Tutorat IA 24/7", description: "Un assistant IA répond aux questions des étudiants à toute heure, en français et en anglais." },
        { title: "Évaluation automatisée", description: "Correction automatique des QCM, analyses de texte et évaluation de code pour les filières techniques." },
        { title: "Cours en ligne (MOOC)", description: "Création et diffusion de cours vidéo avec quizzes interactifs et certification numérique." },
        { title: "Analytics pédagogiques", description: "Identification des étudiants en difficulté avant qu'ils ne décrochent, avec alertes aux enseignants." },
      ],
      tech_stack: ["Next.js", "Prisma", "OpenAI API", "PostgreSQL", "Stripe", "FFmpeg"],
      cta_title: "Transformons l'éducation africaine",
      cta_description: "Pour universités, écoles professionnelles et centres de formation — parlons de votre projet.",
    },
    en: {
      title: "AI Solutions for Education and Training",
      subtitle: "EduTech & AI",
      badge: "EduTech",
      tag: "EduTech",
      hero_description:
        "Democratizing access to quality education in Africa through AI. NGENI creates intelligent educational platforms for universities, schools, and training centers.",
      overview_title: "African EduTech: training the next generation",
      overview:
        "Africa has the world's largest young population — over 600 million people under 25. Their training represents the continent's greatest development challenge and opportunity.\n\nNGENI develops EduTech platforms that use AI to personalize learning, identify struggling students, automate assessment, and provide intelligent tutoring available 24/7.",
      africa_title: "AI to bridge the African education gap",
      africa:
        "In DRC, the higher education enrollment rate is below 5% and universities lack qualified teachers. EduTech can multiply pedagogical capacity by 10 by enabling one teacher to reach thousands of students via AI-assisted online courses.\n\nNGENI has deployed academic management systems in universities in Kinshasa, enabling the management of 15,000 students with a 60% reduction in administrative staff.",
      stats: [
        { value: "10×", label: "Pedagogical capacity" },
        { value: "60%", label: "Administrative cost reduction" },
        { value: "40%", label: "Student outcomes improvement" },
        { value: "15k+", label: "Students managed per platform" },
      ],
      features: [
        { title: "Adaptive learning", description: "AI adjusts each learner's educational path based on their progress and gaps." },
        { title: "Complete academic management", description: "Enrollments, grades, schedules, exams, and diplomas — all in one platform." },
        { title: "AI tutoring 24/7", description: "An AI assistant answers student questions at any hour, in French and English." },
        { title: "Automated assessment", description: "Automatic correction of MCQs, text analysis, and code evaluation for technical programs." },
        { title: "Online courses (MOOC)", description: "Creation and distribution of video courses with interactive quizzes and digital certification." },
        { title: "Educational analytics", description: "Identification of struggling students before they drop out, with teacher alerts." },
      ],
      tech_stack: ["Next.js", "Prisma", "OpenAI API", "PostgreSQL", "Stripe", "FFmpeg"],
      cta_title: "Let's transform African education",
      cta_description: "For universities, vocational schools, and training centers — let's talk about your project.",
    },
  },

  // ─────────────────────────────────────────────
  // 08 — Energy
  // ─────────────────────────────────────────────
  {
    slug: "energy",
    fr: {
      title: "Optimisation Énergétique & Électricité",
      subtitle: "EnergyTech & IA",
      badge: "EnergyTech",
      tag: "EnergyTech",
      hero_description:
        "L'électricité est le nerf de la guerre pour le développement africain. NGENI applique l'IA à la prédiction de consommation, l'optimisation des réseaux et la maintenance prédictive des infrastructures.",
      overview_title: "L'IA au service de l'accès à l'électricité en Afrique",
      overview:
        "Seulement 19 % de la population rurale en RDC a accès à l'électricité. Paradoxalement, le Congo possède le plus grand potentiel hydroélectrique d'Afrique avec le fleuve Congo. L'IA peut aider à optimiser la distribution, réduire les pertes et étendre la couverture électrique.\n\nNGENI développe des systèmes intelligents de gestion des réseaux électriques (smart grids), des solutions de maintenance prédictive pour les générateurs et des tableaux de bord de pilotage énergétique pour les entreprises.",
      africa_title: "Électrifier l'Afrique intelligemment",
      africa:
        "La SNEL (Société Nationale d'Électricité) perd jusqu'à 40 % de l'énergie produite dans les lignes de transmission faute de monitoring. Les outils IA de NGENI permettent de détecter en temps réel les fuites, les fraudes et les défaillances d'équipements.\n\nNos solutions de micro-grids intelligents permettent également aux villages isolés d'optimiser leur production solaire locale et de facturer les consommateurs via Mobile Money — une révolution pour l'électrification rurale.",
      stats: [
        { value: "40%", label: "Réduction des pertes réseau" },
        { value: "65%", label: "Précision prévision consommation" },
        { value: "80%", label: "Réduction pannes évitables" },
        { value: "3×", label: "ROI maintenance prédictive" },
      ],
      features: [
        { title: "Smart grid management", description: "Gestion intelligente de la distribution d'électricité avec équilibrage dynamique de la charge." },
        { title: "Prévision de consommation", description: "Modèles ML qui prédisent la demande énergétique à 24h, 7j et 30j pour optimiser la production." },
        { title: "Maintenance prédictive", description: "Capteurs IoT et IA pour anticiper les pannes de transformateurs et générateurs avant qu'elles surviennent." },
        { title: "Détection de fraude", description: "Identification automatique des branchements illicites et des anomalies de consommation." },
        { title: "Micro-grids solaires", description: "Gestion IA des systèmes d'énergie solaire dans les villages et zones isolées." },
        { title: "Facturation Mobile Money", description: "Système de prépaiement électrique via M-Pesa, Airtel Money pour les zones rurales." },
      ],
      tech_stack: ["IoT", "Machine Learning", "Python", "TensorFlow", "Next.js", "MQTT"],
      cta_title: "Optimisons vos infrastructures énergétiques",
      cta_description: "Pour les opérateurs électriques, industries et collectivités — contactez l'équipe NGENI.",
    },
    en: {
      title: "Energy Optimization & Electricity",
      subtitle: "EnergyTech & AI",
      badge: "EnergyTech",
      tag: "EnergyTech",
      hero_description:
        "Electricity is the lifeline of African development. NGENI applies AI to consumption prediction, network optimization, and predictive maintenance of infrastructure.",
      overview_title: "AI in service of electricity access in Africa",
      overview:
        "Only 19% of the rural population in DRC has access to electricity. Paradoxically, Congo has Africa's largest hydroelectric potential with the Congo River. AI can help optimize distribution, reduce losses, and extend electrical coverage.\n\nNGENI develops intelligent power grid management systems (smart grids), predictive maintenance solutions for generators, and energy management dashboards for businesses.",
      africa_title: "Electrifying Africa intelligently",
      africa:
        "SNEL (National Electricity Company) loses up to 40% of produced energy in transmission lines due to lack of monitoring. NGENI's AI tools enable real-time detection of leaks, fraud, and equipment failures.\n\nOur smart micro-grid solutions also allow isolated villages to optimize their local solar production and bill consumers via Mobile Money — a revolution for rural electrification.",
      stats: [
        { value: "40%", label: "Network loss reduction" },
        { value: "65%", label: "Consumption forecast accuracy" },
        { value: "80%", label: "Preventable outage reduction" },
        { value: "3×", label: "Predictive maintenance ROI" },
      ],
      features: [
        { title: "Smart grid management", description: "Intelligent electricity distribution management with dynamic load balancing." },
        { title: "Consumption forecasting", description: "ML models predicting energy demand at 24h, 7d, and 30d to optimize production." },
        { title: "Predictive maintenance", description: "IoT sensors and AI to anticipate transformer and generator failures before they occur." },
        { title: "Fraud detection", description: "Automatic identification of illegal connections and consumption anomalies." },
        { title: "Solar micro-grids", description: "AI management of solar energy systems in villages and isolated areas." },
        { title: "Mobile Money billing", description: "Electric prepayment system via M-Pesa, Airtel Money for rural areas." },
      ],
      tech_stack: ["IoT", "Machine Learning", "Python", "TensorFlow", "Next.js", "MQTT"],
      cta_title: "Let's optimize your energy infrastructure",
      cta_description: "For electricity operators, industries, and local authorities — contact the NGENI team.",
    },
  },

  // ─────────────────────────────────────────────
  // 09 — Construction
  // ─────────────────────────────────────────────
  {
    slug: "construction",
    fr: {
      title: "Construction et Smart Building",
      subtitle: "PropTech & IA",
      badge: "PropTech",
      tag: "PropTech",
      hero_description:
        "Construire plus vite, mieux et moins cher grâce à l'IA. NGENI digitalise la planification de chantiers, la gestion des stocks et le monitoring des bâtiments intelligents en Afrique.",
      overview_title: "La construction africaine entre dans l'ère numérique",
      overview:
        "Le secteur de la construction en RDC connaît une croissance de 8 % par an, portée par les infrastructures, l'immobilier résidentiel et les projets miniers. Pourtant, 70 % des projets accusent des retards et des dépassements de budget faute d'outils de gestion modernes.\n\nNGENI déploie des plateformes de gestion de projets BTP augmentées par IA : planification automatisée, suivi en temps réel des livraisons de matériaux, détection des risques de retard et monitoring des chantiers via drones et caméras connectées.",
      africa_title: "Le numérique comme accélérateur de l'urbanisation africaine",
      africa:
        "Kinshasa est l'une des villes à la croissance la plus rapide au monde avec 15 millions d'habitants et une demande immobilière explosive. Les promoteurs, entreprises de BTP et architectes congolais ont besoin d'outils numériques pour gérer cette complexité.\n\nNGENI a accompagné des promoteurs immobiliers à Kinshasa dans la digitalisation de leur gestion de chantier, réduisant les délais de livraison de 30 % et les coûts de 20 % grâce à l'optimisation IA des approvisionnements.",
      stats: [
        { value: "30%", label: "Réduction délais livraison" },
        { value: "20%", label: "Économies sur les coûts" },
        { value: "85%", label: "Précision planification IA" },
        { value: "2×", label: "Rentabilité chantiers" },
      ],
      features: [
        { title: "Gestion de projet BTP", description: "Planification intelligente des tâches, ressources humaines et équipements avec Gantt augmenté par IA." },
        { title: "Suivi des approvisionnements", description: "Commande automatique des matériaux et tracking en temps réel des livraisons sur chantier." },
        { title: "Monitoring par drones", description: "Surveillance aérienne des chantiers avec rapports d'avancement automatiques et détection d'anomalies." },
        { title: "Digital Twin", description: "Jumeau numérique du bâtiment pour simuler, optimiser et maintenir les infrastructures." },
        { title: "Smart Building IoT", description: "Capteurs connectés pour la gestion intelligente de l'énergie, la sécurité et l'accès dans les bâtiments." },
        { title: "Devis et facturation IA", description: "Génération automatique de devis précis et facturation progressive basée sur l'avancement réel." },
      ],
      tech_stack: ["IoT", "Digital Twin", "Next.js", "Prisma", "Computer Vision", "Drone API"],
      cta_title: "Digitalisez vos chantiers avec NGENI",
      cta_description: "Pour les entreprises BTP, promoteurs et architectes — parlons de votre prochain projet.",
    },
    en: {
      title: "Construction and Smart Building",
      subtitle: "PropTech & AI",
      badge: "PropTech",
      tag: "PropTech",
      hero_description:
        "Build faster, better, and cheaper with AI. NGENI digitalizes construction site planning, inventory management, and smart building monitoring in Africa.",
      overview_title: "African construction enters the digital era",
      overview:
        "The construction sector in DRC is growing at 8% per year, driven by infrastructure, residential real estate, and mining projects. Yet 70% of projects face delays and budget overruns due to lack of modern management tools.\n\nNGENI deploys AI-augmented construction management platforms: automated planning, real-time material delivery tracking, delay risk detection, and site monitoring via drones and connected cameras.",
      africa_title: "Digital as an accelerator of African urbanization",
      africa:
        "Kinshasa is one of the world's fastest-growing cities with 15 million inhabitants and explosive real estate demand. Congolese developers, construction companies, and architects need digital tools to manage this complexity.\n\nNGENI has supported real estate developers in Kinshasa in digitalizing their site management, reducing delivery times by 30% and costs by 20% through AI optimization of procurement.",
      stats: [
        { value: "30%", label: "Delivery time reduction" },
        { value: "20%", label: "Cost savings" },
        { value: "85%", label: "AI planning accuracy" },
        { value: "2×", label: "Site profitability" },
      ],
      features: [
        { title: "Construction project management", description: "Intelligent planning of tasks, human resources, and equipment with AI-augmented Gantt." },
        { title: "Supply chain tracking", description: "Automatic material ordering and real-time delivery tracking on site." },
        { title: "Drone monitoring", description: "Aerial site surveillance with automatic progress reports and anomaly detection." },
        { title: "Digital Twin", description: "Digital twin of the building to simulate, optimize, and maintain infrastructure." },
        { title: "Smart Building IoT", description: "Connected sensors for intelligent energy management, security, and access in buildings." },
        { title: "AI quotes and invoicing", description: "Automatic generation of accurate quotes and progressive invoicing based on actual progress." },
      ],
      tech_stack: ["IoT", "Digital Twin", "Next.js", "Prisma", "Computer Vision", "Drone API"],
      cta_title: "Digitalize your construction sites with NGENI",
      cta_description: "For construction companies, developers, and architects — let's talk about your next project.",
    },
  },

  // ─────────────────────────────────────────────
  // 10 — Consulting
  // ─────────────────────────────────────────────
  {
    slug: "consulting",
    fr: {
      title: "Conseil et Formation IA pour Entreprises",
      subtitle: "Conseil & Formation",
      badge: "Consulting",
      tag: "Consulting",
      hero_description:
        "L'IA n'est utile que si vos équipes savent l'utiliser. NGENI forme vos collaborateurs, accompagne votre transformation digitale et déploie des prototypes IA en un temps record.",
      overview_title: "La transformation digitale : un voyage, pas une destination",
      overview:
        "Beaucoup d'entreprises africaines savent qu'elles doivent adopter l'IA mais ne savent pas par où commencer. NGENI joue le rôle de partenaire stratégique : nous évaluons votre maturité digitale, définissons une feuille de route sur mesure et accompagnons chaque étape de la transformation.\n\nNotre approche combine formation pratique des équipes, développement de prototypes fonctionnels et coaching des dirigeants sur les enjeux stratégiques de l'IA.",
      africa_title: "Former les talents africains de l'IA",
      africa:
        "L'Afrique manque cruellement de talents en IA — moins de 0,1 % des chercheurs en IA mondiaux sont africains. NGENI s'engage à changer cela en formant la prochaine génération d'ingénieurs IA congolais.\n\nNos programmes de formation ont déjà formé plus de 200 professionnels à Kinshasa sur des compétences en Python, Machine Learning, automatisation et développement web — des compétences directement applicables dans leurs entreprises.",
      stats: [
        { value: "200+", label: "Professionnels formés" },
        { value: "6 sem.", label: "Du diagnostic au prototype" },
        { value: "95%", label: "Satisfaction formation" },
        { value: "10+", label: "Secteurs accompagnés" },
      ],
      features: [
        { title: "Audit de maturité digitale", description: "Évaluation de votre niveau de digitalisation actuel et identification des opportunités prioritaires." },
        { title: "Feuille de route IA", description: "Plan d'action sur 12-24 mois avec jalons clairs, budget estimé et ROI attendu par initiative." },
        { title: "Formation des équipes", description: "Sessions de formation pratiques en Python, IA, automatisation et outils no-code pour vos collaborateurs." },
        { title: "Développement de prototypes", description: "Un prototype fonctionnel de votre cas d'usage IA en 4 à 6 semaines pour valider le concept." },
        { title: "Coaching dirigeants", description: "Sessions stratégiques avec la direction sur les enjeux, risques et opportunités de l'IA pour votre secteur." },
        { title: "Support continu", description: "Accompagnement mensuel post-déploiement pour assurer l'adoption et l'amélioration continue." },
      ],
      tech_stack: ["Python", "Next.js", "Node.js", "Prisma", "OpenAI API", "n8n"],
      cta_title: "Démarrons votre transformation IA",
      cta_description: "Un audit gratuit de 2 heures pour identifier vos 3 meilleures opportunités IA — sans engagement.",
    },
    en: {
      title: "AI Consulting and Training for Businesses",
      subtitle: "Consulting & Training",
      badge: "Consulting",
      tag: "Consulting",
      hero_description:
        "AI is only useful if your teams know how to use it. NGENI trains your staff, supports your digital transformation, and deploys AI prototypes in record time.",
      overview_title: "Digital transformation: a journey, not a destination",
      overview:
        "Many African companies know they need to adopt AI but don't know where to start. NGENI acts as a strategic partner: we assess your digital maturity, define a tailored roadmap, and support every step of the transformation.\n\nOur approach combines practical team training, functional prototype development, and executive coaching on the strategic challenges of AI.",
      africa_title: "Training Africa's AI talent",
      africa:
        "Africa severely lacks AI talent — less than 0.1% of global AI researchers are African. NGENI is committed to changing this by training the next generation of Congolese AI engineers.\n\nOur training programs have already trained over 200 professionals in Kinshasa in Python, Machine Learning, automation, and web development — skills directly applicable in their companies.",
      stats: [
        { value: "200+", label: "Professionals trained" },
        { value: "6 wks", label: "From diagnosis to prototype" },
        { value: "95%", label: "Training satisfaction" },
        { value: "10+", label: "Sectors supported" },
      ],
      features: [
        { title: "Digital maturity audit", description: "Assessment of your current digitalization level and identification of priority opportunities." },
        { title: "AI roadmap", description: "12-24 month action plan with clear milestones, estimated budget, and expected ROI per initiative." },
        { title: "Team training", description: "Practical training sessions in Python, AI, automation, and no-code tools for your staff." },
        { title: "Prototype development", description: "A functional prototype of your AI use case in 4-6 weeks to validate the concept." },
        { title: "Executive coaching", description: "Strategic sessions with leadership on the challenges, risks, and opportunities of AI for your sector." },
        { title: "Ongoing support", description: "Monthly post-deployment support to ensure adoption and continuous improvement." },
      ],
      tech_stack: ["Python", "Next.js", "Node.js", "Prisma", "OpenAI API", "n8n"],
      cta_title: "Let's start your AI transformation",
      cta_description: "A free 2-hour audit to identify your top 3 AI opportunities — no commitment required.",
    },
  },
];

// Helper to get a service by slug
export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

// All slugs for generateStaticParams
export const SERVICE_SLUGS = SERVICES.map((s) => s.slug);
