<script lang="ts">
  import Header from './components/Header.svelte';
  import Hero from './components/Hero.svelte';
  import ValueServices from './components/ValueServices.svelte';
  import TechCarousel from './components/TechCarousel.svelte';
  import Skills from './components/Skills.svelte';
  import Experience from './components/Experience.svelte';
  import Projects from './components/Projects.svelte';
  import Footer from './components/Footer.svelte';
  import ConsoleView from './components/ConsoleView.svelte';
  import IntroBanner from './components/IntroBanner.svelte';
  import { cvData } from './data/cv';
  import { fly, fade } from 'svelte/transition';
  import { toast } from './lib/toast.svelte';

  // Svelte 5 Rune: central reactive state for the technology filter
  let selectedTech = $state<string | null>(null);

  function handleSelectTechFromCarousel(tech: string) {
    selectedTech = tech;
    const projectsEl = document.getElementById('proyectos');
    if (projectsEl) {
      projectsEl.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  // Svelte 5 Rune: viewMode determines whether we show the Switch console or classic scroll view
  let viewMode = $state<'classic' | 'interactive'>('interactive');

  // Shared Joy-con assembly state between console body and footer triggers
  let assemblyState = $state<'detached' | 'snapping' | 'loaded' | 'un-snapping'>('detached');
  let scrollY = $state(0);

  function handleViewClassic() {
    viewMode = 'classic';
  }

  function triggerUnsnapAndScroll() {
    assemblyState = 'un-snapping';
    setTimeout(() => {
      viewMode = 'classic';
    }, 1000);
  }

  // React to viewMode and selectedTech changes to reveal elements gracefully
  $effect(() => {
    if (viewMode === 'classic') {
      // Re-observe if filter changes
      const _tech = selectedTech;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        },
        {
          threshold: 0.05,
          rootMargin: '0px 0px -50px 0px'
        }
      );

      // Wait a tick for Svelte to render elements to DOM
      const timer = setTimeout(() => {
        const elements = document.querySelectorAll('.reveal');
        elements.forEach((el) => observer.observe(el));
      }, 50);

      return () => {
        clearTimeout(timer);
        observer.disconnect();
      };
    }
  });

  function handleEmailClick(e: Event) {
    e.preventDefault();
    navigator.clipboard.writeText(cvData.profile.email);
    toast.trigger("¡Email copiado al portapapeles!");
    setTimeout(() => {
      window.location.href = `mailto:${cvData.profile.email}`;
    }, 400);
  }
</script>

<svelte:window bind:scrollY={scrollY} />

<div class="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-205 transition-colors duration-300">
  
  {#if viewMode === 'interactive'}
    <!-- Nintendo Switch Interactive Console Layer (Overlays the page during crossfade) -->
    <main out:fade={{ duration: 800 }} class="fixed inset-0 z-10 w-full h-full flex flex-col items-center justify-between interactive-bg p-4 overflow-y-auto">
      
      <!-- Top Spacing -->
      <div class="h-2"></div>

      <!-- Center Spacing containing the resized Switch -->
      <div class="flex-grow flex items-center justify-center w-full py-4">
        <ConsoleView bind:assemblyState={assemblyState} onViewClassic={handleViewClassic} />
      </div>

      <!-- Custom Interactive Footer (Only on Console Screen, hidden on mobile for clean fit) -->
      <div class="hidden md:flex w-full max-w-5xl px-4 pb-6 flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-400 select-none border-t border-slate-800/40 pt-4 mt-2">
        <!-- Left Side: Social Icon Buttons -->
        <div class="flex items-center justify-center gap-2">
          <!-- Email Copy/Open -->
          <a
            href="mailto:{cvData.profile.email}"
            onclick={handleEmailClick}
            aria-label="Email"
            class="p-2 rounded-lg bg-slate-800/25 border border-slate-800/50 hover:bg-slate-800/60 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
          </a>

          <!-- LinkedIn Button -->
          <a
            href={cvData.profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            class="p-2 rounded-lg bg-slate-800/25 border border-slate-800/50 hover:bg-slate-800/60 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
          
          <!-- GitHub Button -->
          <a
            href={cvData.profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            class="p-2 rounded-lg bg-slate-800/25 border border-slate-800/50 hover:bg-slate-800/60 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.48 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
          </svg>
          </a>
        </div>

        <!-- Center/Right Side: Pill Status/Link -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
          <!-- Main Gateway Pill -->
          <button 
            onclick={triggerUnsnapAndScroll}
            class="px-4 py-2 rounded-full border border-slate-750 bg-slate-900/60 hover:bg-slate-900 text-slate-350 hover:text-white font-bold flex items-center gap-2 cursor-pointer transition-all active:scale-95 shadow-sm"
          >
            <span class="relative flex h-1.5 w-1.5">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500"></span>
            </span>
            <span>Ver Portafolio Profesional →</span>
            <span class="text-slate-700 text-[10px]">|</span>
            <span class="text-slate-400 text-[9px] font-normal">{cvData.profile.title}</span>
            <span class="text-slate-700 text-[10px]">|</span>
            <span class="text-indigo-400 text-[9px]">v3.0 + stable</span>
          </button>

          <!-- Email Contact Button -->
          <a
            href="mailto:{cvData.profile.email}"
            onclick={handleEmailClick}
            class="px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-855 text-slate-350 hover:text-white border border-slate-800 cursor-pointer active:scale-95 transition-all text-center"
          >
            Contáctame
          </a>
        </div>
      </div>
    </main>
  {:else}
    <!-- Scrollable main CV document layout (Classic View) with Smooth Fade-in -->
    <div in:fade={{ duration: 1000 }} class="flex-grow flex flex-col relative">
      
      <!-- Fixed header that slides/fades down only when scrolling past the IntroBanner -->
      <div class="fixed top-0 left-0 right-0 z-40 transition-all duration-500 transform {scrollY > 250 ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}">
        <Header bind:viewMode />
      </div>

      <main class="flex-grow">
      
      <!-- Welcome Signature Logo & Mascot -->
      <IntroBanner />
      
      <!-- Operator Bio & Contact Cards -->
      <Hero />

      <!-- Value Proposition / What I Solve Services Cards -->
      <ValueServices />

      <!-- Categorized Technologies & Tools Carousel (Clickable Pills -> Filter Projects) -->
      <TechCarousel onSelectTech={handleSelectTechFromCarousel} />

      <!-- Skills categorized grids -->
      <Skills />

      <!-- Projects Portfolio with filter engine -->
      <Projects bind:selectedTech />

      <!-- Interactive Experience Timeline -->
      <Experience bind:selectedTech />
      <section class="py-16 md:py-24 border-t border-slate-200/50 dark:border-slate-800/40">
        <div class="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <!-- Row 1: Education & Languages (Side-by-Side) -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            
            <!-- Education block -->
            <div class="reveal">
              <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-8 flex items-center gap-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-5 h-5 text-indigo-600 dark:text-indigo-400">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.902 59.902 0 0 1 10.399 5.84m-20.798 0 2.658.813m0 0a50.45 50.45 0 0 1 15.483 0m-15.483 0v4.2a9.061 9.061 0 0 0 1.2.625m14.283-4.825v4.2a9.061 9.061 0 0 1-1.2.625M12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 16.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm9 0a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
                </svg>
                Educación
              </h2>
              <div class="space-y-4">
                {#each cvData.education as edu}
                  <div class="p-6 rounded-2xl card-bg border border-slate-200/50 dark:border-slate-800/40 hover:border-slate-350 dark:hover:border-slate-700 transition-all duration-200 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                    <span class="text-xs font-bold text-indigo-600 dark:text-indigo-400 block mb-1">
                      {edu.period}
                    </span>
                    <h3 class="text-base font-extrabold text-slate-800 dark:text-white leading-tight">
                      {edu.degree}
                    </h3>
                    <p class="text-sm text-slate-550 dark:text-slate-400 mt-1 font-light">
                      {edu.institution}
                    </p>
                  </div>
                {/each}
              </div>
            </div>

            <!-- Languages block -->
            <div class="reveal">
              <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-8 flex items-center gap-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-5 h-5 text-indigo-600 dark:text-indigo-400">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A11.952 11.952 0 0 1 12 16.5c-2.998 0-5.74-1.1-7.843-2.918m0 0A8.959 8.959 0 0 1 3 12c0-.778.099-1.533.284-2.253" />
                </svg>
                Idiomas
              </h2>
              <div class="space-y-4">
                {#each cvData.languages as lang}
                  <div class="p-5 rounded-2xl card-bg border border-slate-200/50 dark:border-slate-800/40 hover:border-slate-350 dark:hover:border-slate-700 transition-all duration-200 flex items-center justify-between">
                    <h3 class="text-base font-extrabold text-slate-800 dark:text-white">
                      {lang.language}
                    </h3>
                    <span class="px-2.5 py-1 text-xs font-semibold rounded-md border bg-slate-50 border-slate-250/70 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-350 select-none">
                      {lang.level}
                    </span>
                  </div>
                {/each}
              </div>
            </div>

          </div>

          <!-- Row 2: Courses & Certifications (Full-width 3-column Grid for growth) -->
          <div class="reveal border-t border-slate-200/50 dark:border-slate-800/40 pt-16">
            <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-8 flex items-center gap-2.5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-5 h-5 text-indigo-600 dark:text-indigo-400">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
              Cursos & Certificaciones
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {#each cvData.courses as course}
                <div class="p-5 rounded-2xl card-bg border border-slate-200/50 dark:border-slate-800/40 hover:border-slate-350 dark:hover:border-slate-700 transition-all duration-200 flex flex-col justify-between min-h-[140px] relative group">
                  <div class="flex items-start justify-between gap-4">
                    <div>
                      <h3 class="text-base font-extrabold text-slate-800 dark:text-white leading-tight">
                        {course.title}
                      </h3>
                      <p class="text-xs text-slate-550 dark:text-slate-400 mt-1 font-light">
                        {course.institution}
                      </p>
                    </div>
                    <span class="px-2.5 py-1 text-xs font-semibold rounded-md border bg-slate-50 border-slate-250/70 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-350 shrink-0 select-none">
                      {course.period}
                    </span>
                  </div>

                  {#if course.certificateUrl}
                    <div class="mt-4 pt-3 border-t border-slate-100/50 dark:border-slate-800/30 flex items-center justify-between">
                      <span class="text-[10px] font-bold tracking-wider uppercase text-emerald-600 dark:text-emerald-450 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded">
                        ✓ Oficial
                      </span>
                      <a
                        href={course.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center gap-1.5 text-xs text-indigo-650 dark:text-indigo-400 hover:underline font-bold"
                      >
                        Ver Credencial
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3 h-3">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                      </a>
                    </div>
                  {/if}
                </div>
              {/each}
            </div>
          </div>

        </div>
      </section>

    </main>

    <!-- Clean footer -->
    <Footer />
  </div>
{/if}

  <!-- Global Toast Notification -->
  {#if toast.show}
    <div
      transition:fly={{ y: 24, duration: 350 }}
      class="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 border border-slate-800 dark:border-slate-200 shadow-lg flex items-center gap-2.5 text-xs font-semibold"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.2" stroke="currentColor" class="w-4 h-4 text-emerald-500">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
      </svg>
      <span>{toast.message}</span>
    </div>
  {/if}
</div>
