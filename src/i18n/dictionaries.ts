// Textos fijos de la interfaz (navegación y controles). El contenido de las secciones vive en src/content.
export const es = {
  'nav.label': 'Navegación principal',
  'nav.home': 'Inicio',
  'nav.services': 'Servicios',
  'nav.case': 'Caso de éxito',
  'nav.projects': 'Proyectos',
  'nav.experience': 'Trayectoria',
  'nav.contact': 'Contacto',

  'controls.lang': 'Cambiar a inglés',
  'controls.toLight': 'Cambiar a modo claro',
  'controls.toDark': 'Cambiar a modo oscuro',
  'controls.bg': 'Cambiar fondo',
  'controls.bg.aurora': 'Aurora',
  'controls.bg.photo': 'Foto',
}

export type DictKey = keyof typeof es

export const en: Record<DictKey, string> = {
  'nav.label': 'Main navigation',
  'nav.home': 'Home',
  'nav.services': 'Services',
  'nav.case': 'Case study',
  'nav.projects': 'Projects',
  'nav.experience': 'Experience',
  'nav.contact': 'Contact',

  'controls.lang': 'Switch to Spanish',
  'controls.toLight': 'Switch to light mode',
  'controls.toDark': 'Switch to dark mode',
  'controls.bg': 'Change background',
  'controls.bg.aurora': 'Aurora',
  'controls.bg.photo': 'Photo',
}

export const dictionaries = { es, en }
export type Lang = keyof typeof dictionaries
