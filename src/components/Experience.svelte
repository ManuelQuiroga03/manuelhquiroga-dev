<script lang="ts">
  import { cvData } from '../data/cv';

  // Svelte 5 rune for properties
  let { selectedTech = $bindable(null) } = $props<{
    selectedTech: string | null;
  }>();

  const { experience } = cvData;

  function selectTech(tech: string) {
    if (selectedTech === tech) {
      selectedTech = null; // Toggle off if clicked again
    } else {
      selectedTech = tech;
    }
  }
</script>

<section id="experiencia" class="py-16 md:py-24 bg-slate-100/40 dark:bg-slate-900/10 border-y border-slate-200/50 dark:border-slate-800/40">
  <div class="max-w-5xl mx-auto px-4 sm:px-6">
    
    <!-- Section Header -->
    <div class="text-center max-w-xl mx-auto mb-16">
      <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
        Trayectoria Profesional
      </h2>
      <div class="h-1 w-12 bg-indigo-600 dark:bg-indigo-500 rounded mx-auto mt-4 mb-3"></div>
      <p class="text-sm text-slate-500 dark:text-slate-400">
        Mi historial de empleo enfocado en desarrollo de software, integraciones empresariales y cumplimiento fiscal.
      </p>
    </div>

    <!-- Timeline Layout -->
    <div class="relative border-l border-slate-200 dark:border-slate-800 ml-4 md:ml-32 space-y-12">
      {#each experience as job, index}
        <article class="relative pl-6 md:pl-8 group">
          
          <!-- Timeline Node Circle -->
          <div class="absolute -left-[5.5px] top-2 h-2.5 w-2.5 rounded-full border border-slate-350 dark:border-slate-700 bg-slate-100 dark:bg-slate-950 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-500 group-hover:border-indigo-600 dark:group-hover:border-indigo-500 group-hover:scale-125 transition-all duration-300"></div>

          <!-- Date Label (Left side on Desktop, Top on Mobile) -->
          <div class="md:absolute md:-left-36 md:top-1 md:w-28 text-left md:text-right font-display text-xs font-bold tracking-wider text-slate-450 dark:text-slate-500 mb-2 md:mb-0">
            {job.period}
          </div>

          <!-- Job Details Card -->
          <div class="p-6 sm:p-8 rounded-2xl card-bg hover:shadow-md hover:border-slate-300/80 dark:hover:border-slate-700/80 transition-all duration-300 reveal">
            
            <!-- Job Header -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 class="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  {job.role}
                </h3>
                <span class="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-1 block">
                  {job.company}
                </span>
              </div>
              <span class="inline-flex text-[11px] font-semibold text-slate-550 dark:text-slate-500 items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-3.5 h-3.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                {job.location}
              </span>
            </div>

            <!-- Responsibilities -->
            <div class="space-y-2 mb-6">
              <h4 class="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                Responsabilidades:
              </h4>
              <ul class="space-y-2 text-sm sm:text-base text-slate-650 dark:text-slate-300 list-none pl-0 font-sans font-light">
                {#each job.description as point}
                  <li class="relative pl-5 leading-relaxed">
                    <span class="absolute left-0 top-2.5 h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                    {point}
                  </li>
                {/each}
              </ul>
            </div>

            <!-- Accomplishments List -->
            {#if job.achievements && job.achievements.length > 0}
              <div class="mb-6 pt-5 border-t border-slate-100 dark:border-slate-800/60">
                <h4 class="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">
                  Logros destacados:
                </h4>
                <ul class="space-y-2 text-sm text-slate-650 dark:text-slate-300 list-none pl-0 font-sans font-light">
                  {#each job.achievements as achievement}
                    <li class="relative pl-5 leading-relaxed">
                      <span class="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                      {achievement}
                    </li>
                  {/each}
                </ul>
              </div>
            {/if}

            <!-- Tech Stack Badges -->
            <div class="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-slate-800/40">
              {#each job.technologies as tech}
                {@const isActive = selectedTech === tech}
                <button
                  onclick={() => selectTech(tech)}
                  class="px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all duration-200 cursor-pointer active:scale-95
                    {isActive 
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm' 
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-650 dark:bg-slate-800 dark:hover:bg-slate-750 dark:border-slate-700 dark:text-slate-300'
                    }"
                >
                  {tech}
                </button>
              {/each}
            </div>

          </div>
        </article>
      {/each}
    </div>
  </div>
</section>
