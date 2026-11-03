// Forma del contenido de la web. es.ts y en.ts deben cumplirla entera.
export type Metric = { value: number | string; prefix?: string; suffix?: string; label: string }

export type Project = {
  id: 'ponent' | 'umbral' | 'pipeline' | 'edits' | 'panel' | 'propflow'
  badge?: string
  title: string
  body: string
  chips: string[]
  link?: { label: string; href: string }
  credit?: string
}

export type Content = {
  hero: {
    eyebrow: string
    name: string
    headline: string
    body: string
    cta1: string
    cta2: string
    console: { title: string; lines: { kind: 'in' | 'ai' | 'ok'; text: string }[]; note: string }
  }
  kpis: Metric[]
  services: {
    eyebrow: string
    title: string
    subtitle: string
    more: string
    less: string
    items: { title: string; body: string; detail: string; chips: string[] }[]
  }
  caseStudy: {
    eyebrow: string
    title: string
    body: string
    chartTitle: string
    chartNote: string
    chartHint: string
    // Un mes por barra; al pulsarla se muestran sus datos (ilustrativos)
    months: { label: string; orders: number; avg: number; human: number; hours: number; note: string }[]
    detailLabels: { orders: string; avg: string; human: string; hours: string }
    activityTitle: string
    activity: { id: string; text: string; time: string }[]
    metrics: Metric[]
    flow: string[]
  }
  projects: { eyebrow: string; title: string; items: Project[] }
  method: {
    eyebrow: string
    title: string
    body: string
    steps: { title: string; body: string }[]
  }
  stack: { title: string; rows: string[][] }
  experience: {
    eyebrow: string
    title: string
    jobs: { role: string; date: string; body: string; current?: boolean }[]
    educationTitle: string
    education: { title: string; body: string; badge: string }[]
  }
  contact: { title: string; body: string; whatsapp: string; email: string }
  footer: string
  chat: ChatContent
}

// Botón que acompaña a una respuesta del asistente
export type ChatAction =
  | { kind: 'scroll'; target: string; label: string }
  | { kind: 'link'; href: string; label: string }

export type ChatIntent = {
  id: string
  // Frases (con espacio) se buscan tal cual; palabras sueltas, como inicio de palabra ("tecnolog" → "tecnologías")
  keywords: string[]
  answer: string
  action?: ChatAction
}

export type ChatContent = {
  open: string
  title: string
  subtitle: string
  greeting: string
  placeholder: string
  send: string
  close: string
  typing: string
  suggestions: { label: string; intent: string }[]
  intents: ChatIntent[]
  fallback: { answer: string; action: ChatAction }
}
