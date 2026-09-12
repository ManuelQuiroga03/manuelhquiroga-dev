<script lang="ts">
  interface TechItem {
    name: string;
    type: 'url' | 'svg';
    src?: string;
    svg?: string;
  }

  let { onSelectTech }: { onSelectTech?: (techName: string) => void } = $props();

  // Row 1: Frontend & UI Technologies
  const row1Items: TechItem[] = [
    { name: 'HTML5', type: 'url', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/html5/html5-original.svg' },
    { name: 'CSS3', type: 'url', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/css3/css3-original.svg' },
    { name: 'Tailwind CSS', type: 'url', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/tailwindcss/tailwindcss-original.svg' },
    { name: 'JavaScript', type: 'url', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/javascript/javascript-original.svg' },
    { name: 'TypeScript', type: 'url', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/typescript/typescript-original.svg' },
    { name: 'Angular', type: 'url', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/angularjs/angularjs-original.svg' },
    { name: 'React.js', type: 'url', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/react/react-original.svg' },
    { name: 'Next.js', type: 'url', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/nextjs/nextjs-original.svg' },
    { name: 'Svelte', type: 'url', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/svelte/svelte-original.svg' },
    { name: 'Vite', type: 'url', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/vite/vite-original.svg' },
    { name: 'Figma', type: 'url', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/figma/figma-original.svg' }
  ];

  // Row 2: Backend, Databases & Architectures
  const row2Items: TechItem[] = [
    { name: 'C#', type: 'url', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/csharp/csharp-original.svg' },
    { name: '.NET Core', type: 'url', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/dotnetcore/dotnetcore-original.svg' },
    { name: 'SQL Server', type: 'url', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/microsoftsqlserver/microsoftsqlserver-original.svg' },
    { name: 'PostgreSQL', type: 'url', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/postgresql/postgresql-original.svg' },
    { name: 'Supabase', type: 'url', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/supabase/supabase-original.svg' },
    { name: 'SAP Business One', type: 'svg', svg: '<svg class="w-5 h-2.5 text-[#006097]" viewBox="0 0 24 10" fill="currentColor"><path d="M4 1.5c-1.2 0-2 .6-2 1.4s.8 1.2 2 1.4c1.8.3 3 .8 3 2.2 0 1.8-1.5 2.5-3.5 2.5-1.8 0-3-.5-3.5-1.2v-1.5c.6.8 1.8 1.2 3.1 1.2 1.2 0 2-.5 2-1.3s-.8-1.1-2-1.3C1.3 4 .3 3.5.3 2.2.3.6 1.8 0 3.6 0c1.6 0 2.7.4 3.3.9V2.4c-.6-.6-1.6-.9-2.9-.9zm7.5.5H8.7v7.5H7.2V2H4.4V.6h7.1v1.4zm5.7 3.6H14v3.9h-1.5V.6h3.4c2.2 0 3.2 1.2 3.2 2.8 0 1.8-1 2.7-3.1 2.7zm-1.8-1.4h1.7c1.1 0 1.7-.5 1.7-1.4 0-.8-.6-1.3-1.7-1.3H15.4v2.7z"/></svg>' },
    { name: 'Python', type: 'url', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/python/python-original.svg' },
    { name: 'FastAPI', type: 'url', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/fastapi/fastapi-original.svg' },
    { name: 'Postman', type: 'url', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/postman/postman-original.svg' }
  ];

  // Row 3: Tools, DevOps & AI Agents
  const row3Items: TechItem[] = [
    { name: 'Docker', type: 'url', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/docker/docker-original.svg' },
    { name: 'Podman', type: 'url', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/podman/podman-original.svg' },
    { name: 'Git', type: 'url', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/git/git-original.svg' },
    { name: 'GitHub', type: 'url', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/github/github-original.svg' },
    { name: 'Vercel', type: 'svg', svg: '<svg class="w-4 h-4 text-[#000000] dark:text-white fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M24 22.525H0L12 1.475L24 22.525Z"/></svg>' },
    { name: 'Visual Studio', type: 'url', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/visualstudio/visualstudio-original.svg' },
    { name: 'VS Code', type: 'url', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/vscode/vscode-original.svg' },
    { name: 'Antigravity IDE', type: 'svg', svg: '<svg class="w-4 h-4 text-[#8B5CF6] fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 18c-.55 0-1-.45-1-1V4.41L7.7 7.71a1 1 0 0 1-1.4-1.42l5-5a1 1 0 0 1 1.4 0l5 5a1 1 0 0 1-1.4 1.42L13 4.41V17c0 .55-.45 1-1 1zm0 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/></svg>' },
    { name: 'Google Gemini', type: 'svg', svg: '<svg class="w-4 h-4 text-[#4285F4] fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0c0 6.627-5.373 12-12 12 6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z"/></svg>' },
    { name: 'ChatGPT', type: 'svg', svg: '<svg class="w-4 h-4 text-[#10a37f] fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21.5 10.5c-.3-1.6-1.5-2.8-3.1-3.1-1.6-.3-3.2.4-3.9 1.8-.7-.9-1.9-1.4-3.1-1.2-1.2.2-2.2 1.1-2.5 2.3-.9-.7-2.2-.9-3.2-.4-1 .5-1.7 1.6-1.7 2.8 0 1.2.7 2.3 1.7 2.8 1.1.5 2.3.3 3.2-.4.3 1.2 1.3 2.1 2.5 2.3 1.2.2 2.4-.3 3.1-1.2.7 1.4 2.3 2.1 3.9 1.8 1.6-.3 2.8-1.5 3.1-3.1.3-1.6-.4-3.2-1.8-3.9 1.4-.7 2.1-2.3 1.8-3.9zM12 13.5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5-.7 1.5-1.5 1.5z"/></svg>' }
  ];

  const rows = [
    { items: row1Items, animationClass: 'animate-infinite-slide' },
    { items: row2Items, animationClass: 'animate-infinite-slide-reverse' },
    { items: row3Items, animationClass: 'animate-infinite-slide' }
  ];

  function handlePillClick(techName: string) {
    if (onSelectTech) {
      onSelectTech(techName);
    }
  }
</script>

<section class="py-12 border-t border-slate-200/50 dark:border-slate-800/40 bg-slate-100/10 dark:bg-[#080a0f]/20 overflow-hidden select-none space-y-4">
  
  <!-- Section Header -->
  <div class="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center reveal">
    <h2 class="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-1">
      Stack & Herramientas
    </h2>
    <h3 class="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
      Ecosistema Tecnológico Dominado
    </h3>
  </div>

  <!-- 3 Full-Width Sliding Rows of Pills -->
  <div class="relative w-full flex flex-col gap-3.5 overflow-x-hidden">
    
    <!-- Ambient Edge Fade Masks -->
    <div class="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>
    <div class="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>

    {#each rows as row}
      <div class="flex gap-3.5 py-1 shrink-0 {row.animationClass} hover:[animation-play-state:paused] whitespace-nowrap cursor-pointer">
        {#each [...Array(2)] as _}
          <div class="flex gap-3.5 items-center">
            {#each row.items as tech}
              <button 
                type="button"
                onclick={() => handlePillClick(tech.name)}
                title="Filtrar proyectos por {tech.name}"
                class="px-4 py-2 rounded-full bg-white/90 dark:bg-[#121620]/90 border border-slate-200/80 dark:border-slate-800/80 text-xs font-semibold text-slate-800 dark:text-slate-200 shadow-sm flex items-center gap-2.5 hover:scale-105 hover:border-indigo-500/50 hover:bg-white dark:hover:bg-[#1a202c] transition-all duration-200 group cursor-pointer active:scale-95"
              >
                <!-- Icon container -->
                <div class="w-4 h-4 shrink-0 flex items-center justify-center">
                  {#if tech.type === 'svg'}
                    {@html tech.svg}
                  {:else}
                    <img 
                      src={tech.src} 
                      alt={tech.name} 
                      class="w-4 h-4 object-contain {tech.name === 'GitHub' || tech.name === 'Next.js' ? 'dark:invert' : ''}" 
                      loading="lazy" 
                    />
                  {/if}
                </div>

                <!-- Label -->
                <span>{tech.name}</span>
              </button>
            {/each}
          </div>
        {/each}
      </div>
    {/each}

  </div>
</section>
