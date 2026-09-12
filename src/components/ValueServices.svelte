<script lang="ts">
  import { cvData } from '../data/cv';

  const { valueServices } = cvData;
</script>

<section id="servicios" class="py-12 md:py-16 border-t border-slate-200/50 dark:border-slate-800/40">
  <div class="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
    
    <!-- Section Header -->
    <div class="text-center max-w-2xl mx-auto mb-10 reveal">
      <h2 class="text-xs font-extrabold tracking-[0.2em] text-indigo-600 dark:text-indigo-400 uppercase mb-2">
        Soluciones & Valor de Negocio
      </h2>
      <h3 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
        Lo que resuelvo para clientes y empresas
      </h3>
      <div class="h-1 w-12 bg-indigo-600 dark:bg-indigo-500 rounded mx-auto mt-4 mb-3"></div>
      <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-light">
        Transformo requerimientos complejos en software empresarial estable, rápido y fácil de mantener.
      </p>
    </div>

    <!-- 3 Value Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      {#each valueServices as service}
        <div class="card-bg rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:shadow-md hover:border-slate-300/80 dark:hover:border-slate-700/80 transition-all duration-300 group reveal">
          
          <!-- Top Icon & Header -->
          <div class="space-y-4">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-105
              {service.icon === 'backend' 
                ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-600 dark:text-indigo-400' 
                : service.icon === 'database' 
                ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-600 dark:text-cyan-400' 
                : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
              }"
            >
              {#if service.icon === 'backend'}
                <!-- Code / API Server Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                </svg>
              {:else if service.icon === 'database'}
                <!-- Relational DB / Tuning Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                </svg>
              {:else}
                <!-- ERP Integration / Support Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                </svg>
              {/if}
            </div>

            <h4 class="text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {service.title}
            </h4>

            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-350 font-light leading-relaxed">
              {service.description}
            </p>
          </div>

          <!-- Bottom Highlights Tags -->
          <div class="flex flex-wrap gap-1.5 pt-5 border-t border-slate-100 dark:border-slate-800/60 mt-6">
            {#each service.highlights as tag}
              <span class="px-2.5 py-0.5 text-[10px] font-bold rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 select-none">
                {tag}
              </span>
            {/each}
          </div>

        </div>
      {/each}
    </div>

  </div>
</section>
