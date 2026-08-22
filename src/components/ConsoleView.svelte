<script lang="ts">
  import { onMount } from 'svelte';
  import ConsoleScreen from './ConsoleScreen.svelte';
  import { cvData } from '../data/cv';

  let { 
    onViewClassic = () => {},
    assemblyState = $bindable('detached')
  } = $props<{
    onViewClassic: () => void;
    assemblyState: 'detached' | 'snapping' | 'loaded' | 'un-snapping';
  }>();

  // Screen options
  const menuOptions = [
    { id: 'portfolio', label: 'portfolio' },
    { id: 'pdf', label: 'pdf' },
    { id: 'tetris', label: 'tetris' },
    { id: 'hobbies', label: 'hobbies' }
  ];

  let selectedIndex = $state(0);
  let isEntered = $state(false);
  let isPowered = $state(true);
  let isCrtCollapsing = $state(false);
  
  // Svelte 5 state to manage system booting
  let systemBooted = $state(false);

  // Bindable game control state communicating with the Tetris loop in ConsoleScreen
  let gameControl = $state<string | null>(null);

  const totalOptions = menuOptions.length;
  let currentOption = $derived(menuOptions[selectedIndex].id);

  onMount(() => {
    // Stage 1: Joycons are detached at load.
    // Stage 2: Slide in and snap to screen after 200ms
    const snappingTimeout = setTimeout(() => {
      if (assemblyState === 'detached') {
        assemblyState = 'snapping';
      }
    }, 200);

    // Stage 3: Snap completes, click sound simulation, turn on screen and boot system
    const loadedTimeout = setTimeout(() => {
      if (assemblyState === 'snapping') {
        assemblyState = 'loaded';
      }
    }, 950);

    return () => {
      clearTimeout(snappingTimeout);
      clearTimeout(loadedTimeout);
    };
  });

  function navigateUp() {
    if (isEntered) return;
    selectedIndex = (selectedIndex - 1 + totalOptions) % totalOptions;
  }

  function navigateDown() {
    if (isEntered) return;
    selectedIndex = (selectedIndex + 1) % totalOptions;
  }

  function enterOption() {
    if (isEntered) return;
    isEntered = true;
  }

  function backToMenu() {
    if (!isEntered) return;
    isEntered = false;
  }

  function downloadPDF() {
    const pdfUrl = cvData.profile.pdfUrl;
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    } else {
      const link = document.createElement('a');
      link.href = '/CV_Manuel_Hernandez.pdf';
      link.download = 'CV_Manuel_Hernandez.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  // Hardware Power toggle with CRT collapse animation
  function togglePower() {
    if (!isPowered) {
      // Turn back on instantly
      isPowered = true;
      isCrtCollapsing = false;
    } else {
      // Trigger CRT squeeze collapse animation first, then shut down screen power
      isCrtCollapsing = true;
      setTimeout(() => {
        isPowered = false;
      }, 380);
    }
  }

  // Trigger un-snap slide-out animation, then toggle classic view mode
  function startUnsnapping() {
    assemblyState = 'un-snapping';
    setTimeout(() => {
      onViewClassic();
    }, 1000);
  }

  // Keyboard navigation mappings (WASD/Arrows/Enter/Esc/Space)
  function handleKeyDown(event: KeyboardEvent) {
    if (!isPowered || assemblyState === 'un-snapping') return;
    const key = event.key;

    // IF JUGAR_TETRIS IS ENTERED: Route key controls directly to game loop
    if (isEntered && currentOption === 'tetris') {
      if (key === 'ArrowLeft' || key === 'a' || key === 'A') {
        event.preventDefault();
        gameControl = 'left';
      } else if (key === 'ArrowRight' || key === 'd' || key === 'D') {
        event.preventDefault();
        gameControl = 'right';
      } else if (key === 'ArrowUp' || key === 'w' || key === 'W' || key === 'Enter') {
        event.preventDefault();
        gameControl = 'rotate';
      } else if (key === 'ArrowDown' || key === 's' || key === 'S') {
        event.preventDefault();
        gameControl = 'drop';
      } else if (key === ' ' || key === 'Spacebar') {
        event.preventDefault();
        gameControl = 'harddrop';
      } else if (key === 'Escape' || key === 'Backspace') {
        event.preventDefault();
        backToMenu();
      }
      return;
    }

    // Default main menu navigation
    if (key === 'ArrowUp' || key === 'w' || key === 'W') {
      event.preventDefault();
      navigateUp();
    } else if (key === 'ArrowDown' || key === 's' || key === 'S') {
      event.preventDefault();
      navigateDown();
    } else if (key === 'Enter' || key === 'a' || key === 'A' || key === ' ') {
      event.preventDefault();
      enterOption();
    } else if (key === 'Escape' || key === 'b' || key === 'B' || key === 'Backspace') {
      event.preventDefault();
      backToMenu();
    }
  }
</script>

<svelte:window onkeydown={handleKeyDown} />

<div class="w-full py-4 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
  
  <!-- Realistic 3D Nintendo Switch Body Wrapper (Optimized max-w-[1150px] for widescreen spacing) -->
  <div class="relative w-full max-w-[1150px] flex flex-col md:flex-row items-stretch select-none">
    
    <!-- Left Joy-Con (Desktop only) -->
    <div 
      class="hidden md:flex bg-neutral-800/95 rounded-l-[40px] p-6 flex-col justify-between items-center shadow-2xl relative border-r-4 border-cyan-400/90 w-[130px] transition-all duration-1000 ease-in-out z-20 overflow-hidden"
      class:translate-x-[-200px]={assemblyState === 'detached' || assemblyState === 'un-snapping'}
      class:opacity-0={assemblyState === 'detached' || assemblyState === 'un-snapping'}
      class:translate-x-0={assemblyState === 'snapping' || assemblyState === 'loaded'}
      class:opacity-100={assemblyState === 'snapping' || assemblyState === 'loaded'}
    >
      <!-- Metallic bevel overlay clipped by overflow-hidden -->
      <div class="absolute inset-0 bg-gradient-to-tr from-neutral-900/40 via-transparent to-white/5 pointer-events-none"></div>

      <!-- Minus Button -->
      <button 
        onclick={backToMenu}
        aria-label="Minus button"
        class="h-2.5 w-6 bg-neutral-900 border border-neutral-950 rounded-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),_0_2px_4px_rgba(0,0,0,0.6)] active:translate-y-0.5 cursor-pointer z-30"
      ></button>

      <!-- Left Analog Stick (Deep glossy 3D socket) -->
      <div class="relative w-12 h-12 rounded-full bg-neutral-950 border border-neutral-900 flex items-center justify-center shadow-[inset_0_2px_6px_rgba(0,0,0,0.8)] z-30">
        <div class="w-10 h-10 rounded-full bg-gradient-to-b from-neutral-700 via-neutral-800 to-neutral-900 shadow-lg border border-neutral-950 flex items-center justify-center">
          <div class="w-7 h-7 rounded-full bg-neutral-950 border border-neutral-900 shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)]"></div>
        </div>
      </div>

      <!-- D-Pad (Matte Beveled D-Pad Cross) -->
      <div class="relative w-18 h-18 flex items-center justify-center z-30">
        <!-- Vertical Bar -->
        <div class="absolute w-5 h-15 bg-neutral-900 border border-neutral-950 rounded-md shadow-lg flex flex-col justify-between py-1 items-center">
          <button 
            onclick={navigateUp}
            aria-label="Nav Up"
            class="w-4 h-4 bg-gradient-to-b from-neutral-800 to-neutral-900 border border-neutral-950 rounded active:bg-neutral-850 flex items-center justify-center cursor-pointer"
          >
            <svg class="w-3 h-3 fill-current text-neutral-400" viewBox="0 0 24 24"><path d="M7 14l5-5 5 5H7z"/></svg>
          </button>
          <button 
            onclick={navigateDown}
            aria-label="Nav Down"
            class="w-4 h-4 bg-gradient-to-b from-neutral-800 to-neutral-900 border border-neutral-950 rounded active:bg-neutral-850 flex items-center justify-center cursor-pointer"
          >
            <svg class="w-3 h-3 fill-current text-neutral-400" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5H7z"/></svg>
          </button>
        </div>

        <!-- Horizontal Bar -->
        <div class="absolute w-15 h-5 bg-neutral-900 border border-neutral-950 rounded-md shadow-lg flex justify-between px-1 items-center">
          <button 
            onclick={() => { if (isEntered && currentOption === 'tetris') gameControl = 'left'; }}
            aria-label="Nav Left"
            class="w-4 h-4 bg-gradient-to-b from-neutral-800 to-neutral-900 border border-neutral-950 rounded active:bg-neutral-855 flex items-center justify-center cursor-pointer"
          >
            <svg class="w-3 h-3 fill-current text-neutral-500" viewBox="0 0 24 24"><path d="M14 7l-5 5 5 5V7z"/></svg>
          </button>
          <button 
            onclick={() => { if (isEntered && currentOption === 'tetris') gameControl = 'right'; }}
            aria-label="Nav Right"
            class="w-4 h-4 bg-gradient-to-b from-neutral-800 to-neutral-900 border border-neutral-950 rounded active:bg-neutral-855 flex items-center justify-center cursor-pointer"
          >
            <svg class="w-3 h-3 fill-current text-neutral-500" viewBox="0 0 24 24"><path d="M10 17l5-5-5-5v10z"/></svg>
          </button>
        </div>
      </div>

      <!-- Capture Button (Square Matte) -->
      <button 
        onclick={downloadPDF}
        aria-label="Descargar PDF"
        title="Descargar Currículum PDF"
        class="h-7 w-7 bg-neutral-900 border border-neutral-950 rounded shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),_0_2px_4px_rgba(0,0,0,0.5)] flex items-center justify-center active:scale-95 active:bg-neutral-855 transition-all duration-100 cursor-pointer z-30"
      >
        <div class="h-3.5 w-3.5 rounded-full border border-neutral-700 bg-neutral-950 shadow-inner"></div>
      </button>

    </div>

    <!-- Center Bezel & Screen (on mobile, we round only top corners) -->
    <div class="flex-grow w-full md:w-auto bg-black border-4 border-neutral-900 rounded-t-2xl md:rounded-lg rounded-b-none md:rounded-b-lg p-2 md:p-3 flex flex-col items-stretch justify-between min-h-[420px] md:min-h-[500px] relative shadow-2xl z-10 overflow-hidden">
      
      <!-- Top Bezel Hardware Buttons (Power button & Volume bar) -->
      <div class="absolute -top-[12px] left-10 flex items-end gap-3 z-30">
        <!-- Power Button -->
        <button 
          onclick={togglePower}
          aria-label="Power Button"
          title="Encender / Apagar Pantalla"
          class="h-[8px] w-6 bg-neutral-950 border-t border-x border-neutral-800 active:h-[6px] hover:bg-neutral-900 transition-all duration-100 rounded-t cursor-pointer"
        ></button>
        
        <!-- Volume button (visual detail) -->
        <div class="h-[6px] w-8 bg-neutral-950 border-t border-x border-neutral-800 rounded-t"></div>
      </div>

      <!-- Bezel Glossy Screen Reflection Overlay -->
      <div class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none rounded-md z-30"></div>

      <!-- Dynamic Screen Content with CRT Screen-off and Un-snapping expansion transitions -->
      <div 
        class="flex-grow flex items-stretch rounded-md overflow-hidden bg-black transition-all"
        class:screen-off-crt={isCrtCollapsing}
        class:opacity-0={assemblyState === 'un-snapping'}
        class:scale-[1.025]={assemblyState === 'un-snapping'}
        class:duration-[900ms]={assemblyState === 'un-snapping'}
        class:hidden={!isPowered && !isCrtCollapsing}
      >
        {#if isPowered}
          <ConsoleScreen 
            selectedIndex={selectedIndex}
            bind:isEntered
            currentOption={currentOption}
            bind:systemBooted
            bind:gameControl
            onViewClassic={startUnsnapping}
          />
        {/if}
      </div>
      
      {#if !isPowered}
        <!-- Blank/Powered off state screen -->
        <div class="flex-grow bg-[#020204] rounded-md border border-neutral-950 shadow-inner"></div>
      {/if}

    </div>

    <!-- Mobile Gamepad Extension Panel (Snaps right below screen on mobile, mimicking colleague's retro controller) -->
    <div 
      class="flex md:hidden bg-neutral-800 border-x-4 border-b-8 border-neutral-900 rounded-b-2xl p-5 items-center justify-between shadow-2xl relative overflow-hidden h-[125px] z-20 transition-all duration-[950ms] ease-in-out"
      class:translate-y-[50px]={assemblyState === 'un-snapping'}
      class:opacity-0={assemblyState === 'un-snapping'}
    >
      <!-- Metallic bevel overlay -->
      <div class="absolute inset-0 bg-gradient-to-tr from-neutral-900/40 via-transparent to-white/5 pointer-events-none"></div>

      <!-- D-Pad (Left side of mobile plate) -->
      <div class="relative w-16 h-16 flex items-center justify-center z-30">
        <!-- Vertical Bar of Cross -->
        <div class="absolute w-5.5 h-14 bg-neutral-950 border border-neutral-900 rounded shadow-md flex flex-col justify-between py-0.5 items-center">
          <button 
            onclick={() => { if (isEntered && currentOption === 'tetris') { gameControl = 'rotate'; } else { navigateUp(); } }}
            aria-label="Nav Up Mobile"
            class="w-4.5 h-4.5 bg-gradient-to-b from-neutral-800 to-neutral-900 rounded active:bg-neutral-850 flex items-center justify-center cursor-pointer"
          >
            <svg class="w-3 h-3 fill-current text-neutral-400" viewBox="0 0 24 24"><path d="M7 14l5-5 5 5H7z"/></svg>
          </button>
          <button 
            onclick={() => { if (isEntered && currentOption === 'tetris') { gameControl = 'drop'; } else { navigateDown(); } }}
            aria-label="Nav Down Mobile"
            class="w-4.5 h-4.5 bg-gradient-to-b from-neutral-800 to-neutral-900 rounded active:bg-neutral-850 flex items-center justify-center cursor-pointer"
          >
            <svg class="w-3 h-3 fill-current text-neutral-400" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5H7z"/></svg>
          </button>
        </div>
        <!-- Horizontal Bar of Cross -->
        <div class="absolute w-14 h-5.5 bg-neutral-950 border border-neutral-900 rounded shadow-md flex justify-between px-0.5 items-center">
          <button 
            onclick={() => { if (isEntered && currentOption === 'tetris') gameControl = 'left'; }}
            aria-label="Nav Left Mobile"
            class="w-4.5 h-4.5 bg-gradient-to-b from-neutral-800 to-neutral-900 rounded active:bg-neutral-850 flex items-center justify-center cursor-pointer"
          >
            <svg class="w-3 h-3 fill-current text-neutral-500" viewBox="0 0 24 24"><path d="M14 7l-5 5 5 5V7z"/></svg>
          </button>
          <button 
            onclick={() => { if (isEntered && currentOption === 'tetris') gameControl = 'right'; }}
            aria-label="Nav Right Mobile"
            class="w-4.5 h-4.5 bg-gradient-to-b from-neutral-800 to-neutral-900 rounded active:bg-neutral-850 flex items-center justify-center cursor-pointer"
          >
            <svg class="w-3 h-3 fill-current text-neutral-500" viewBox="0 0 24 24"><path d="M10 17l5-5-5-5v10z"/></svg>
          </button>
        </div>
      </div>

      <!-- Action Buttons B / A (Right side of mobile plate, rounded with labels) -->
      <div class="flex items-center gap-5 z-30 mr-2">
        <!-- B Button (Back) -->
        <div class="flex flex-col items-center gap-1">
          <button 
            onclick={() => { if (isEntered && currentOption === 'tetris') { gameControl = 'drop'; } else { backToMenu(); } }}
            class="h-10 w-10 rounded-full bg-neutral-950 border-2 border-neutral-900 flex items-center justify-center text-xs font-black text-pink-450 hover:bg-neutral-900 active:scale-90 shadow-lg cursor-pointer"
          >B</button>
          <span class="text-[7px] font-extrabold text-slate-500 uppercase tracking-wider">Atrás</span>
        </div>
        
        <!-- A Button (Select/Accept) -->
        <div class="flex flex-col items-center gap-1">
          <button 
            onclick={() => { if (isEntered && currentOption === 'tetris') { gameControl = 'harddrop'; } else { enterOption(); } }}
            class="h-10 w-10 rounded-full bg-neutral-950 border-2 border-neutral-900 flex items-center justify-center text-xs font-black text-emerald-450 hover:bg-neutral-900 active:scale-90 shadow-lg cursor-pointer"
          >A</button>
          <span class="text-[7px] font-extrabold text-slate-500 uppercase tracking-wider">Aceptar</span>
        </div>
      </div>

    </div>

    <!-- Right Joy-Con (Desktop only) -->
    <div 
      class="hidden md:flex bg-neutral-800/95 rounded-r-[40px] p-6 flex-col justify-between items-center shadow-2xl relative border-l-4 border-orange-500/90 w-[130px] transition-all duration-1000 ease-in-out z-20 overflow-hidden"
      class:translate-x-[200px]={assemblyState === 'detached' || assemblyState === 'un-snapping'}
      class:opacity-0={assemblyState === 'detached' || assemblyState === 'un-snapping'}
      class:translate-x-0={assemblyState === 'snapping' || assemblyState === 'loaded'}
      class:opacity-100={assemblyState === 'snapping' || assemblyState === 'loaded'}
    >
      <!-- Metallic bevel overlay clipped by overflow-hidden -->
      <div class="absolute inset-0 bg-gradient-to-bl from-white/5 via-transparent to-neutral-900/40 pointer-events-none"></div>

      <!-- Plus Button -->
      <button 
        onclick={enterOption}
        aria-label="Plus button"
        class="relative h-6 w-6 flex items-center justify-center active:scale-95 cursor-pointer z-30"
      >
        <div class="absolute w-4.5 h-1 bg-neutral-900 border border-neutral-950 rounded-sm shadow-md"></div>
        <div class="absolute w-1 h-4.5 bg-neutral-900 border border-neutral-950 rounded-sm shadow-md"></div>
      </button>

      <!-- Action Buttons (X/Y/A/B Layout) -->
      <div class="relative w-18 h-18 flex items-center justify-center z-30">
        <!-- X Button (Top) -->
        <button 
          onclick={() => { if (isEntered && currentOption === 'tetris') { gameControl = 'rotate'; } else { navigateUp(); } }}
          class="absolute top-0 h-6.5 w-6.5 rounded-full bg-neutral-900 border border-neutral-950 flex items-center justify-center text-[10px] font-black text-neutral-450 hover:bg-neutral-850 active:translate-y-0.5 shadow-[0_2px_4px_rgba(0,0,0,0.5)] cursor-pointer"
        >X</button>
        
        <!-- Y Button (Left) -->
        <button 
          onclick={() => { if (isEntered && currentOption === 'tetris') { gameControl = 'left'; } else { backToMenu(); } }}
          class="absolute left-0 h-6.5 w-6.5 rounded-full bg-neutral-900 border border-neutral-950 flex items-center justify-center text-[10px] font-black text-neutral-450 hover:bg-neutral-850 active:translate-y-0.5 shadow-[0_2px_4px_rgba(0,0,0,0.5)] cursor-pointer"
        >Y</button>
        
        <!-- A Button (Right - Enter) -->
        <button 
          onclick={() => { if (isEntered && currentOption === 'tetris') { gameControl = 'harddrop'; } else { enterOption(); } }}
          class="absolute right-0 h-6.5 w-6.5 rounded-full bg-neutral-900 border border-neutral-950 flex items-center justify-center text-[10px] font-black text-emerald-450 hover:bg-neutral-850 active:translate-y-0.5 shadow-[0_2px_4px_rgba(0,0,0,0.5)] cursor-pointer"
        >A</button>
        
        <!-- B Button (Bottom - Back) -->
        <button 
          onclick={() => { if (isEntered && currentOption === 'tetris') { gameControl = 'drop'; } else { backToMenu(); } }}
          class="absolute bottom-0 h-6.5 w-6.5 rounded-full bg-neutral-900 border border-neutral-950 flex items-center justify-center text-[10px] font-black text-pink-450 hover:bg-neutral-850 active:translate-y-0.5 shadow-[0_2px_4px_rgba(0,0,0,0.5)] cursor-pointer"
        >B</button>
      </div>

      <!-- Right Analog Stick (Deep glossy 3D socket) -->
      <div class="relative w-12 h-12 rounded-full bg-neutral-950 border border-neutral-900 flex items-center justify-center shadow-[inset_0_2px_6px_rgba(0,0,0,0.8)] z-30">
        <div class="w-10 h-10 rounded-full bg-gradient-to-b from-neutral-700 via-neutral-800 to-neutral-900 shadow-lg border border-neutral-950 flex items-center justify-center">
          <div class="w-7 h-7 rounded-full bg-neutral-950 border border-neutral-900 shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)]"></div>
        </div>
      </div>

      <!-- Home Button -->
      <button 
        onclick={backToMenu}
        aria-label="Home button"
        title="Volver al menú de inicio"
        class="h-7 w-7 rounded-full bg-neutral-900 border border-neutral-950 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),_0_2px_4px_rgba(0,0,0,0.5)] flex items-center justify-center active:scale-95 hover:bg-neutral-855 transition-all duration-100 cursor-pointer z-30"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3.5 h-3.5 text-neutral-600">
          <path d="M11.47 3.821a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 1-1.06 1.06l-.22-.22V21a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1-.75-.75v-5.25H11.25V21a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 5.25 21V13.38l-.22.22a.75.75 0 0 1-1.06-1.06l8.69-8.69Z" />
        </svg>
      </button>

    </div>

  </div>

</div>

<style>
  /* Power off CRT squeeze animation */
  .screen-off-crt {
    animation: crt-off 0.38s cubic-bezier(0.19, 1, 0.22, 1) forwards;
  }
  
  @keyframes crt-off {
    0% {
      transform: scale(1, 1);
      filter: brightness(1) contrast(1);
      opacity: 1;
    }
    50% {
      transform: scale(1, 0.02);
      filter: brightness(2.5) contrast(1.2);
      opacity: 0.95;
    }
    100% {
      transform: scale(0, 0);
      filter: brightness(8) contrast(1.5);
      opacity: 0;
    }
  }
</style>
