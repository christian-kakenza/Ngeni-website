<template>
  <div class="min-h-screen bg-[#050505] text-white font-sans selection:bg-blue-500/30">
    
    <header class="border-b border-white/10 py-4 px-6 flex justify-between items-center backdrop-blur-md sticky top-0 z-50">
      <Logo />
      <nav class="hidden md:flex gap-8 text-sm font-medium text-gray-400">
        <a href="#" class="hover:text-blue-500 transition-colors">Services</a>
        <a href="#" class="hover:text-blue-500 transition-colors">Expertise</a>
        <a href="#" class="hover:text-blue-500 transition-colors">Contact</a>
      </nav>
      <div class="flex gap-4">
        <button @click="setLocale('en')" class="text-xs border border-white/20 px-3 py-1 rounded-full hover:bg-white/10 transition">EN</button>
        <button class="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-blue-500 transition shadow-[0_0_15px_rgba(59,130,246,0.5)]">
          Devis
        </button>
      </div>
    </header>

    <section class="max-w-6xl mx-auto px-6 py-24 text-center">
      <div class="inline-block px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs mb-6 tracking-widest uppercase animate-pulse">
        Intelligence Artificielle & Cloud
      </div>
      <h1 class="text-6xl md:text-8xl font-black mb-8 tracking-tighter">
        WHITE<span class="text-blue-500">BOX</span>
      </h1>
      <p class="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
        {{ $t('hero.tagline') }}
      </p>
      
      <div class="mt-20 relative group">
        <div class="absolute inset-0 bg-blue-500/10 blur-[120px] rounded-full group-hover:bg-blue-500/20 transition-all duration-700"></div>
        <div class="relative border border-white/10 bg-white/5 backdrop-blur-sm rounded-2xl p-12 aspect-[21/9] flex items-center justify-center overflow-hidden">
          <p class="text-gray-500 font-mono text-sm tracking-widest">[ SYSTEM_READY_ORCHESTRATION_ACTIVE ]</p>
        </div>
      </div>
    </section>

    <section class="py-24 bg-white/[0.02] border-y border-white/5">
      <div class="max-w-6xl mx-auto px-6">
        <h2 class="text-3xl font-bold mb-16 flex items-center gap-4">
          <span class="w-12 h-[2px] bg-blue-500"></span>
          L'Équipe d'Orchestration
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="member in team" :key="member.name" 
               class="p-8 rounded-2xl border border-white/10 bg-black/40 hover:border-blue-500/50 transition-all group relative">
            <div class="relative z-10">
              <img :src="member.avatar" :alt="member.name" class="w-16 h-16 mb-6 rounded-xl bg-blue-500/10 p-2">
              <h3 class="text-xl font-bold text-white">{{ member.name }}</h3>
              <p class="text-blue-500 text-xs font-mono mb-4 uppercase tracking-widest">{{ member.role }}</p>
              <p class="text-gray-400 text-sm leading-relaxed">{{ member.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
const { setLocale } = useI18n()

const team = [
  {
    name: "Toi (CEO)",
    role: "Architecte Solution",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    desc: "Expert en systèmes critiques et stratégie digitale."
  },
  {
    name: "Astra (IA)",
    role: "Analyse de Données",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Astra",
    desc: "Optimisation des flux et prédictions en temps réel."
  },
  {
    name: "Nexus (IA)",
    role: "Génération de Code",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Nexus",
    desc: "Sécurité et robustesse de l'infrastructure logicielle."
  }
]
</script>