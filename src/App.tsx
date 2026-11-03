import { motion } from 'motion/react'
import { ArrowRight, Bot, Database, MessageCircle, Workflow } from 'lucide-react'
import { AmbientBackground } from './components/background/AmbientBackground'
import { Controls } from './components/glass/Controls'
import { GlassPanel } from './components/glass/GlassPanel'
import { usePreferences } from './hooks/usePreferences'

// Fase 1: vista de prueba del sistema visual (fondos + cristal + tipografía).
// Las secciones reales llegan en la fase 3.

const enter = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
})

const bars = [38, 52, 44, 61, 57, 72, 66, 90]

export default function App() {
  const { t, lang } = usePreferences()
  // 'always': en es-ES los números de 4 cifras no se agrupan por defecto (1800 → 1.800)
  const nf = new Intl.NumberFormat(lang === 'es' ? 'es-ES' : 'en-US', { useGrouping: 'always' } as Intl.NumberFormatOptions)

  return (
    <>
      <AmbientBackground />

      <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <span className="glass rounded-full px-4 h-11 inline-flex items-center font-display font-semibold tracking-tight">
            Carlos<span className="text-accent-2">.</span>
          </span>
          <Controls />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pt-28 pb-16 min-h-svh grid items-center">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] items-center">
          <motion.div {...enter()} className="space-y-6">
            <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium text-muted">
              <span className="size-1.5 rounded-full bg-success" />
              {t('hero.eyebrow')}
            </span>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.04em] leading-[0.95]">
              Carlos Cantos
              <span className="block bg-gradient-to-r from-accent-2 to-accent bg-clip-text text-transparent pb-1">
                {t('hero.role')}
              </span>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-muted">{t('hero.p')}</p>
            <div className="flex flex-wrap gap-3">
              <a href="#" className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 font-medium text-white shadow-[0_10px_30px_-10px_var(--accent)] transition-transform hover:-translate-y-0.5">
                <MessageCircle size={18} aria-hidden /> {t('hero.cta1')}
              </a>
              <a href="#" className="glass inline-flex h-12 items-center gap-2 rounded-full px-6 font-medium transition-transform hover:-translate-y-0.5">
                {t('hero.cta2')} <ArrowRight size={18} aria-hidden />
              </a>
            </div>
          </motion.div>

          {/* Muestra del lenguaje "dashboard" del reel */}
          <motion.div {...enter(0.15)}>
            <GlassPanel className="p-5 sm:p-6 space-y-5">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { v: `+${nf.format(1800)}`, k: t('kpi.clients') },
                  { v: nf.format(600), k: t('kpi.orders') },
                  { v: '24/7', k: t('kpi.uptime') },
                ].map(m => (
                  <GlassPanel key={m.k} strong className="rounded-2xl p-3 sm:p-4">
                    <div className="font-display text-xl sm:text-2xl font-semibold tracking-tight">{m.v}</div>
                    <div className="mt-1 text-[11px] sm:text-xs text-muted leading-tight">{m.k}</div>
                  </GlassPanel>
                ))}
              </div>

              <div className="flex h-36 items-end gap-2 sm:gap-3" aria-hidden="true">
                {bars.map((h, i) => (
                  <motion.div
                    key={i}
                    className={`flex-1 rounded-xl ${i === bars.length - 1 ? 'bg-gradient-to-t from-accent to-accent-2 shadow-[0_0_24px_-4px_var(--accent)]' : 'bg-fg/15'}`}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  />
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
                {[
                  { icon: MessageCircle, label: 'WhatsApp' },
                  { icon: Workflow, label: 'n8n' },
                  { icon: Bot, label: 'AI Agent' },
                  { icon: Database, label: 'PostgreSQL' },
                ].map(({ icon: Icon, label }, i, arr) => (
                  <span key={label} className="inline-flex items-center gap-2">
                    <span className="glass glass-strong inline-flex items-center gap-1.5 rounded-full px-3 py-1.5">
                      <Icon size={14} className="text-accent-2" aria-hidden /> {label}
                    </span>
                    {i < arr.length - 1 && <ArrowRight size={12} className="text-muted" aria-hidden />}
                  </span>
                ))}
              </div>
            </GlassPanel>
          </motion.div>
        </div>
      </main>

      <p className="fixed bottom-4 left-1/2 -translate-x-1/2 glass rounded-full px-4 py-2 text-xs text-muted whitespace-nowrap">
        {t('preview.note')}
      </p>
    </>
  )
}
