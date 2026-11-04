import { useMemo } from 'react'
import { en } from '../content/en'
import { es } from '../content/es'
import type { Content, Metric } from '../content/types'
import { getLiveStats } from '../lib/liveStats'
import { usePreferences } from './usePreferences'

// Mete las cifras de esta visita en los KPIs, las métricas del caso y el último mes de la gráfica
function withLiveStats(base: Content): Content {
  const s = getLiveStats()
  const live = (list: Metric[]) => list.map(m => (m.live ? { ...m, value: s[m.live] } : m))
  const months = base.caseStudy.months.map((m, i, all) =>
    i === all.length - 1 ? { ...m, orders: s.orders, avg: s.avg, hours: s.hours, human: s.human } : m)
  return { ...base, kpis: live(base.kpis), caseStudy: { ...base.caseStudy, metrics: live(base.caseStudy.metrics), months } }
}

export function useContent() {
  const { lang } = usePreferences()
  return useMemo(() => withLiveStats(lang === 'en' ? en : es), [lang])
}

// 'always': en es-ES los números de 4 cifras no se agrupan por defecto (1800 → 1.800)
export function useNumberFormat() {
  const { lang } = usePreferences()
  return new Intl.NumberFormat(lang === 'es' ? 'es-ES' : 'en-US', { useGrouping: 'always' })
}
