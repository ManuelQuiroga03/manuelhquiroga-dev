<script lang="ts">
  import { cvData } from '../data/cv';

  const { profile } = cvData;
  const currentYear = new Date().getFullYear();
</script>

<footer class="mt-auto py-12 border-t border-slate-200/50 dark:border-slate-800/40 bg-white/40 dark:bg-slate-900/10">
  <div class="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
    
    <!-- Branding -->
    <div class="flex items-center gap-2">
      <div class="h-6 w-6 rounded-md bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center text-white font-display font-extrabold text-[10px] shadow-sm">
        MQ
      </div>
      <span class="font-display font-semibold text-sm text-slate-800 dark:text-slate-200">
        {profile.name}
      </span>
    </div>

    <!-- Copyright -->
    <p class="text-xs text-slate-400 dark:text-slate-500 text-center sm:text-left">
      © {currentYear} {profile.name}. Todos los derechos reservados. Desarrollado con Svelte 5 y Tailwind CSS v4.
    </p>

    <!-- Navigation / Social Links -->
    <div class="flex items-center gap-4 text-xs font-medium">
      <a
        href={profile.github}
        target="_blank"
        rel="noopener noreferrer"
        class="text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors duration-200"
      >
        GitHub
      </a>
      <span class="text-slate-200 dark:text-slate-800">|</span>
      <a
        href={profile.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        class="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
      >
        LinkedIn
      </a>
      <span class="text-slate-200 dark:text-slate-800">|</span>
      <a
        href="#sobre-mi"
        class="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
      >
        Subir ↑
      </a>
    </div>

  </div>
</footer>
