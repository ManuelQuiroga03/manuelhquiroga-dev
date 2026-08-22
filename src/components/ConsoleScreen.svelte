<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { cvData } from '../data/cv';

  let { 
    selectedIndex = 0, 
    isEntered = $bindable(false), 
    currentOption = 'portfolio',
    systemBooted = $bindable(false),
    gameControl = $bindable(null),
    onViewClassic = () => {}
  } = $props<{
    selectedIndex: number;
    isEntered: boolean;
    currentOption: string;
    systemBooted: boolean;
    gameControl: string | null;
    onViewClassic: () => void;
  }>();

  const { profile, education, languages } = cvData;

  const menuOptions = [
    { id: 'portfolio', label: '1. VER_PORTAFOLIO (CV Web)', desc: 'Explorar currículum completo en formato clásico.' },
    { id: 'pdf', label: '2. ABRIR_CV_PDF (Descarga)', desc: 'Abrir hoja de vida digital en PDF (pestaña nueva).' },
    { id: 'tetris', label: '3. JUGAR_TETRIS (Arcade)', desc: 'Jugar una partida rápida de Tetris en el Switch.' },
    { id: 'hobbies', label: '4. HOBBIES_Y_AFICIONES (Sobre Mí)', desc: 'Descubrir mis pasiones personales y aficiones.' }
  ];

  // ----------------------------------------
  // 1. SYSTEM BOOT LOADER LOGIC
  // ----------------------------------------
  let loadingProgress = $state(0);
  let loadingText = $state("Inicializando núcleos...");

  onMount(() => {
    if (!systemBooted) {
      const interval = setInterval(() => {
        loadingProgress += 4;
        if (loadingProgress === 20) loadingText = "Cargando módulos SAT CFDI 4.0...";
        if (loadingProgress === 48) loadingText = "Enlazando bases de datos SQL Server...";
        if (loadingProgress === 76) loadingText = "Conectando SDK de SAP Business One...";
        if (loadingProgress === 92) loadingText = "Preparando render de Kirby...";
        if (loadingProgress >= 100) {
          loadingProgress = 100;
          clearInterval(interval);
          setTimeout(() => {
            systemBooted = true;
          }, 400);
        }
      }, 70);
    }
  });

  // ----------------------------------------
  // 2. TETRIS ENGINE LOGIC
  // ----------------------------------------
  const COLS = 10;
  const ROWS = 18;
  let tetrisGrid = $state(Array(ROWS).fill(null).map(() => Array(COLS).fill(0)));
  let tetrisScore = $state(0);
  let tetrisLines = $state(0);
  let tetrisGameOver = $state(false);
  let tetrisGameStarted = $state(false);
  let tetrisInterval: any = null;

  const SHAPES = {
    I: [[1, 1, 1, 1]],
    J: [[1, 0, 0], [1, 1, 1]],
    L: [[0, 0, 1], [1, 1, 1]],
    O: [[1, 1], [1, 1]],
    S: [[0, 1, 1], [1, 1, 0]],
    T: [[0, 1, 0], [1, 1, 1]],
    Z: [[1, 1, 0], [0, 1, 1]]
  };

  const SHAPE_NAMES = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'] as const;

  const COLORS = {
    I: 'bg-cyan-500 border-cyan-400 shadow-cyan-500/20',
    J: 'bg-blue-600 border-blue-500 shadow-blue-600/20',
    L: 'bg-orange-500 border-orange-400 shadow-orange-500/20',
    O: 'bg-yellow-500 border-yellow-400 shadow-yellow-500/20',
    S: 'bg-green-500 border-green-400 shadow-green-500/20',
    T: 'bg-purple-500 border-purple-400 shadow-purple-500/20',
    Z: 'bg-red-600 border-red-500 shadow-red-600/20'
  };

  interface Piece {
    shape: number[][];
    color: string;
    x: number;
    y: number;
  }

  let currentPiece = $state<Piece | null>(null);

  function startTetris() {
    tetrisGrid = Array(ROWS).fill(null).map(() => Array(COLS).fill(0));
    tetrisScore = 0;
    tetrisLines = 0;
    tetrisGameOver = false;
    tetrisGameStarted = true;
    spawnPiece();
    if (tetrisInterval) clearInterval(tetrisInterval);
    tetrisInterval = setInterval(gameTick, 800);
  }

  function spawnPiece() {
    const name = SHAPE_NAMES[Math.floor(Math.random() * SHAPE_NAMES.length)];
    const shape = SHAPES[name];
    const color = COLORS[name];
    currentPiece = {
      shape,
      color,
      x: Math.floor((COLS - shape[0].length) / 2),
      y: 0
    };
    if (checkCollision(currentPiece.x, currentPiece.y, currentPiece.shape)) {
      tetrisGameOver = true;
      tetrisGameStarted = false;
      if (tetrisInterval) clearInterval(tetrisInterval);
    }
  }

  function checkCollision(ax: number, ay: number, shape: number[][]): boolean {
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c]) {
          const nextX = ax + c;
          const nextY = ay + r;
          if (nextX < 0 || nextX >= COLS || nextY >= ROWS) return true;
          if (nextY >= 0 && tetrisGrid[nextY][nextX]) return true;
        }
      }
    }
    return false;
  }

  function mergePiece() {
    if (!currentPiece) return;
    const { shape, color, x, y } = currentPiece;
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c]) {
          const gridY = y + r;
          if (gridY >= 0) {
            tetrisGrid[gridY][x + c] = color;
          }
        }
      }
    }
  }

  function clearLines() {
    let cleared = 0;
    for (let r = ROWS - 1; r >= 0; r--) {
      if (tetrisGrid[r].every(cell => cell !== 0)) {
        tetrisGrid.splice(r, 1);
        tetrisGrid.unshift(Array(COLS).fill(0));
        cleared++;
        r++; // Check same row index again as rows fall down
      }
    }
    if (cleared > 0) {
      tetrisLines += cleared;
      const points = [0, 100, 300, 600, 1200];
      tetrisScore += points[cleared] || 1200;
    }
  }

  function gameTick() {
    if (tetrisGameOver) return;
    if (!currentPiece) return;
    if (!checkCollision(currentPiece.x, currentPiece.y + 1, currentPiece.shape)) {
      currentPiece.y++;
    } else {
      mergePiece();
      clearLines();
      spawnPiece();
    }
  }

  // React to virtual Joy-Con inputs mapped via gameControl bindable prop
  $effect(() => {
    if (gameControl && tetrisGameStarted && !tetrisGameOver) {
      const cmd = gameControl;
      gameControl = null; // Clear immediate command
      
      if (!currentPiece) return;

      if (cmd === 'left') {
        if (!checkCollision(currentPiece.x - 1, currentPiece.y, currentPiece.shape)) {
          currentPiece.x--;
        }
      } else if (cmd === 'right') {
        if (!checkCollision(currentPiece.x + 1, currentPiece.y, currentPiece.shape)) {
          currentPiece.x++;
        }
      } else if (cmd === 'rotate') {
        // Rotate shape matrix clockwise
        const oldShape = currentPiece.shape;
        const newShape = Array(oldShape[0].length).fill(null).map((_, c) => 
          Array(oldShape.length).fill(0).map((_, r) => oldShape[oldShape.length - 1 - r][c])
        );
        if (!checkCollision(currentPiece.x, currentPiece.y, newShape)) {
          currentPiece.shape = newShape;
        }
      } else if (cmd === 'drop') {
        if (!checkCollision(currentPiece.x, currentPiece.y + 1, currentPiece.shape)) {
          currentPiece.y++;
        }
      } else if (cmd === 'harddrop') {
        while (!checkCollision(currentPiece.x, currentPiece.y + 1, currentPiece.shape)) {
          currentPiece.y++;
        }
        mergePiece();
        clearLines();
        spawnPiece();
      }
    } else if (gameControl && !tetrisGameStarted && tetrisGameOver) {
      if (gameControl === 'rotate' || gameControl === 'harddrop') {
        gameControl = null;
        startTetris();
      }
    }
  });

  onDestroy(() => {
    if (tetrisInterval) clearInterval(tetrisInterval);
  });

  // ----------------------------------------
  // 3. DIALOGUE BUBBLE MESSAGES
  // ----------------------------------------
  let dialogMessage = $derived.by(() => {
    if (!systemBooted) return "Cargando componentes del Switch OS...";
    if (!isEntered) {
      switch (selectedIndex) {
        case 0: return "¡Hola! Selecciona esta opción para ver mi portafolio completo con mis habilidades y mi experiencia detallada.";
        case 1: return "¡Abre mi CV en PDF! Se abrirá en una nueva pestaña listo para descargar o imprimir.";
        case 2: return "¡Hora de un descanso! Selecciona este módulo para jugar una partida rápida al Tetris en la consola.";
        case 3: return "¡Conóceme un poco más! Aquí detallo mis pasiones personales: anime, videojuegos y música.";
        default: return "Usa la cruceta o el teclado (Flechas/WASD) para navegar por mi portafolio.";
      }
    } else {
      switch (currentOption) {
        case 'hobbies': return "¡Me encanta programar escuchando música retro, ver anime de misterio y jugar videojuegos en mi tiempo libre!";
        case 'tetris': 
          if (tetrisGameOver) return "¡Oh no! Game Over. ¡Inténtalo de nuevo presionando la tecla A o Intro!";
          return "¡Controla las piezas con las flechas de tu teclado (Arriba rota, Abajo acelera, Espacio cae rápido) o con el Joy-con virtual!";
        default: return "Cargando sección...";
      }
    }
  });

  $effect(() => {
    if (isEntered && currentOption === 'pdf') {
      isEntered = false; // return to menu instantly
      window.open(cvData.profile.pdfUrl || '/CV_Manuel_Hernandez.pdf', '_blank');
    }
    if (isEntered && currentOption === 'portfolio') {
      isEntered = false; // return to menu
      onViewClassic(); // toggle view mode
    }
    if (isEntered && currentOption === 'tetris' && !tetrisGameStarted && !tetrisGameOver) {
      startTetris();
    }
  });
</script>

<div class="w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 rounded-lg p-5 font-sans text-slate-200 select-none overflow-hidden relative flex flex-col justify-between shadow-inner">
  
  {#if !systemBooted}
    <!-- 1. System Boot Loader UI (Clean 1080p layout) -->
    <div class="flex-grow flex flex-col items-center justify-center space-y-6">
      <!-- Loading logo -->
      <div class="h-14 w-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-indigo-500/20">
        MQ
      </div>
      
      <div class="w-full max-w-xs space-y-2 text-center">
        <div class="text-[10px] uppercase tracking-widest text-slate-500 font-bold animate-pulse">
          {loadingText}
        </div>
        
        <!-- Premium loading bar -->
        <div class="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700/30">
          <div class="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-100" style="width: {loadingProgress}%"></div>
        </div>
        
        <div class="text-[9px] text-slate-600 font-mono">{loadingProgress}%</div>
      </div>
    </div>
  {:else}
    <!-- Top HUD Bar -->
    <div class="flex items-center justify-between border-b border-slate-800/80 pb-2 mb-3 text-[9px] font-bold tracking-wider text-slate-500 uppercase">
      <div class="flex items-center gap-1.5">
        <span class="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
        <span class="text-slate-400">Manuel_Switch_v3.0</span>
      </div>
      <div class="flex items-center gap-2">
        <span>60 FPS</span>
        <span class="text-emerald-500 bg-emerald-950/20 px-1.5 py-0.5 border border-emerald-900/30 rounded text-[8px]">ONLINE</span>
      </div>
    </div>

    <!-- Screen Grid Split -->
    <div class="flex-grow grid grid-cols-1 md:grid-cols-12 gap-5 overflow-hidden items-stretch">
      
      <!-- Left side: Animated Kirby & Dialog -->
      <div class="md:col-span-5 flex flex-col justify-center items-center gap-4 border-r border-slate-800/40 pr-0 md:pr-4">
        
        <!-- Speech dialog bubble -->
        <div class="relative w-full bg-slate-800/80 border border-slate-750 p-3 rounded-2xl text-[9px] leading-relaxed text-slate-300 font-medium shadow-md">
          <p class="h-[52px] overflow-y-auto pr-1 text-left select-text">{dialogMessage}</p>
          <div class="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-slate-800 border-r border-b border-slate-750 rotate-45"></div>
        </div>

        <!-- Kirby SVG vector rendering -->
        <div class="relative flex items-center justify-center p-1 mt-1">
          <div class="absolute bottom-0 w-11 h-2 bg-slate-950/70 rounded-full blur-[2px] animate-kirby-shadow"></div>
          
          <svg viewBox="0 0 120 120" class="w-18 h-18 animate-kirby-float" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="32" cy="100" rx="18" ry="12" transform="rotate(-15 32 100)" fill="#dc2626" stroke="#991b1b" stroke-width="1.8" />
            <ellipse cx="88" cy="100" rx="18" ry="12" transform="rotate(15 88 100)" fill="#dc2626" stroke="#991b1b" stroke-width="1.8" />
            <circle cx="16" cy="65" r="14" fill="#fda4af" stroke="#f43f5e" stroke-width="1.8" />
            <circle cx="104" cy="65" r="14" fill="#fda4af" stroke="#f43f5e" stroke-width="1.8" />
            
            <!-- Main circular pink body -->
            <circle cx="60" cy="60" r="45" fill="#fbcfe8" stroke="#f43f5e" stroke-width="2.2" />
            
            <!-- Eyes -->
            <ellipse cx="48" cy="48" rx="4" ry="11" fill="#0f172a" />
            <ellipse cx="48" cy="42" rx="2.2" ry="5.5" fill="#38bdf8" />
            <circle cx="48" cy="39" r="1.5" fill="#ffffff" />
            
            <ellipse cx="72" cy="48" rx="4" ry="11" fill="#0f172a" />
            <ellipse cx="72" cy="42" rx="2.2" ry="5.5" fill="#38bdf8" />
            <circle cx="72" cy="39" r="1.5" fill="#ffffff" />
            
            <!-- Blush cheeks -->
            <ellipse cx="36" cy="62" rx="7" ry="4" fill="#f43f5e" opacity="0.6" />
            <ellipse cx="84" cy="62" rx="7" ry="4" fill="#f43f5e" opacity="0.6" />
            
            <!-- Happy mouth -->
            <path d="M 52,58 Q 60,68 68,58 Z" fill="#991b1b" stroke="#7f1d1d" stroke-width="1.2" />
            <path d="M 54,63 Q 60,66 66,63 Q 60,60 54,63 Z" fill="#fda4af" />
          </svg>
        </div>
      </div>

      <!-- Right side: Content Screen (Dynamic depending on selection) -->
      <div class="md:col-span-7 flex flex-col justify-center overflow-y-auto pr-0.5 custom-term-scroll">
        {#if !isEntered}
          <!-- 2. Main System Menu Options -->
          <div class="space-y-2.5 my-auto">
            <div class="text-[9px] font-bold tracking-widest text-slate-500 uppercase pb-1.5 border-b border-slate-800">
              Menú Principal
            </div>
            <ul class="space-y-2">
              {#each menuOptions as opt, index}
                {@const isSelected = selectedIndex === index}
                <li>
                  <button
                    class="w-full text-left p-2.5 rounded-xl border transition-all duration-200 flex items-center justify-between cursor-pointer
                      {isSelected 
                        ? 'bg-indigo-600/10 border-indigo-500/80 shadow-md text-white ring-1 ring-indigo-500/20' 
                        : 'bg-slate-800/30 border-slate-800/50 hover:bg-slate-800/50 text-slate-400 hover:text-slate-200'
                      }"
                  >
                    <div class="space-y-0.5">
                      <div class="text-[10px] font-bold {isSelected ? 'text-indigo-400' : 'text-slate-350'}">{opt.label}</div>
                      <div class="text-[8px] {isSelected ? 'text-slate-300' : 'text-slate-500'} font-light">{opt.desc}</div>
                    </div>
                    {#if isSelected}
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3.5 h-3.5 text-indigo-400">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    {/if}
                  </button>
                </li>
              {/each}
            </ul>
          </div>
        {:else}
          <!-- 3. Entered Detail Pages -->
          
          <!-- HOBBIES AND PERSONAL LIFE SCREEN -->
          {#if currentOption === 'hobbies'}
            <div class="space-y-2.5 my-auto">
              <div class="text-[10px] font-bold text-indigo-400 tracking-wider uppercase border-l-2 border-indigo-500 pl-2 mb-1">
                Intereses Personales
              </div>
              <div class="grid grid-cols-2 gap-2 text-[9px]">
                <div class="bg-slate-850/40 p-2 border border-slate-800 rounded-lg space-y-1">
                  <div class="font-bold text-white flex items-center gap-1">🎮 Videojuegos</div>
                  <p class="text-slate-400 leading-normal text-[8px] font-light">Disfruto los juegos de aventuras y simuladores tácticos.</p>
                </div>
                <div class="bg-slate-850/40 p-2 border border-slate-800 rounded-lg space-y-1">
                  <div class="font-bold text-white flex items-center gap-1">📺 Anime / Manga</div>
                  <p class="text-slate-400 leading-normal text-[8px] font-light">Gran aficionado a series de misterio y ciencia ficción.</p>
                </div>
                <div class="bg-slate-850/40 p-2 border border-slate-800 rounded-lg space-y-1">
                  <div class="font-bold text-white flex items-center gap-1">🎵 Música</div>
                  <p class="text-slate-400 leading-normal text-[8px] font-light">Escucho synthwave, lofi y rock alternativo para codificar.</p>
                </div>
                <div class="bg-slate-850/40 p-2 border border-slate-800 rounded-lg space-y-1">
                  <div class="font-bold text-white flex items-center gap-1">🏋️‍♂️ Deportes</div>
                  <p class="text-slate-400 leading-normal text-[8px] font-light">Me mantengo activo siendo runner participando en trails y otras carreras así como entrenamiento en gym.</p>
                </div>
              </div>
            </div>

          <!-- FULLY PLAYABLE RETRO TETRIS ENGINE -->
          {:else}
            {#if currentOption === 'tetris'}
              <div class="flex flex-col items-center justify-center">
                <div class="flex items-stretch gap-4 h-[245px] md:h-[260px] w-full justify-center">
                  <!-- Tetris Board Grid -->
                  <div class="w-[130px] bg-slate-950/80 border border-slate-850 p-1.5 rounded-lg flex flex-col justify-between shadow-md">
                    <div class="grid grid-cols-10 gap-[1px] bg-slate-900 flex-grow h-[220px]">
                      {#each tetrisGrid as row, r}
                        {#each row as cell, c}
                          <!-- Check if cell contains the active falling piece -->
                          {@const isPieceCell = currentPiece && 
                            r >= currentPiece.y && r < currentPiece.y + currentPiece.shape.length &&
                            c >= currentPiece.x && c < currentPiece.x + currentPiece.shape[0].length &&
                            currentPiece.shape[r - currentPiece.y][c - currentPiece.x]}
                          
                          {@const cellColor = isPieceCell ? currentPiece?.color : (cell !== 0 ? cell : 'bg-[#0f172a]/20')}
                          
                          <div class="w-full h-full rounded-[1px] border-[0.5px] border-slate-900/30 {cellColor}"></div>
                        {/each}
                      {/each}
                    </div>
                  </div>

                  <!-- Side Panel (Scores, instructions & game over logic) -->
                  <div class="flex-grow flex flex-col justify-between py-1 text-[9px] font-medium space-y-2">
                    <div class="space-y-1.5 bg-slate-805/30 p-2 rounded-lg border border-slate-800">
                      <div class="text-[8px] text-slate-500 font-bold uppercase tracking-wider">Marcador</div>
                      <div class="text-xs font-bold text-white">{tetrisScore} Puntos</div>
                      <div class="text-[8px] text-indigo-400">{tetrisLines} Líneas</div>
                    </div>

                    {#if !tetrisGameStarted && !tetrisGameOver}
                      <button 
                        onclick={startTetris}
                        class="w-full py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white font-bold tracking-wider active:scale-95 transition-transform text-center cursor-pointer shadow-md text-[9px]"
                      >
                        JUGAR (Pulse A)
                      </button>
                    {:else if tetrisGameOver}
                      <div class="space-y-2 text-center py-2">
                        <div class="text-rose-500 font-extrabold tracking-widest text-[10px] animate-pulse">GAME OVER</div>
                        <button 
                          onclick={startTetris}
                          class="w-full py-1.5 bg-rose-600 hover:bg-rose-500 rounded-lg text-white font-bold cursor-pointer transition-colors active:scale-95 text-[9px]"
                        >
                          REINTENTAR (A)
                        </button>
                      </div>
                    {:else}
                      <div class="text-slate-550 leading-relaxed space-y-1 border border-slate-800 p-2 rounded-lg text-[7.5px] font-light hidden md:block">
                        <div class="font-bold text-slate-400">Controles:</div>
                        <div>• Cruzeta / Teclas: Mover</div>
                        <div>• Botón A / Tecla ▲: Rotar</div>
                        <div>• Botón B / Tecla ▼: Bajar</div>
                        <div>• Tecla Espacio: Caer</div>
                      </div>
                      <div class="text-[8px] text-indigo-400 text-center font-bold animate-pulse md:hidden">
                        ¡Usa controles!
                      </div>
                    {/if}
                  </div>
                </div>

                <!-- Mobile Touch Controls (only visible on mobile viewports) -->
                <div class="md:hidden flex flex-col gap-1.5 mt-2 w-full max-w-[200px] border-t border-slate-800/40 pt-2 z-30">
                  <div class="flex justify-center gap-3">
                    <button 
                      onclick={() => gameControl = 'left'}
                      class="h-9 w-9 bg-slate-800 border border-slate-700 active:bg-slate-700 text-white rounded-lg flex items-center justify-center font-bold text-sm cursor-pointer"
                    >◀</button>
                    <button 
                      onclick={() => gameControl = 'rotate'}
                      class="h-9 w-9 bg-indigo-600 border border-indigo-500 active:bg-indigo-500 text-white rounded-lg flex items-center justify-center font-bold text-sm cursor-pointer"
                    >↻</button>
                    <button 
                      onclick={() => gameControl = 'right'}
                      class="h-9 w-9 bg-slate-800 border border-slate-700 active:bg-slate-700 text-white rounded-lg flex items-center justify-center font-bold text-sm cursor-pointer"
                    >▶</button>
                  </div>
                  <div class="flex justify-center gap-2">
                    <button 
                      onclick={() => gameControl = 'drop'}
                      class="h-7 px-3 bg-slate-800 border border-slate-700 active:bg-slate-700 text-white rounded-lg flex items-center justify-center font-bold text-[9px] cursor-pointer"
                    >Bajar</button>
                    <button 
                      onclick={() => gameControl = 'harddrop'}
                      class="h-7 px-3 bg-purple-650 border border-purple-550 active:bg-purple-550 text-white rounded-lg flex items-center justify-center font-bold text-[9px] cursor-pointer"
                    >Caer</button>
                  </div>
                </div>
              </div>
            {/if}
          {/if}
        {/if}
      </div>

    </div>

    <!-- Bottom HUD Guide -->
    <div class="border-t border-slate-800/80 pt-2 mt-3 flex items-center justify-between text-[9px] font-bold tracking-wider text-slate-500 uppercase">
      {#if !isEntered}
        <span>[▲/▼ D-PAD] Mover</span>
        <span>[A / ENTER] Seleccionar</span>
      {:else}
        <span>[B / ESC] Volver al Menú</span>
        <span>MÓDULO ACTIVO</span>
      {/if}
    </div>
  {/if}

</div>

<style>
  .custom-term-scroll::-webkit-scrollbar {
    width: 4px;
  }
  .custom-term-scroll::-webkit-scrollbar-track {
    background: rgba(99, 102, 241, 0.05);
  }
  .custom-term-scroll::-webkit-scrollbar-thumb {
    background: rgba(99, 102, 241, 0.3);
    border-radius: 9999px;
  }

  @keyframes kirby-float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
  }
  
  .animate-kirby-float {
    animation: kirby-float 2.2s ease-in-out infinite;
  }

  @keyframes shadow-shrink {
    0%, 100% {
      transform: scale(1);
      opacity: 0.6;
    }
    50% {
      transform: scale(0.8);
      opacity: 0.3;
    }
  }

  .animate-kirby-shadow {
    animation: shadow-shrink 2.2s ease-in-out infinite;
  }
</style>
