export const ease = [0.22, 1, 0.36, 1] as const

// Entrada al cargar la página
export const enter = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease },
})

// Entrada al aparecer en pantalla con el scroll
export const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease },
})

// Contenedor común de cada sección (deja sitio al dock lateral en escritorio)
export const sectionClass = 'scroll-mt-24 mx-auto max-w-6xl px-4 lg:pl-24 py-20 md:py-28'
