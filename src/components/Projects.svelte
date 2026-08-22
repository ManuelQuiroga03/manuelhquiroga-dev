<script lang="ts">
  import { cvData } from '../data/cv';
  import { flip } from 'svelte/animate';
  import { fade, scale } from 'svelte/transition';

  // Svelte 5 rune for properties
  let { selectedTech = $bindable(null) } = $props<{
    selectedTech: string | null;
  }>();

  const { projects } = cvData;

  // Extract unique technologies dynamically from all projects
  const allTechs = Array.from(
    new Set(projects.flatMap(p => p.technologies))
  ).sort();

  // Reactive derived list of projects based on the filter
  let filteredProjects = $derived(
    selectedTech
      ? projects.filter(p => p.technologies.includes(selectedTech!))
      : projects
  );

  function selectTech(tech: string) {
    if (selectedTech === tech) {
      selectedTech = null;
    } else {
      selectedTech = tech;
    }
  }

  function clearFilter() {
    selectedTech = null;
  }
</script>

<section id="proyectos" class="py-16 md:py-24">
  <div class="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
    
    <!-- Section Header -->
    <div class="text-center max-w-xl mx-auto mb-12">
      <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
        Proyectos de Software
      </h2>
      <div class="h-1 w-12 bg-indigo-600 dark:bg-indigo-500 rounded mx-auto mt-4 mb-3"></div>
      <p class="text-sm text-slate-500 dark:text-slate-400">
        Una selección de mis proyectos principales y componentes desarrollados. Haz clic en las etiquetas para filtrarlos.
      </p>
    </div>

    <!-- Tech Filter Badges -->
    <div class="flex flex-wrap items-center justify-center gap-2 mb-10">
      <button
        onclick={clearFilter}
        class="px-4 py-1.5 text-xs font-semibold rounded-full border transition-all duration-200 cursor-pointer active:scale-95
          {!selectedTech
            ? 'bg-slate-900 border-slate-900 text-white dark:bg-white dark:border-white dark:text-slate-950'
            : 'bg-white border-slate-200 text-slate-600 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 hover:bg-slate-50'
          }"
      >
        Todos
      </button>

      {#each allTechs as tech}
        {@const isActive = selectedTech === tech}
        <button
          onclick={() => selectTech(tech)}
          class="px-4 py-1.5 text-xs font-semibold rounded-full border transition-all duration-200 cursor-pointer active:scale-95
            {isActive
              ? 'bg-indigo-650 border-indigo-650 text-white shadow-sm'
              : 'bg-white border-slate-200 text-slate-600 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 hover:bg-slate-50'
            }"
        >
          {tech}
        </button>
      {/each}
    </div>

    <!-- Projects Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[350px]">
      {#each filteredProjects as project (project.id)}
        <div
          animate:flip={{ duration: 500 }}
          in:scale={{ duration: 300, start: 0.97, delay: 50 }}
          out:fade={{ duration: 250 }}
          class="h-full"
        >
          <article class="h-full flex flex-col justify-between p-6 sm:p-8 rounded-2xl card-bg hover:shadow-md hover:border-slate-300/80 dark:hover:border-slate-700/80 group reveal">
            
            <!-- Top Window Bar (macOS controls + Links) -->
            <div class="flex items-center justify-between mb-4 pb-2 border-b border-slate-100/50 dark:border-slate-800/40">
              <!-- macOS Window controls -->
              <div class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-full bg-[#ff5f56] dark:bg-[#ef4444]"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] dark:bg-[#f59e0b]"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-[#27c93f] dark:bg-[#10b981]"></span>
              </div>

              <!-- External Links -->
              <div class="flex items-center gap-2">
                {#if project.githubUrl}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Código fuente de {project.title}"
                    class="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <!-- Code Brackets Icon -->
                    <svg class="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
                      <polyline points="16 18 22 12 16 6"/>
                      <polyline points="8 6 2 12 8 18"/>
                    </svg>
                  </a>
                {/if}
                {#if project.liveUrl}
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Demo en vivo de {project.title}"
                    class="p-1.5 rounded-lg text-slate-400 hover:text-indigo-650 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                {/if}
              </div>
            </div>

            <!-- Card Content -->
            <div class="flex-grow flex flex-col justify-between space-y-4">
              <div>
                {#if project.featured}
                  <span class="inline-flex items-center gap-1 text-[9px] font-bold tracking-wider uppercase text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded-md mb-2">
                    ★ Destacado
                  </span>
                {/if}
                <h3 class="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-250 mb-2">
                  {project.title}
                </h3>
                <p class="text-sm sm:text-base text-slate-600 dark:text-slate-350 leading-relaxed font-sans font-light line-clamp-4">
                  {project.description}
                </p>
              </div>

            <!-- Tech Badges -->
            <div class="flex flex-wrap gap-1.5 pt-5 border-t border-slate-100 dark:border-slate-800/60 mt-6">
              {#each project.technologies as tech}
                {@const isBadgeActive = selectedTech === tech}
                <button
                  onclick={() => selectTech(tech)}
                  class="px-2.5 py-0.5 text-xs font-semibold rounded-md transition-all duration-200 cursor-pointer active:scale-95
                    {isBadgeActive
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                    }"
                >
                  {tech}
                </button>
              {/each}
            </div>
            
          </div>
        </article>
        </div>
      {:else}
        <!-- Fallback if empty -->
        <div class="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center py-12 text-slate-400 dark:text-slate-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 mb-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
          <p class="text-sm">No se encontraron proyectos con esta tecnología.</p>
          <button onclick={clearFilter} class="mt-4 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">
            Limpiar Filtro
          </button>
        </div>
      {/each}
    </div>
  </div>
</section>
