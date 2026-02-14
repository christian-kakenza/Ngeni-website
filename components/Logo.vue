<template>
  <div class="flex items-center gap-3 group cursor-pointer">
    <svg viewBox="0 0 100 100" class="w-10 h-10 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">
      <path d="M50 20 L85 40 L50 60 L15 40 Z" stroke="white" stroke-width="2.5" fill="none"/>
      <path d="M15 40 L15 75 L50 95 L50 60" stroke="white" stroke-width="2.5" fill="none"/>
      <path d="M85 40 L85 75 L50 95" stroke="white" stroke-width="2.5" fill="none"/>
      <path d="M50 60 L50 85" stroke="#3B82F6" stroke-width="3" stroke-linecap="round" class="animate-pulse"/>
      <path d="M30 35 L50 47 L70 35" stroke="#3B82F6" stroke-width="2" fill="none" />
      <circle cx="50" cy="47" r="2" fill="#3B82F6" />
    </svg>
    <div class="flex flex-col">
      <span class="text-white font-bold tracking-[0.2em] text-lg leading-none">WHITEBOX</span>
      <span class="text-blue-500 font-medium tracking-[0.3em] text-[0.6rem] leading-none mt-1">ENTERPRISE</span>
    </div>
  </div>
</template>