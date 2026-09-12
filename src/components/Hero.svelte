<script lang="ts">
  import { cvData } from "../data/cv";
  import { fade, fly } from "svelte/transition";
  import { toast } from "../lib/toast.svelte";

  const { profile } = cvData;

  function handleEmailClick() {
    navigator.clipboard.writeText(profile.email);
    toast.trigger("¡Email copiado al portapapeles! Abriendo correo...");
  }
</script>

<section
  id="sobre-mi"
  class="relative py-16 md:py-24 overflow-hidden grid-bg-subtle border-b border-slate-200/60 dark:border-slate-800/40"
>
  <!-- Subtle decorative ambient glows for premium feel -->
  <div
    class="absolute top-1/4 left-1/12 w-64 h-64 rounded-full bg-indigo-500/5 dark:bg-indigo-500/5 blur-3xl -z-10"
  ></div>
  <div
    class="absolute bottom-1/4 right-1/12 w-80 h-80 rounded-full bg-teal-500/5 dark:bg-teal-500/3 blur-3xl -z-10"
  ></div>

  <div class="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
      <!-- Avatar Section (Left) -->
      <div
        class="md:col-span-4 flex justify-center"
        in:fly={{ y: 15, duration: 600 }}
      >
        <div class="relative">
          <!-- Ambient subtle glow border -->
          <div
            class="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-indigo-500 to-indigo-400 opacity-30 dark:opacity-20 blur-sm"
          ></div>

          <!-- Image frame -->
          <div
            class="relative bg-white dark:bg-slate-900 p-1.5 rounded-2xl shadow-md border border-slate-200/50 dark:border-slate-800"
          >
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              class="w-44 aspect-[3/4] sm:w-52 md:w-60 object-cover rounded-xl shadow-inner"
            />
          </div>

          <!-- Active status tag -->
          <div
            class="absolute -bottom-2 -right-2 px-3 py-1 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-250 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 shadow-sm flex items-center gap-1.5"
          >
            <span class="relative flex h-1.5 w-1.5">
              <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
              ></span>
              <span
                class="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"
              ></span>
            </span>
            Disponible
          </div>
        </div>
      </div>

      <!-- Profile details (Right) -->
      <div
        class="md:col-span-8 space-y-6 text-center md:text-left animate-fade-in"
        in:fade={{ duration: 700, delay: 100 }}
      >
        <div class="space-y-2">
          <!-- Role title tag & Quick response indicator -->
          <div class="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span
              class="inline-flex px-3 py-1 rounded-full text-xs font-semibold tracking-wide text-indigo-700 bg-indigo-50 dark:text-indigo-350 dark:bg-indigo-950/40"
            >
              Desarrollo Backend & Integración
            </span>
            <span
              class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium text-slate-500 bg-slate-100 dark:text-slate-400 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800"
            >
              <span>⏱️</span>
              <span>Respuesta &lt; 24 hrs</span>
            </span>
          </div>

          <h1
            class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight"
          >
            {profile.name}
          </h1>
          <p
            class="text-lg sm:text-xl font-medium text-slate-700 dark:text-slate-300 font-display"
          >
            {profile.title}
          </p>
        </div>

        <!-- Professional profile description -->
        <p
          class="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed font-sans font-light"
        >
          {profile.summary}
        </p>

        <!-- Dynamic Action Buttons & Contact Icons -->
        <div
          class="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-2"
        >
          <a
            href="mailto:{profile.email}"
            onclick={handleEmailClick}
            class="w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 text-center cursor-pointer active:scale-95"
          >
            Contactar
          </a>

          <a
            href={profile.pdfUrl || "/CV_Manuel_Hernandez.pdf"}
            target={profile.pdfUrl ? "_blank" : undefined}
            download={profile.pdfUrl ? undefined : "CV_Manuel_Hernandez.pdf"}
            class="w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-slate-800 bg-white border border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white shadow-sm hover:shadow transition-all duration-200 hover:-translate-y-0.5 text-center cursor-pointer active:scale-95 flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-4 h-4 text-indigo-650 dark:text-indigo-400"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            Descargar CV PDF
          </a>

          <div class="flex items-center gap-3">
            <!-- Github Link -->
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              class="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-all duration-200 hover:-translate-y-0.5 shadow-sm cursor-pointer active:scale-95"
            >
              <svg
                class="w-4 h-4 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.48 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                />
              </svg>
            </a>

            <!-- LinkedIn Link -->
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              class="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-all duration-200 hover:-translate-y-0.5 shadow-sm cursor-pointer active:scale-95"
            >
              <svg
                class="w-4 h-4 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                />
              </svg>
            </a>

            <!-- Location & Phone metadata -->
            <span
              class="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-3 font-medium ml-2 flex-wrap text-left"
            >
              <span class="flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.8"
                  stroke="currentColor"
                  class="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
                {profile.location}
              </span>
              <span class="hidden sm:inline text-slate-200 dark:text-slate-800"
                >|</span
              >
              <span class="flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.8"
                  stroke="currentColor"
                  class="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.387a12.035 12.035 0 0 1-7.108-7.108c-.145-.44-.013-.928.387-1.21l1.293-.97a1.125 1.125 0 0 0 .417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                  />
                </svg>
                {profile.phone}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
