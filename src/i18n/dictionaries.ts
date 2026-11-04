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

  'palette.open': 'Abrir paleta de comandos',
  'palette.title': 'Paleta de comandos',
  'palette.placeholder': 'Busca una sección o acción…',
  'palette.empty': 'Sin resultados',
  'palette.sections': 'Secciones',
  'palette.actions': 'Acciones',
  'palette.links': 'Enlaces',
  'palette.hint': '↑↓ moverte · Enter abrir · Esc cerrar',
  'action.chat': 'Preguntarle al asistente',
  'action.whatsapp': 'Escribir por WhatsApp',
  'action.email': 'Copiar email',
  'action.copied': 'Email copiado',
  'nav.method': 'Método',
  'edits.sync': 'Sincronizado al beat',
  'edits.cut': 'Corte',
  'meta.description': 'Desarrollador de automatización e IA en Valencia. Fundador de Ponent Labs. Diseño flujos con n8n, integro LLMs y despliego sistemas en producción.',
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

  'palette.open': 'Open command palette',
  'palette.title': 'Command palette',
  'palette.placeholder': 'Search a section or action…',
  'palette.empty': 'No results',
  'palette.sections': 'Sections',
  'palette.actions': 'Actions',
  'palette.links': 'Links',
  'palette.hint': '↑↓ move · Enter open · Esc close',
  'action.chat': 'Ask the assistant',
  'action.whatsapp': 'Message on WhatsApp',
  'action.email': 'Copy email',
  'action.copied': 'Email copied',
  'nav.method': 'Method',
  'edits.sync': 'Synced to the beat',
  'edits.cut': 'Cut',
  'meta.description': 'Automation & AI developer in Valencia, Spain. Founder of Ponent Labs. I design n8n workflows, integrate LLMs and ship systems to production.',
}

export const dictionaries = { es, en }
export type Lang = keyof typeof dictionaries
