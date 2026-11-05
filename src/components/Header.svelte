<script lang="ts">
  import ThemeToggle from './ThemeToggle.svelte';
  import { cvData } from '../data/cv';

  let { viewMode = $bindable('classic') } = $props<{
    viewMode: 'classic' | 'interactive';
  }>();

  const navLinks = [
    { name: 'Sobre Mí', href: '#sobre-mi' },
    { name: 'Lo que resuelvo', href: '#servicios' },
    { name: 'Proyectos', href: '#proyectos' },
    { name: 'Experiencia', href: '#experiencia' },
    { name: 'Habilidades', href: '#habilidades' }
  ];

  function toggleSwitch() {
    viewMode = 'interactive';
  }
</script>

<header class="sticky top-0 z-40 w-full glass-nav border-b border-slate-200/40 dark:border-slate-800/40">
  <div class="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
    <!-- Logo / Initials + Availability Dot -->
    <a href="#sobre-mi" class="flex items-center gap-2.5 group">
      <div class="h-9 w-9 rounded-lg bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center text-white font-display font-extrabold text-sm shadow-sm group-hover:scale-105 transition-transform duration-200">
        MQ
      </div>
      <div class="flex flex-col">
        <span class="font-display font-bold text-sm sm:text-base tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200 leading-tight">
          {cvData.profile.name}
        </span>
        <span class="flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
          <span class="relative flex h-1.5 w-1.5">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          Disponible
        </span>
      </div>
    </a>

    <!-- Navigation & Action Buttons -->
    <nav class="flex items-center gap-4 sm:gap-6">
      <ul class="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-600 dark:text-slate-300">
        {#each navLinks as link}
          <li>
            <a
              href={link.href}
              class="relative py-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-indigo-600 dark:after:bg-indigo-500 after:scale-x-0 hover:after:scale-x-100 after:origin-right hover:after:origin-left after:transition-transform after:duration-250"
            >
              {link.name}
            </a>
          </li>
        {/each}
      </ul>

      <!-- Vertical Divider (Desktop) -->
      <div class="h-5 w-px bg-slate-200 dark:bg-slate-800 hidden lg:block"></div>

      <!-- Action Buttons -->
      <div class="flex items-center gap-2 sm:gap-3">
        <!-- Interactive Switch Easter Egg / Arcade Button -->
        <button
          onclick={toggleSwitch}
          title="Abrir consola interactiva estilo Nintendo Switch con Tetris"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-300/60 dark:border-slate-700 shadow-sm active:scale-95 transition-all cursor-pointer"
        >
          <span>🕹️</span>
          <span class="hidden sm:inline">Modo Switch</span>
        </button>

        <!-- Direct CV Download Link -->
        <a
          href="/ManuelHernandez_desarrollador_fullstack_net.pdf"
          download="ManuelHernandez_desarrollador_fullstack_net.pdf"
          title="Descargar Currículum Vitae en PDF"
          class="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-500 shadow-sm hover:shadow transition-all duration-200 hover:-translate-y-0.5 cursor-pointer active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3.5 h-3.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          <span class="hidden xs:inline">Descargar CV</span>
        </a>

        <!-- Theme Toggle -->
        <ThemeToggle />
      </div>
    </nav>
  </div>
</header>
