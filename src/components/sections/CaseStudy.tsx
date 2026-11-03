import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowRight, Bot, CheckCircle2, Database, MessageCircle, UserRound, Workflow } from 'lucide-react'
import { useContent, useNumberFormat } from '../../hooks/useContent'
import { usePreferences } from '../../hooks/usePreferences'
import { GlassPanel } from '../glass/GlassPanel'
import { SectionHeading } from '../glass/SectionHeading'
import { CountUp } from '../ui/CountUp'
import { ease, reveal, sectionClass } from '../ui/motion'

const flowIcons = [MessageCircle, Workflow, Bot, Database, CheckCircle2]
const HOLD = 3 // pasos que se queda todo encendido antes de reiniciar

// Recorre los nodos del flujo uno a uno, como si pasara un pedido; devuelve cuántos están encendidos
function useFlowStep(n: number) {
  const reduce = useReducedMotion()
  const [step, setStep] = useState(reduce ? n : 0)
  useEffect(() => {
    if (reduce) { setStep(n); return }
    const id = setInterval(() => setStep(s => (s + 1) % (n + HOLD + 1)), 850)
    return () => clearInterval(id)
  }, [n, reduce])
  return Math.min(step, n)
}

export function CaseStudy() {
  const { caseStudy: c } = useContent()
  const step = useFlowStep(c.flow.length)
  const nf = useNumberFormat()
  const { lang } = usePreferences()
  const dec = new Intl.NumberFormat(lang === 'es' ? 'es-ES' : 'en-US', { maximumFractionDigits: 1 })
  const [sel, setSel] = useState(c.months.length - 1)
  const month = c.months[sel]
  const max = Math.max(...c.months.map(m => m.orders)) * 1.08

  return (
    <section id="caso" className={sectionClass}>
      <SectionHeading eyebrow={c.eyebrow} title={c.title} subtitle={c.body} />

      <motion.div {...reveal()}>
        <GlassPanel className="p-4 sm:p-6 md:p-8">
          {/* Métricas */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {c.metrics.map(m => (
              <GlassPanel key={m.label} strong className="rounded-2xl p-4">
                <div className="font-display text-2xl font-semibold tracking-tight">
                  <CountUp value={m.value} prefix={m.prefix} suffix={m.suffix} />
                </div>
                <div className="mt-1 text-xs text-muted">{m.label}</div>
              </GlassPanel>
            ))}
          </div>

          {/* minmax(0,…): el texto recortado de la actividad no puede ensanchar la columna */}
          <div className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            {/* Gráfico: cada barra es un botón que muestra los datos de su mes */}
            <GlassPanel strong className="rounded-2xl p-5">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display font-semibold">{c.chartTitle}</h3>
                <span className="text-[11px] text-muted">{c.chartNote}</span>
              </div>
              <div className="mt-5 flex h-44 items-end gap-1.5 sm:gap-3">
                {c.months.map((m, i) => {
                  const on = i === sel
                  return (
                    <button
                      key={m.label}
                      type="button"
                      onClick={() => setSel(i)}
                      aria-pressed={on}
                      aria-label={`${m.label}: ${nf.format(m.orders)} ${c.detailLabels.orders}`}
                      className="group flex h-full flex-1 cursor-pointer flex-col items-center justify-end gap-2 rounded-lg"
                    >
                      <span className={`text-[11px] font-semibold tabular-nums transition-opacity duration-300 ${on ? 'text-accent-2 opacity-100' : 'opacity-0 group-hover:opacity-70'}`}>
                        {nf.format(m.orders)}
                      </span>
                      <motion.span
                        className="relative block w-full overflow-hidden rounded-lg bg-fg/15 transition-colors duration-300 group-hover:bg-fg/25"
                        initial={{ height: 0 }}
                        whileInView={{ height: `${(m.orders / max) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: i * 0.05, ease }}
                      >
                        <span
                          className={`absolute inset-0 bg-gradient-to-t from-accent to-accent-2 transition-opacity duration-500 ${on ? 'opacity-100' : 'opacity-0'}`}
                          aria-hidden="true"
                        />
                      </motion.span>
                      <span className={`text-[11px] transition-colors ${on ? 'text-fg' : 'text-muted'}`}>{m.label}</span>
                    </button>
                  )
                })}
              </div>

              {/* Detalle del mes seleccionado */}
              <div className="mt-5 border-t border-glass-border pt-4" aria-live="polite">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={sel}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25, ease }}
                  >
                    <dl className="grid grid-cols-4 gap-2">
                      {[
                        [nf.format(month.orders), c.detailLabels.orders],
                        [`${month.avg} s`, c.detailLabels.avg],
                        [`${dec.format(month.human)} %`, c.detailLabels.human],
                        [`${month.hours} h`, c.detailLabels.hours],
                      ].map(([v, k]) => (
                        <div key={k} className="flex min-w-0 flex-col-reverse">
                          <dt className="truncate text-[11px] text-muted">{k}</dt>
                          <dd className="font-display text-base font-semibold tabular-nums sm:text-lg">{v}</dd>
                        </div>
                      ))}
                    </dl>
                    <p className="mt-3 text-xs leading-relaxed text-muted">
                      <span className="font-semibold text-fg">{month.label} · </span>{month.note}
                    </p>
                  </motion.div>
                </AnimatePresence>
                <p className="mt-2 text-[11px] text-muted/70">{c.chartHint}</p>
              </div>
            </GlassPanel>

            {/* Actividad */}
            <GlassPanel strong className="rounded-2xl p-5">
              <h3 className="font-display font-semibold">{c.activityTitle}</h3>
              <ul className="mt-4 space-y-2.5">
                {c.activity.map(a => {
                  const human = a.time === '—'
                  return (
                    <li key={a.id} className="flex items-center gap-3 text-sm">
                      <span className={`inline-flex size-8 shrink-0 items-center justify-center rounded-full ${human ? 'bg-amber-400/15 text-amber-400' : 'bg-success/15 text-success'}`}>
                        {human ? <UserRound size={15} aria-hidden /> : <CheckCircle2 size={15} aria-hidden />}
                      </span>
                      <span className="font-mono text-xs text-muted">{a.id}</span>
                      <span className="min-w-0 flex-1 truncate">{a.text}</span>
                      <span className="font-mono text-xs text-muted tabular-nums">{a.time}</span>
                    </li>
                  )
                })}
              </ul>
            </GlassPanel>
          </div>

          {/* Flujo: la base de cristal no cambia; el azul es una capa encima que aparece por opacidad */}
          <ol className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {c.flow.map((label, i) => {
              const Icon = flowIcons[i]
              const lit = i < step
              return (
                <li key={label} className="inline-flex items-center gap-2 sm:gap-3">
                  <span className="glass relative inline-flex items-center gap-2 overflow-hidden rounded-full px-3.5 py-2 text-xs font-medium sm:text-sm">
                    <span
                      className={`absolute inset-0 rounded-full bg-accent transition-opacity duration-500 ease-out ${lit ? 'opacity-100' : 'opacity-0'}`}
                      aria-hidden="true"
                    />
                    <span className={`relative inline-flex items-center gap-2 transition-colors duration-500 ${lit ? 'text-white' : 'text-fg/80'}`}>
                      <Icon size={15} aria-hidden /> {label}
                    </span>
                  </span>
                  {i < c.flow.length - 1 && (
                    <ArrowRight size={14} className={`transition-colors duration-500 ${i < step - 1 ? 'text-accent-2' : 'text-muted'}`} aria-hidden />
                  )}
                </li>
              )
            })}
          </ol>
        </GlassPanel>
      </motion.div>
    </section>
  )
}
