<script lang="ts">
  import ThemeToggle from './ThemeToggle.svelte';
  import { cvData } from '../data/cv';
  import { toast } from '../lib/toast.svelte';

  let { viewMode = $bindable('interactive') } = $props<{
    viewMode: 'classic' | 'interactive';
  }>();

  const navLinks = [
    { name: 'Sobre Mí', href: '#sobre-mi' },
    { name: 'Habilidades', href: '#habilidades' },
    { name: 'Experiencia', href: '#experiencia' },
    { name: 'Proyectos', href: '#proyectos' }
  ];

  function handleEmailClick() {
    navigator.clipboard.writeText(cvData.profile.email);
    toast.trigger("¡Email copiado al portapapeles! Abriendo correo...");
  }
</script>

<header class="sticky top-0 z-40 w-full glass-nav border-b border-slate-200/40 dark:border-slate-800/40">
  <div class="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
    <!-- Logo/Initials -->
    <a href="#sobre-mi" class="flex items-center gap-2.5 group">
      <div class="h-9 w-9 rounded-lg bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center text-white font-display font-extrabold text-sm shadow-sm group-hover:scale-105 transition-transform duration-200">
        MQ
      </div>
      <span class="font-display font-bold text-base tracking-tight text-slate-800 dark:text-slate-100 group-hover:text-indigo-650 dark:group-hover:text-indigo-400 transition-colors duration-200 hidden sm:inline-block">
        {cvData.profile.name}
      </span>
    </a>

    <!-- Navigation & Theme Toggle -->
    <nav class="flex items-center gap-6">
      <ul class="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
        {#each navLinks as link}
          <li>
            <a
              href={link.href}
              class="relative py-1 hover:text-indigo-650 dark:hover:text-indigo-400 transition-colors duration-200 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-indigo-600 dark:after:bg-indigo-500 after:scale-x-0 hover:after:scale-x-100 after:origin-right hover:after:origin-left after:transition-transform after:duration-250"
            >
              {link.name}
            </a>
          </li>
        {/each}
      </ul>

      <!-- Vertical Divider -->
      <div class="h-5 w-px bg-slate-200 dark:bg-slate-800 hidden md:block"></div>

      <!-- Action Button / Theme Toggle -->
      <div class="flex items-center gap-3">
        <a
          href="mailto:{cvData.profile.email}"
          onclick={handleEmailClick}
          class="hidden sm:inline-flex px-3.5 py-2 text-xs font-semibold tracking-wide rounded-lg text-white bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 shadow-sm hover:shadow transition-all duration-200 hover:-translate-y-0.5 cursor-pointer active:scale-95"
        >
          Email
        </a>
        <ThemeToggle />
      </div>
    </nav>
  </div>
</header>
