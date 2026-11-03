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

  'preview.note': 'Fase 1 · vista de prueba del sistema visual',
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

  'preview.note': 'Phase 1 · visual system preview',
}

export const dictionaries = { es, en }
export type Lang = keyof typeof dictionaries
