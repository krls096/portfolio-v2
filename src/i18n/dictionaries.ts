// Textos de la interfaz. Las claves de "es" definen el contrato que "en" debe cumplir.
export const es = {
  'nav.home': 'Inicio',
  'nav.services': 'Servicios',
  'nav.projects': 'Proyectos',
  'nav.experience': 'Trayectoria',
  'nav.contact': 'Contacto',

  'controls.lang': 'Cambiar a inglés',
  'controls.toLight': 'Cambiar a modo claro',
  'controls.toDark': 'Cambiar a modo oscuro',
  'controls.bg': 'Cambiar fondo',
  'controls.bg.aurora': 'Aurora',
  'controls.bg.photo': 'Foto',

  'hero.eyebrow': 'Fundador de Ponent Labs',
  'hero.role': 'Automation & AI Developer',
  'hero.p': 'Diseño sistemas que automatizan procesos, integran inteligencia artificial y eliminan trabajo manual. En producción gestionando +1.800 clientes para una empresa de distribución.',
  'hero.cta1': 'Hablar conmigo',
  'hero.cta2': 'Ver proyectos',

  'kpi.clients': 'Clientes gestionados',
  'kpi.orders': 'Pedidos / mes',
  'kpi.uptime': 'Automatización',

  'nav.label': 'Navegación principal',

  'svc.eyebrow': 'Servicios',
  'svc.title': 'Lo que hago',
  'svc.sub': 'Tres piezas que encajan entre sí: procesos que se ejecutan solos, IA que decide y una infraestructura que no se cae.',
  'svc.auto': 'Automatización',
  'svc.auto.d': 'Workflows que ejecutan procesos completos de principio a fin sin intervención humana.',
  'svc.ai': 'IA y agentes',
  'svc.ai.d': 'LLMs y agentes integrados en el día a día: clasifican, extraen datos y responden.',
  'svc.infra': 'Infraestructura',
  'svc.infra.d': 'Docker, VPS y bases de datos preparadas para producción continua.',

  'prj.eyebrow': 'Proyectos',
  'prj.title': 'Lo que he construido',
  'prj.reel.t': 'Pipeline de vídeo con IA',
  'prj.reel.d': 'Un agente de IA escribe el guion, pone la voz, anima en código y renderiza. Sin cámara ni editor.',
  'prj.umbral.t': 'Panel comercial de Umbral',
  'prj.umbral.d': 'Herramienta interna con cada empresa enriquecida por IA: scoring, guion de llamada, objeciones previstas y análisis de su web.',
  'prj.umbral.private': 'Uso interno',
  'prj.view': 'Ver proyecto',

  'exp.eyebrow': 'Trayectoria',
  'exp.title': 'Experiencia',

  'cta.title': '¿Automatizamos?',
  'cta.p': 'Transformemos horas de trabajo manual en sistemas eficientes e inteligentes.',
  'cta.btn': 'Escríbeme por WhatsApp',

  'preview.note': 'Fase 2 · sistema de componentes glass',
}

export type DictKey = keyof typeof es

export const en: Record<DictKey, string> = {
  'nav.home': 'Home',
  'nav.services': 'Services',
  'nav.projects': 'Projects',
  'nav.experience': 'Experience',
  'nav.contact': 'Contact',

  'controls.lang': 'Switch to Spanish',
  'controls.toLight': 'Switch to light mode',
  'controls.toDark': 'Switch to dark mode',
  'controls.bg': 'Change background',
  'controls.bg.aurora': 'Aurora',
  'controls.bg.photo': 'Photo',

  'hero.eyebrow': 'Founder of Ponent Labs',
  'hero.role': 'Automation & AI Developer',
  'hero.p': 'I design systems that automate processes, integrate artificial intelligence and eliminate manual work. In production managing 1,800+ clients for a distribution company.',
  'hero.cta1': 'Talk to me',
  'hero.cta2': 'See projects',

  'kpi.clients': 'Clients managed',
  'kpi.orders': 'Orders / month',
  'kpi.uptime': 'Automation',

  'nav.label': 'Main navigation',

  'svc.eyebrow': 'Services',
  'svc.title': 'What I do',
  'svc.sub': 'Three pieces that fit together: processes that run themselves, AI that makes decisions and infrastructure that stays up.',
  'svc.auto': 'Automation',
  'svc.auto.d': 'Workflows that run complete processes end to end without human intervention.',
  'svc.ai': 'AI & agents',
  'svc.ai.d': 'LLMs and agents built into daily work: they classify, extract data and reply.',
  'svc.infra': 'Infrastructure',
  'svc.infra.d': 'Docker, VPS and databases ready for continuous production.',

  'prj.eyebrow': 'Projects',
  'prj.title': "What I've built",
  'prj.reel.t': 'AI video pipeline',
  'prj.reel.d': 'An AI agent writes the script, adds the voice, animates in code and renders. No camera, no editor.',
  'prj.umbral.t': 'Umbral sales panel',
  'prj.umbral.d': 'Internal tool where every company is enriched by AI: scoring, call script, expected objections and a review of their website.',
  'prj.umbral.private': 'Internal use',
  'prj.view': 'View project',

  'exp.eyebrow': 'Career',
  'exp.title': 'Experience',

  'cta.title': 'Shall we automate?',
  'cta.p': 'Let’s turn hours of manual work into efficient, intelligent systems.',
  'cta.btn': 'Message me on WhatsApp',

  'preview.note': 'Phase 2 · glass component system',
}

export const dictionaries = { es, en }
export type Lang = keyof typeof dictionaries
