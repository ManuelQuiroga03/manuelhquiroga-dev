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
    title: "Desarrollador .NET / Full Stack (.NET Core, Angular & SQL Server)",
    avatarUrl: "/avatar.jpg",
    bio: "Especialista en desarrollo backend con C#, gestión de bases de datos SQL y facturación electrónica (CFDI 4.0 / SAP Business One).",
    summary: "Ingeniero en Informática Titulado con más de 4 años de experiencia profesional en el desarrollo, integración y mantenimiento de aplicaciones web. Especializado en el desarrollo de servicios y APIs backend utilizando C# y .NET Core, construcción de componentes e interfaces frontend con Angular, JavaScript, HTML5 y CSS3, e implementación de lógica de negocio integrando la capa cliente, servidor y bases de datos relacionales en Microsoft SQL Server (consultas, procedimientos almacenados y objetos de BD). Experiencia en atención a incidencias en producción y mantenimiento evolutivo/correctivo de software bajo metodologías ágiles.",
    location: "Puebla, México",
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
      title: "Desarrollo Backend & Web APIs",
      description: "Construcción de arquitecturas escalables y robustas en C# y .NET Core con consumo y emisión de servicios REST y SOAP de alto rendimiento.",
      highlights: [".NET Core / C#", "APIs REST & SOAP", "Arquitectura Limpia"]
    },
    {
      id: "val-2",
      icon: "database",
      title: "Optimización & Tuning SQL Server",
      description: "Diseño relacional, creación de procedimientos almacenados avanzados, funciones y tuning de consultas de alto volumen.",
      highlights: ["Stored Procedures", "Query Tuning", "Modelado Relacional"]
    },
    {
      id: "val-3",
      icon: "integration",
      title: "Mantenimiento & Integración ERP",
      description: "Conexión e integración de aplicaciones web con ERPs (SAP Business One) y soporte a incidentes Nivel 2 y 3.",
      highlights: ["SAP Business One", "Integración de Sistemas", "Soporte Nivel 2/3"]
    }
  ],
  experience: [
    {
      id: "exp-1",
      company: "Ximplify",
      role: "Desarrollador .NET / Experto en Producto",
      period: "Marzo 2024 – Julio 2026",
      location: "México",
      description: [
        "Desarrollo y mantenimiento evolutivo/correctivo de aplicaciones web y servicios backend en C# y .NET Core.",
        "Diseño y construcción de servicios y APIs RESTful para la integración de componentes frontend con bases de datos relacionales y plataformas empresariales (SAP Business One).",
        "Atención, diagnóstico y corrección de incidencias (bugs) de software Nivel 2 en entornos productivos transaccionales.",
        "Elaboración de consultas avanzadas, objetos de base de datos y procedimientos almacenados en SQL Server para asegurar rendimiento.",
        "Pruebas de integración con Postman y control de versiones con Git/GitHub bajo metodología ágil Scrum."
      ],
      technologies: ["C#", ".NET Core", "APIs REST", "Servicios SOAP", "SAP Business One", "SQL Server", "Postman", "Git / GitHub", "Scrum"]
    },
    {
      id: "exp-2",
      company: "Ximplify",
      role: "Desarrollador .NET Jr",
      period: "Abril 2022 – Febrero 2024",
      location: "México",
      description: [
        "Desarrollo e integración Full Stack conectando interfaces frontend en Angular (JavaScript, HTML5, CSS3) con lógicas de negocio en C# y .NET.",
        "Construcción de objetos de base de datos, vistas y queries en SQL Server para el soporte operativo de los sistemas web.",
        "Ejecución de mantenimiento correctivo y aplicación de principios Clean Code y SOLID."
      ],
      technologies: ["Angular", "JavaScript", "HTML5", "CSS3", "C#", ".NET", "SQL Server", "Clean Code", "SOLID"]
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
      category: "Back-End (.NET & C#)",
      skills: [
        { name: "C#", level: "Advanced" },
        { name: ".NET Core / .NET 6+", level: "Advanced" },
        { name: "ASP.NET Web API", level: "Advanced" },
        { name: "APIs RESTful / SOAP", level: "Advanced" }
      ]
    },
    {
      category: "Front-End (Web & UI)",
      skills: [
        { name: "Angular", level: "Intermediate" },
        { name: "TypeScript / JavaScript", level: "Intermediate" },
        { name: "HTML5 / CSS3 / Bootstrap", level: "Advanced" }
      ]
    },
    {
      category: "Bases de Datos (SQL Server)",
      skills: [
        { name: "Microsoft SQL Server", level: "Advanced" },
        { name: "Consultas Complejas / Tuning", level: "Advanced" },
        { name: "Procedimientos Almacenados (SPs)", level: "Advanced" }
      ]
    },
    {
      category: "Herramientas y Metodologías",
      skills: [
        { name: "Visual Studio / VS Code", level: "Advanced" },
        { name: "Git / GitHub / Postman", level: "Advanced" },
        { name: "Clean Code / SOLID / Scrum", level: "Advanced" }
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
