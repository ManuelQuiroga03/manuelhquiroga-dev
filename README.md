# Portafolio Profesional Interactivo 🕹️

Este repositorio contiene el código fuente de mi portafolio profesional e interactivo como desarrollador de software. Diseñado con una experiencia inmersiva que combina una consola retro inspirada en Nintendo Switch y un currículum clásico detallado y elegante.

**URL en Vivo:** [manuelquiroga.dev](https://manuelquiroga.dev)

---

## 🚀 Características Clave

### 1. Consola Retro 3D Interactiva
* **Diseño 3D Realista**: Joy-cons en color gris carbón mate con biseles brillantes, sombreado profundo y rieles interiores neón (azul cian y rojo/naranja).
* **Animación de Ensamblado (Snap)**: Al cargar el sitio, los Joy-cons se deslizan desde los extremos y se acoplan con un efecto sonoro visual contra la pantalla central.
* **Botón Power CRT**: Apagado físico con efecto de contracción de pantalla CRT analógica.
* **Tetris 100% Jugable**: Motor de juego desarrollado nativamente en Svelte 5. Controlable mediante teclado en escritorio (Flechas y Espacio) o con el Joy-con virtual.
* **Gamepad Móvil Táctil**: UI responsiva que se adapta a smartphones acoplando una cruceta D-Pad y botones A/B interactivos debajo de la pantalla digital.

### 2. Portafolio Clásico de Alta Conversión
* **Sección Widescreen**: Layout optimizado para pantallas ultra-anchas (`max-w-[1380px]`) que equilibra el espacio de lectura.
* **Educación e Idiomas**: Organización modular en dos filas para permitir un crecimiento ilimitado de certificados sin desbalancear la rejilla.
* **Carrusel de Logotipos Deslizante**: Un marquee infinito para tecnologías de desarrollo utilizando trazados SVG inline y el CDN de jsDelivr.
* **Scroll Reveal Recurrente**: Animaciones de entrada suaves que se reinician al salir del visor para lograr un dinamismo constante en la navegación.
* **Privacidad**: Filtros de enlace inteligentes para proteger repositorios privados de propiedad intelectual corporativa.
* **Descarga PDF Dinámica**: Configuración centralizada de descarga mediante la propiedad `pdfUrl` en el archivo de datos para admitir integraciones futuras con la nube (Dropbox, Drive) sin requerir redespliegues.

---

## 🛠️ Stack Tecnológico

* **Frontend**: Svelte 5 (Runes y mejoras de reactividad)
* **Estilos**: Tailwind CSS
* **Lenguaje**: TypeScript
* **Compilador**: Vite
* **Validación**: svelte-check
* **Alojamiento sugerido**: Vercel

---

## 💻 Desarrollo Local

Para correr este proyecto en tu computadora localmente, sigue estos pasos:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/ManuelQuiroga03/manuelhquiroga-dev.git
   cd manuelhquiroga-dev
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

4. **Validar tipos y compilar para producción:**
   ```bash
   npm run check
   ```
   Y para empaquetar los archivos de distribución listos para la web:
   ```bash
   npm run build
   ```

---

## 📂 Estructura de Carpetas

```text
├── src/
│   ├── assets/         # Recursos estáticos y logotipos auxiliares
│   ├── components/     # Componentes modulares (Switch, Tetris, Habilidades, Proyectos)
│   │   ├── ConsoleScreen.svelte
│   │   ├── ConsoleView.svelte
│   │   ├── IntroBanner.svelte
│   │   ├── Projects.svelte
│   │   └── ...
│   ├── data/           # Base de datos local (cv.ts)
│   ├── lib/            # Utilidades generales y stores de reactividad
│   ├── App.svelte      # Componente raíz y control de flujo
│   └── main.ts         # Punto de entrada de la aplicación
├── public/             # PDF del currículum, imágenes y favicon
└── vite.config.ts      # Configuración de compilación de Vite
```

---

## 📄 Licencia

Este proyecto es de código abierto. Siéntete libre de adaptarlo o tomar inspiración de la consola interactiva para tu propia presentación profesional.
