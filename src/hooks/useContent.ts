import { en } from '../content/en'
import { es } from '../content/es'
import { usePreferences } from './usePreferences'

export function useContent() {
  const { lang } = usePreferences()
  return lang === 'en' ? en : es
}

// 'always': en es-ES los números de 4 cifras no se agrupan por defecto (1800 → 1.800)
export function useNumberFormat() {
  const { lang } = usePreferences()
  return new Intl.NumberFormat(lang === 'es' ? 'es-ES' : 'en-US', { useGrouping: 'always' })
}
