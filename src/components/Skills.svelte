<script lang="ts">
  const cards = [
    {
      pill: "Backend",
      pillClass: "border-blue-500/30 bg-blue-500/5 text-blue-600 dark:text-blue-400",
      iconClass: "border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/5",
      borderGlow: "hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]",
      title: "Desarrollo Backend & C#",
      description: "Desarrollo de lógica de negocio robusta, eficiente y escalable del lado del servidor utilizando C# y .NET, asegurando consistencia y alto rendimiento.",
      mainBullet: "Arquitectura limpia y desarrollo backend con C# / .NET",
      bullets: [
        "Aplicación estricta de Principios SOLID, código limpio y Patrones de Diseño",
        "Creación de servicios de fondo, lógica central y procesamiento síncrono/asíncrono",
        "Implementación de lógica para auditorías, logs y control de errores robusto",
        "Tuning de rendimiento en código crítico para transacciones concurrentes"
      ],
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" /></svg>`
    },
    {
      pill: "Bases de Datos",
      pillClass: "border-emerald-500/30 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400",
      iconClass: "border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5",
      borderGlow: "hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]",
      title: "Bases de Datos & SQL",
      description: "Diseño, modelado y optimización de bases de datos relacionales garantizando integridad transaccional y consultas de alta velocidad.",
      mainBullet: "Modelado y tuning de consultas complejas en SQL Server",
      bullets: [
        "Desarrollo avanzado de Procedimientos Almacenados, funciones y vistas",
        "Optimización de queries mediante análisis de planes de ejecución e índices",
        "Modelado de datos robusto y normalización para garantizar la integridad",
        "Monitoreo y corrección de bloqueos (deadlocks) y cuellos de botella"
      ],
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125v-3.75m16.5 0v3.75m-16.5-3.75v3.75" /></svg>`
    },
    {
      pill: "Integraciones",
      pillClass: "border-violet-500/30 bg-violet-500/5 text-violet-600 dark:text-violet-400",
      iconClass: "border-violet-500/30 text-violet-600 dark:text-violet-400 bg-violet-500/5",
      borderGlow: "hover:border-violet-500/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]",
      title: "APIs, XML/XSLT & SAP B1",
      description: "Conectividad total mediante servicios web, integración ERP y procesamiento fiscal para flujos comerciales sin fricciones.",
      mainBullet: "Integración de facturación CFDI 4.0 y middlewares SOAP/REST",
      bullets: [
        "Desarrollo y consumo de servicios SOAP basados en esquemas WSDL complejos",
        "Integración de SDK de SAP Business One (DI API / Service Layer)",
        "Creación de hojas de estilo XSLT para transformar XML fiscales al SAT",
        "Mapeo de datos para timbrado, Carta Porte 3.1 y complementos de pago"
      ],
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-.778.099-1.533.284-2.253" /></svg>`
    },
    {
      pill: "Frontend / Metodología",
      pillClass: "border-amber-500/30 bg-amber-500/5 text-amber-600 dark:text-amber-450",
      iconClass: "border-amber-500/30 text-amber-600 dark:text-amber-450 bg-amber-500/5",
      borderGlow: "hover:border-amber-500/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]",
      title: "Frontend & Agilidad",
      description: "Interfaces responsivas, control de versiones robusto y trabajo en equipo gestionado mediante marcos ágiles.",
      mainBullet: "Interfaces web con Angular, HTML5/CSS3 y metodologías ágiles",
      bullets: [
        "Desarrollo Frontend modular e interactivo con JavaScript y TypeScript",
        "Control de versiones estructurado usando Git y metodologías GitFlow",
        "Maquetado responsivo moderno aplicando Tailwind CSS y estándares semánticos",
        "Trabajo colaborativo y entregas continuas bajo marcos Scrum / Kanban"
      ],
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>`
    }
  ];
</script>

<section id="habilidades" class="py-16 md:py-24">
  <div class="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
    
    <!-- Section Header -->
    <div class="text-center max-w-xl mx-auto mb-16">
      <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
        Habilidades Técnicas
      </h2>
      <div class="h-1 w-12 bg-indigo-600 dark:bg-indigo-500 rounded mx-auto mt-4 mb-3"></div>
      <p class="text-sm text-slate-500 dark:text-slate-400">
        Mi stack de tecnologías y áreas de competencia especializadas en desarrollo de software backend e integración.
      </p>
    </div>

    <!-- Skills Grid (4 Columns on wide view, responsive scaling) -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {#each cards as card, i}
        <div class="relative bg-white dark:bg-[#0c0f16] border border-slate-200/80 dark:border-[#1c2130] rounded-[24px] p-6 flex flex-col justify-between h-full transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_12px_rgba(0,0,0,0.02)] dark:shadow-none {card.borderGlow} group reveal">
          
          <div>
            <!-- Card Header (Icon & Pill Badge) -->
            <div class="flex items-center justify-between mb-5">
              <div class="h-10 w-10 rounded-[12px] border flex items-center justify-center {card.iconClass}">
                {@html card.iconSvg}
              </div>
              <span class="px-3 py-1 rounded-full border text-[10px] font-bold tracking-wide uppercase {card.pillClass}">
                {card.pill}
              </span>
            </div>

            <!-- Title & description -->
            <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
              {card.title}
            </h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6 font-light">
              {card.description}
            </p>

            <!-- Card Bullets -->
            <div class="space-y-4">
              <!-- Main Highlight Bullet Point with Vertical Bar -->
              <div class="pl-3 border-l-2 border-indigo-600 dark:border-indigo-500 text-xs font-semibold text-slate-700 dark:text-slate-250 leading-snug">
                {card.mainBullet}
              </div>
              
              <!-- Sub bullet list with chevron arrows -->
              <ul class="space-y-2.5">
                {#each card.bullets as bullet}
                  <li class="flex items-start gap-2 text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                    <svg class="w-2 h-2 mt-1.5 shrink-0 fill-current text-indigo-600 dark:text-indigo-400" viewBox="0 0 24 24">
                      <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/>
                    </svg>
                    <span>{bullet}</span>
                  </li>
                {/each}
              </ul>
            </div>
          </div>

          <!-- Bottom category metadata -->
          <div class="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800/40 flex justify-between items-center text-[9px] font-bold tracking-widest text-slate-400 uppercase select-none">
            <span>Competencia</span>
            <span class="text-indigo-600 dark:text-indigo-400">Pro</span>
          </div>

        </div>
      {/each}
    </div>

  </div>
</section>
