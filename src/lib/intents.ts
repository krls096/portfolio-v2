import type { ChatContent, ChatIntent } from '../content/types'

// Minúsculas, sin tildes ni signos: "¿Cuánto cuesta?" → "cuanto cuesta"
export function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9ñ\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

// Clasificador por palabras clave: gana la intención con más coincidencias.
// Las frases puntúan doble porque son más específicas que una palabra suelta.
export function matchIntent(text: string, chat: ChatContent): ChatIntent | null {
  const q = normalize(text)
  if (!q) return null
  const words = q.split(' ')

  let best: ChatIntent | null = null
  let bestScore = 0
  for (const intent of chat.intents) {
    let score = 0
    for (const raw of intent.keywords) {
      const k = normalize(raw)
      if (k.includes(' ')) {
        if (q.includes(k)) score += 2
      } else if (k.length <= 3 ? words.includes(k) : words.some(w => w.startsWith(k))) {
        score += 1
      }
    }
    if (score > bestScore) { best = intent; bestScore = score }
  }
  return best
}
