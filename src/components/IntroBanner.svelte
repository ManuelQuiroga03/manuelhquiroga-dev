<script lang="ts">
  import { cvData } from '../data/cv';
</script>

<section class="relative w-full h-[82vh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#080a0f] via-[#0c0f17] to-slate-50 dark:to-slate-950 select-none">
  
  <!-- Ambient gradient light leaks (collleague's glow vibe) -->
  <div class="absolute w-[450px] h-[450px] rounded-full bg-indigo-500/10 blur-[90px] top-1/4 left-1/4 animate-pulse pointer-events-none"></div>
  <div class="absolute w-[350px] h-[350px] rounded-full bg-pink-500/10 blur-[90px] bottom-1/4 right-1/4 pointer-events-none"></div>

  <!-- Subtle coding design decorations -->
  <div class="absolute top-16 left-16 text-[9px] font-mono text-slate-800 pointer-events-none hidden md:block">
    {"const profile = { name: 'Manuel Quiroga', title: 'C# / SAP Business One' };"}
  </div>
  <div class="absolute bottom-20 right-20 text-[9px] font-mono text-slate-800 pointer-events-none hidden md:block">
    {"console.log('Boot sequence complete. Welcome.');"}
  </div>

  <!-- Centered Logo Signature & Kirby -->
  <div class="relative flex flex-col items-center justify-center gap-1">
    
    <div class="relative flex items-center gap-2 md:gap-4">
      
      <!-- Cursive Signature Text with Deep 3D bubble shadow -->
      <h1 class="text-8xl md:text-[10rem] text-[#fef3c7] signature-text tracking-normal select-none leading-none">
        Manuel
      </h1>

      <!-- Waving Kirby next to the signature -->
      <div class="relative mt-8 md:mt-14 select-none">
        <!-- Floating shadow under Kirby -->
        <div class="absolute bottom-0 w-9 h-1.5 bg-slate-950/60 rounded-full blur-[1px] animate-kirby-shadow"></div>
        
        <svg viewBox="0 0 120 120" class="w-14 h-14 md:w-18 md:h-18 animate-kirby-float" xmlns="http://www.w3.org/2000/svg">
          <!-- Feet -->
          <ellipse cx="32" cy="100" rx="18" ry="12" transform="rotate(-15 32 100)" fill="#dc2626" stroke="#991b1b" stroke-width="1.8" />
          <ellipse cx="88" cy="100" rx="18" ry="12" transform="rotate(15 88 100)" fill="#dc2626" stroke="#991b1b" stroke-width="1.8" />
          <!-- Left hand -->
          <circle cx="16" cy="65" r="14" fill="#fda4af" stroke="#f43f5e" stroke-width="1.8" />
          <!-- Waving right hand (higher position for active wave animation) -->
          <circle cx="104" cy="48" r="14" fill="#fda4af" stroke="#f43f5e" stroke-width="1.8" class="animate-kirby-wave" />
          
          <!-- Main Body -->
          <circle cx="60" cy="60" r="45" fill="#fbcfe8" stroke="#f43f5e" stroke-width="2.2" />
          
          <!-- Eyes -->
          <ellipse cx="48" cy="48" rx="4" ry="11" fill="#0f172a" />
          <ellipse cx="48" cy="42" rx="2.2" ry="5.5" fill="#38bdf8" />
          <circle cx="48" cy="39" r="1.5" fill="#ffffff" />
          
          <ellipse cx="72" cy="48" rx="4" ry="11" fill="#0f172a" />
          <ellipse cx="72" cy="42" rx="2.2" ry="5.5" fill="#38bdf8" />
          <circle cx="72" cy="39" r="1.5" fill="#ffffff" />
          
          <!-- Blush -->
          <ellipse cx="36" cy="62" rx="7" ry="4" fill="#f43f5e" opacity="0.6" />
          <ellipse cx="84" cy="62" rx="7" ry="4" fill="#f43f5e" opacity="0.6" />
          
          <!-- Open smiling mouth -->
          <path d="M 52,58 Q 60,68 68,58 Z" fill="#991b1b" stroke="#7f1d1d" stroke-width="1.2" />
          <path d="M 54,63 Q 60,66 66,63 Q 60,60 54,63 Z" fill="#fda4af" />
        </svg>
      </div>

    </div>

    <!-- Subtitle description -->
    <p class="text-[9px] md:text-[10px] tracking-[0.25em] font-bold text-slate-500 uppercase mt-4 select-none">
      Desarrollador C# & Especialista SAP B1
    </p>

  </div>

  <!-- Animated pulsing mouse scroll indicator pointing down -->
  <div class="absolute bottom-8 flex flex-col items-center gap-1.5 text-slate-500 text-[8px] tracking-widest uppercase font-bold select-none">
    <span>Scroll Down</span>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4 text-slate-500 animate-bounce">
      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  </div>

</section>

<style>
  .signature-text {
    font-family: 'Caveat', cursive;
    text-shadow: 
      3px 3px 0px #0f172a, 
      6px 6px 0px rgba(99, 102, 241, 0.25),
      0px 0px 30px rgba(99, 102, 241, 0.4);
  }

  @keyframes kirby-float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-6px);
    }
  }
  .animate-kirby-float {
    animation: kirby-float 2.4s ease-in-out infinite;
  }

  @keyframes shadow-shrink {
    0%, 100% {
      transform: scale(1);
      opacity: 0.6;
    }
    50% {
      transform: scale(0.8);
      opacity: 0.35;
    }
  }
  .animate-kirby-shadow {
    animation: shadow-shrink 2.4s ease-in-out infinite;
  }

  @keyframes wave-hand {
    0%, 100% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(15deg) translateY(-2px);
    }
  }
  .animate-kirby-wave {
    animation: wave-hand 0.8s ease-in-out infinite;
    transform-origin: bottom left;
  }
</style>
