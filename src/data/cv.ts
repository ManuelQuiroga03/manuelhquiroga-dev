export interface Profile {
  name: string;
  title: string;
  avatarUrl: string;
  bio: string;
  summary: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  website?: string;
  pdfUrl?: string;
}

export interface Job {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
  technologies: string[];
  achievements?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  image?: string;
}

export interface SkillCategory {
  category: string;
  skills: { name: string; level: 'Expert' | 'Advanced' | 'Intermediate' }[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
}

export interface Language {
  id: string;
  language: string;
  level: string;
}

export interface Course {
  id: string;
  title: string;
  institution: string;
  period: string;
  certificateUrl?: string;
}

export interface ValueService {
  id: string;
  title: string;
  description: string;
  icon: 'backend' | 'database' | 'integration';
  highlights: string[];
}

export interface CVData {
  profile: Profile;
  valueServices: ValueService[];
  experience: Job[];
  projects: Project[];
  skills: SkillCategory[];
  education: Education[];
  languages: Language[];
  courses: Course[];
}

export const cvData: CVData = {
  profile: {
    name: "Manuel Hernández Quiroga",
    title: "Desarrollador Full Stack .NET (.NET Core 6/8 / C# / Angular / React / SQL Server)",
    avatarUrl: "/avatar.jpg",
    bio: "Especialista en desarrollo Full Stack .NET con C#, Web APIs RESTful, Entity Framework Core, Angular, React y bases de datos SQL Server.",
    summary: "Ingeniero en Informática Titulado con más de 4 años de experiencia profesional en el diseño, desarrollo e implementación de soluciones web empresariales escalables y de alto impacto. Especializado en el ciclo de vida completo de software (SDLC) con C#, .NET Core (.NET 6, 7 y 8), ASP.NET Core, Web API RESTful y Entity Framework Core; desarrollo frontend moderno y responsivo con Angular (versiones 10 a 16), React, TypeScript, JavaScript (ES6+), HTML5 y CSS3; y administración avanzada de bases de datos relacionales en Microsoft SQL Server mediante modelado, procedimientos almacenados y optimización de rendimiento. Sólido dominio de patrones de diseño orientados a objetos (SOLID, Inyección de Dependencias), pruebas unitarias y trabajo colaborativo bajo marco ágil Scrum.",
    location: "Zacatlán, Puebla, México",
    phone: "55 7353 9962",
    email: "quirogamanuel21@gmail.com",
    github: "https://github.com/ManuelQuiroga03",
    linkedin: "https://www.linkedin.com/in/manuelhquiroga",
    website: "https://manuelhquiroga-dev.vercel.app/",
    pdfUrl: undefined // Configurar liga de Dropbox/Drive aquí en el futuro (ej. "https://dl.dropboxusercontent.com/s/...")
  },
  valueServices: [
    {
      id: "val-1",
      icon: "backend",
      title: "Desarrollo Backend & Web APIs (.NET)",
      description: "Construcción de arquitecturas escalables y robustas en C#, .NET Core (.NET 6/8) y ASP.NET Core con Web APIs RESTful y Entity Framework Core para plataformas de alta concurrencia.",
      highlights: [".NET Core 6/8 / C#", "APIs RESTful", "Clean Code & SOLID"]
    },
    {
      id: "val-2",
      icon: "database",
      title: "Optimización & Tuning SQL Server",
      description: "Modelado relacional, desarrollo y refactorización de Stored Procedures complejos, análisis de planes de ejecución y query tuning para rendimiento crítico.",
      highlights: ["Stored Procedures", "Query Tuning & Índices", "Modelado Relacional"]
    },
    {
      id: "val-3",
      icon: "integration",
      title: "Frontend Moderno & Soporte Técnico",
      description: "Interfaces de usuario modulares y responsivas con Angular (10 a 16), React y TypeScript, junto a integración de servicios y soporte Nivel 2/3 en facturación CFDI 4.0.",
      highlights: ["Angular 16 & React", "TypeScript", "CFDI 4.0 / Soporte Nivel 2/3"]
    }
  ],
  experience: [
    {
      id: "exp-1",
      company: "Ximplify",
      role: "Desarrollador Full Stack .NET",
      period: "Marzo 2024 – Julio 2026",
      location: "México",
      description: [
        "Participó en todo el ciclo de vida de desarrollo de aplicaciones empresariales, desde el análisis técnico y diseño hasta la implementación y mantenimiento en producción.",
        "Diseñó y construyó APIs REST y servicios backend robustos utilizando C#, .NET Core (.NET 6/8) y Entity Framework Core para plataformas de alta concurrencia.",
        "Desarrolló interfaces responsivas y modulares de alto rendimiento para el usuario final con Angular 16, React, TypeScript, HTML5 y CSS3.",
        "Optimizó el rendimiento de aplicaciones y bases de datos en Microsoft SQL Server mediante análisis de planes de ejecución, refactorización de Stored Procedures y tuning de consultas complejas.",
        "Implementó pruebas unitarias y buenas prácticas de desarrollo de software para asegurar la estabilidad, escalabilidad y calidad del código.",
        "Colaboró activamente en equipos multidisciplinarios bajo marco de trabajo Scrum y gestión de versiones con Git.",
        "Brindó asistencia de soporte nivel 2 y 3 a clientes directos en temas de timbrado y facturación (CFDI 4.0)."
      ],
      technologies: ["C#", ".NET Core 6/8", "Entity Framework Core", "Angular 16", "React", "TypeScript", "SQL Server", "APIs REST", "xUnit / NUnit", "Git", "Scrum", "CFDI 4.0"]
    },
    {
      id: "exp-2",
      company: "Ximplify",
      role: "Desarrollador Web .NET Jr",
      period: "Abril 2022 – Febrero 2024",
      location: "México",
      description: [
        "Desarrolló y mantuvo aplicaciones web empresariales utilizando C#, .NET Framework, ASP.NET MVC, JavaScript, HTML5 y CSS3.",
        "Creó consultas SQL relacionales, tablas, vistas y procedimientos almacenados en SQL Server para el soporte operativo de negocio.",
        "Consumió e integró servicios Web API RESTful para el intercambio estructurado de datos entre frontend y backend.",
        "Modeló prototipos para aplicaciones con Power Apps.",
        "Participó en el desarrollo de portales web con Svelte, HTML, CSS y .NET."
      ],
      technologies: ["C#", ".NET Framework", "ASP.NET MVC", "JavaScript", "HTML5", "CSS3", "SQL Server", "Web API REST", "Power Apps", "Svelte"]
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "Facturación CFDI 4.0 & Timbrado Core",
      description: "Desarrollo y optimización de componentes backend en C# integrados con APIs de PACs para la emisión, timbrado y cancelación automatizada de facturas electrónicas conformes a la normativa CFDI 4.0 del SAT.",
      technologies: ["C#", ".NET Core", "SQL Server", "SAP Business One", "APIs REST", "XSLT", "Postman", "Visual Studio"],
      githubUrl: undefined,
      liveUrl: undefined,
      featured: true
    },
    {
      id: "proj-2",
      title: "FacturaPDF - Procesador Batch & Visor CFDI 4.0",
      description: "Aplicación nativa para la conversión masiva paralela de XML CFDI a PDF personalizable. Monitorea directorios en segundo plano, aplica plantillas XSLT dinámicas e incluye un visor y editor integrado.",
      technologies: ["C#", ".NET Core", "MAUI", "XSLT", "XML", "CFDI 4.0", "Visual Studio"],
      githubUrl: "https://github.com/ManuelQuiroga03/facturapdf",
      liveUrl: undefined,
      featured: false
    },
    {
      id: "proj-5",
      title: "SmartRAG Enterprise AI",
      description: "Sistema de IA Privada y RAG autónomo con arquitectura de autocorregibilidad mediante LangGraph. Indexa y consulta documentos confidenciales on-premise ejecutando modelos LLM locales sin nube.",
      technologies: ["React.js", "TypeScript", "Python", "FastAPI", "LangGraph", "ChromaDB", "Tauri", "VS Code", "Google Gemini", "ChatGPT", "Antigravity IDE"],
      githubUrl: "https://github.com/ManuelQuiroga03/smartRAGAI.git",
      liveUrl: undefined,
      featured: true
    },
    {
      id: "proj-3",
      title: "XML CFDI 4.0 Mock Generator",
      description: "Suite local en navegador para la generación masiva de XMLs fiscales CFDI 4.0 simulando complementos como Carta Porte, Nómina y REP con Timbre Fiscal Digital para pipelines de QA.",
      technologies: ["TypeScript", "Vite", "HTML5", "CSS3", "CFDI 4.0", "VS Code", "Vercel"],
      githubUrl: "https://github.com/ManuelQuiroga03/xmlmockgenerator",
      liveUrl: "https://xmlmockgenerator.vercel.app/",
      featured: true
    },
    {
      id: "proj-4",
      title: "Xamai MPX 2.0",
      description: "Plataforma empresarial para la visualización de KPIs de negocio y reportes financieros. Participación en el desarrollo del frontend responsivo y modular con JavaScript y Angular.",
      technologies: ["JavaScript", "Angular", "HTML5", "CSS3", "Git", "Figma", "SAP Business One"],
      githubUrl: undefined,
      liveUrl: undefined,
      featured: false
    },
    {
      id: "proj-8",
      title: "MetrikGym - Progressive Overload PWA",
      description: "Aplicación Web Progresiva (PWA) de alto rendimiento para atletas y registro de sobrecarga progresiva en gimnasio, diseñada como alternativa competitiva a apps nativas de tiendas como Hevy. Cuenta con arquitectura offline-first en React 18 + Vite (Service Worker, IndexedDB, Web Audio y Web Notifications), backend en ASP.NET Core (.NET 10 Web API con Clean Architecture, JWT y BCrypt), base de datos relacional PostgreSQL alojada en Supabase y contenedorización con Docker.",
      technologies: ["React.js", "TypeScript", ".NET Core", "C#", "PostgreSQL", "Supabase", "Tailwind CSS", "Docker", "APIs REST", "Vite", "Vercel", "PWA"],
      githubUrl: "https://github.com/ManuelQuiroga03/metrikGym.git",
      liveUrl: "https://metrik-gym.vercel.app/",
      featured: true
    },
    {
      id: "proj-7",
      title: "Coccinella Dental Studio",
      description: "Landing page médica moderna y de alta conversión para clínica odontológica en Zacatlán, Puebla. Desarrollada con enfoque mobile-first responsivo, optimización SEO local avanzada con metadatos estructurados Schema.org (JSON-LD Dentist), Open Graph para redes sociales, catálogo interactivo de tratamientos y canal directo de agendamiento vía WhatsApp.",
      technologies: ["React.js", "TypeScript", "Tailwind CSS", "Vite", "HTML5", "CSS3", "Vercel", "Figma"],
      githubUrl: "https://github.com/ManuelQuiroga03/dentalLab.git",
      liveUrl: "https://dental-lab-five.vercel.app/",
      featured: true
    },
    {
      id: "proj-6",
      title: "DevKeep",
      description: "Plataforma web para organizar notas de aprendizaje y biblioteca interactiva de comandos CLI (.NET, Docker, Git) con copia en 1-clic y buscador global instantáneo Ctrl+K.",
      technologies: ["React.js", "Next.js", "Svelte", "TypeScript", ".NET Core", "C#", "PostgreSQL", "Supabase", "Tailwind CSS", "Docker", "Podman", "GitHub", "Vercel", "Postman"],
      githubUrl: "https://github.com/ManuelQuiroga03/devKeep.git",
      liveUrl: "https://dev-keep-hazel.vercel.app/courses/9de76f51-3177-41e6-b702-d3b5e26e42fc",
      featured: false
    }
  ],
  skills: [
    {
      category: "Desarrollo Backend & .NET",
      skills: [
        { name: "C# / .NET Core (.NET 6, 7 y 8)", level: "Advanced" },
        { name: "ASP.NET Core / Web API RESTful", level: "Advanced" },
        { name: "Entity Framework Core & LINQ", level: "Advanced" },
        { name: "Arquitectura Limpia, SOLID & DI", level: "Advanced" }
      ]
    },
    {
      category: "Desarrollo Frontend Moderno",
      skills: [
        { name: "Angular (versiones 10 a 16)", level: "Advanced" },
        { name: "React & TypeScript", level: "Intermediate" },
        { name: "JavaScript (ES6+) / Svelte", level: "Advanced" },
        { name: "HTML5 / CSS3 / Tailwind CSS", level: "Advanced" }
      ]
    },
    {
      category: "Bases de Datos & SQL Server",
      skills: [
        { name: "Microsoft SQL Server", level: "Advanced" },
        { name: "Modelado Relacional de Datos", level: "Advanced" },
        { name: "Stored Procedures, Vistas & Funciones", level: "Advanced" },
        { name: "Query Tuning & Planes de Ejecución", level: "Advanced" }
      ]
    },
    {
      category: "Calidad & Control de Versiones",
      skills: [
        { name: "Pruebas Unitarias (xUnit / NUnit)", level: "Advanced" },
        { name: "Git / GitHub / Flujos de Ramas", level: "Advanced" },
        { name: "Postman / Pruebas de APIs", level: "Advanced" },
        { name: "Metodologías Ágiles (Scrum / Kanban)", level: "Advanced" }
      ]
    }
  ],
  education: [
    {
      id: "edu-1",
      degree: "Ingeniería en Informática (Titulado)",
      institution: "Instituto Tecnológico Superior de la Sierra Norte de Puebla",
      period: "2016 – 2021"
    }
  ],
  languages: [
    {
      id: "lang-1",
      language: "Español",
      level: "Nativo"
    },
    {
      id: "lang-2",
      language: "Inglés",
      level: "Nivel A2"
    }
  ],
  courses: [
    {
      id: "course-1",
      title: "SQL Server: Programación Avanzada 2026 [OFICIAL]",
      institution: "Udemy (Instructor: Mariano Puglisi)",
      period: "2023",
      certificateUrl: "https://www.udemy.com/certificate/UC-75bb8c22-d2bb-48ba-a367-ddb0081d0be6/"
    },
    {
      id: "course-2",
      title: "SAP BUSINESS ONE 2026: Cero a Experto",
      institution: "Udemy (Instructor: David Moncada)",
      period: "2025",
      certificateUrl: "https://www.udemy.com/certificate/UC-ee66834a-4c68-4b53-a78f-36898da75e88/"
    },
    {
      id: "course-3",
      title: "Curso de .NET MAUI con Visual Studio 2022 creando PROYECTOS",
      institution: "Udemy (Instructor: Héctor Uriel Pérez)",
      period: "2022",
      certificateUrl: "https://www.udemy.com/certificate/UC-331582bc-db0e-4cee-8665-f0c89e73c936/"
    },
    {
      id: "course-4",
      title: "Construyendo Minimal APIs con ASP.NET Core 9 y EF Core",
      institution: "Udemy (Instructor: Felipe Gavilán)",
      period: "2025",
      certificateUrl: "https://www.udemy.com/certificate/UC-fbe354d1-a4bb-4c73-9483-a85f6cfa0604/"
    },
    {
      id: "course-5",
      title: "Patrones de diseño y principios SOLID en C# .NET",
      institution: "Udemy (Instructor: Rodrigo Morales)",
      period: "2023",
      certificateUrl: "https://www.udemy.com/certificate/UC-8b8d694f-77dc-49af-bf05-c4a8ffc4d9f2/"
    },
    {
      id: "course-6",
      title: "Hands-On Machine Learning for .NET Developers",
      institution: "Udemy (Packt Publishing)",
      period: "2023",
      certificateUrl: "https://www.udemy.com/certificate/UC-54fb33f6-a07d-4702-8d87-b784136337ed/"
    }
  ]
};
