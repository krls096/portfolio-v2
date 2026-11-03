import { motion } from 'motion/react'
import {
  ArrowRight, ArrowUpRight, Bot, Cog, Database, FileText, Gauge, Lock, MessageCircle,
  Mic, Phone, Server, ShieldQuestion, Sparkles, Workflow,
} from 'lucide-react'
import { AmbientBackground } from './components/background/AmbientBackground'
import { Chip } from './components/glass/Chip'
import { Controls } from './components/glass/Controls'
import { Dock } from './components/glass/Dock'
import { GlassButton } from './components/glass/GlassButton'
import { GlassCard } from './components/glass/GlassCard'
import { GlassPanel } from './components/glass/GlassPanel'
import { IconBadge } from './components/glass/IconBadge'
import { SectionHeading } from './components/glass/SectionHeading'
import { usePreferences } from './hooks/usePreferences'

// Fase 2: escaparate del sistema de componentes glass sobre la estructura real de secciones.
// El contenido definitivo de cada sección llega en la fase 3.

const ease = [0.22, 1, 0.36, 1] as const
const enter = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease },
})
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease },
})

const bars = [38, 52, 44, 61, 57, 72, 66, 90]
const section = 'scroll-mt-24 mx-auto max-w-6xl px-4 lg:pl-24 py-20 md:py-28'

export default function App() {
  const { t, lang } = usePreferences()
  // 'always': en es-ES los números de 4 cifras no se agrupan por defecto (1800 → 1.800)
  const nf = new Intl.NumberFormat(lang === 'es' ? 'es-ES' : 'en-US', { useGrouping: 'always' })

  const services = [
    { icon: Workflow, title: t('svc.auto'), body: t('svc.auto.d'), chips: ['n8n', 'Webhooks', 'REST APIs'] },
    { icon: Bot, title: t('svc.ai'), body: t('svc.ai.d'), chips: ['Claude', 'OpenAI', 'Prompting'] },
    { icon: Server, title: t('svc.infra'), body: t('svc.infra.d'), chips: ['Docker', 'Linux VPS', 'PostgreSQL'] },
  ]

  return (
    <>
      <AmbientBackground />
      <Dock />

      <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <a href="#inicio" className="glass rounded-full px-4 h-11 inline-flex items-center font-display font-semibold tracking-tight">
            Carlos<span className="text-accent-2">.</span>
          </a>
          <Controls />
        </div>
      </header>

      <main>
        {/* INICIO */}
        <section id="inicio" className="mx-auto max-w-6xl px-4 lg:pl-24 pt-28 pb-16 min-h-svh grid items-center">
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
                <GlassButton variant="primary" href="#contacto"><MessageCircle size={18} aria-hidden /> {t('hero.cta1')}</GlassButton>
                <GlassButton href="#proyectos">{t('hero.cta2')} <ArrowRight size={18} aria-hidden /></GlassButton>
              </div>
            </motion.div>

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
                      transition={{ duration: 0.8, delay: 0.3 + i * 0.05, ease }}
                    />
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { icon: MessageCircle, label: 'WhatsApp' },
                    { icon: Workflow, label: 'n8n' },
                    { icon: Bot, label: 'AI Agent' },
                    { icon: Database, label: 'PostgreSQL' },
                  ].map(({ icon, label }, i, arr) => (
                    <span key={label} className="inline-flex items-center gap-2">
                      <Chip icon={icon} tone="accent">{label}</Chip>
                      {i < arr.length - 1 && <ArrowRight size={12} className="text-muted" aria-hidden />}
                    </span>
                  ))}
                </div>
              </GlassPanel>
            </motion.div>
          </div>
        </section>

        {/* SERVICIOS */}
        <section id="servicios" className={section}>
          <SectionHeading eyebrow={t('svc.eyebrow')} title={t('svc.title')} subtitle={t('svc.sub')} />
          <div className="grid gap-5 md:grid-cols-3">
            {services.map((s, i) => (
              <motion.div key={s.title} {...reveal(i * 0.08)}>
                <GlassCard interactive className="h-full flex flex-col gap-5">
                  <IconBadge icon={s.icon} />
                  <div>
                    <h3 className="font-display text-xl font-semibold tracking-tight">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
                  </div>
                  <div className="mt-auto flex flex-wrap gap-2">
                    {s.chips.map(c => <Chip key={c}>{c}</Chip>)}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PROYECTOS (muestra del bento grid) */}
        <section id="proyectos" className={section}>
          <SectionHeading eyebrow={t('prj.eyebrow')} title={t('prj.title')} />
          <div className="grid gap-5 md:grid-cols-[1fr_1.3fr]">
            <motion.div {...reveal()}>
              <GlassCard interactive className="h-full p-3">
                <video
                  className="w-full aspect-[9/16] max-h-[520px] object-cover rounded-2xl"
                  src="/media/reel-engine.mp4"
                  poster="/media/reel-engine-poster.jpg"
                  autoPlay muted loop playsInline preload="none"
                  aria-label={t('prj.reel.t')}
                />
                <div className="p-3 pt-4">
                  <h3 className="font-display text-lg font-semibold tracking-tight">{t('prj.reel.t')}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{t('prj.reel.d')}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Chip icon={Sparkles} tone="accent">Claude Code</Chip>
                    <Chip icon={Cog}>Remotion</Chip>
                    <Chip icon={Mic}>TTS</Chip>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div {...reveal(0.08)}>
              <GlassCard interactive className="h-full flex flex-col gap-6">
                <div className="flex items-start justify-between gap-4">
                  <IconBadge icon={Gauge} size="lg" />
                  <Chip icon={Lock}>{t('prj.umbral.private')}</Chip>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-semibold tracking-tight">{t('prj.umbral.t')}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{t('prj.umbral.d')}</p>
                </div>
                {/* Ilustración sin datos: lo que la IA añade a cada ficha */}
                <div className="grid grid-cols-2 gap-3" aria-hidden="true">
                  {[
                    { icon: Gauge, label: 'Scoring' },
                    { icon: Phone, label: lang === 'es' ? 'Guion de llamada' : 'Call script' },
                    { icon: ShieldQuestion, label: lang === 'es' ? 'Objeciones' : 'Objections' },
                    { icon: FileText, label: lang === 'es' ? 'Análisis web' : 'Web review' },
                  ].map(({ icon: Icon, label }) => (
                    <GlassPanel key={label} strong className="rounded-2xl p-4 flex items-center gap-3">
                      <Icon size={18} className="text-accent-2 shrink-0" />
                      <span className="text-sm font-medium">{label}</span>
                    </GlassPanel>
                  ))}
                </div>
                <div className="mt-auto flex flex-wrap gap-2">
                  <Chip icon={Sparkles} tone="accent">AI enrichment</Chip>
                  <Chip>JavaScript</Chip>
                  <Chip>Cloudflare Pages</Chip>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </section>

        {/* TRAYECTORIA (pendiente de fase 3) */}
        <section id="trayectoria" className={section}>
          <SectionHeading eyebrow={t('exp.eyebrow')} title={t('exp.title')} />
          <GlassCard className="text-muted text-sm">Timeline — fase 3</GlassCard>
        </section>

        {/* CONTACTO */}
        <section id="contacto" className={`${section} pb-36 lg:pb-28`}>
          <motion.div {...reveal()}>
            <GlassPanel className="px-6 py-14 md:py-20 text-center">
              <h2 className="font-display text-4xl md:text-6xl font-bold tracking-[-0.04em]">{t('cta.title')}</h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-muted">{t('cta.p')}</p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <GlassButton variant="primary" href="https://wa.me/34644226771"><MessageCircle size={18} aria-hidden /> {t('cta.btn')}</GlassButton>
                <GlassButton href="https://www.linkedin.com/in/carlos-cantos-blasco-650023437/">LinkedIn <ArrowUpRight size={18} aria-hidden /></GlassButton>
                <GlassButton variant="ghost" href="https://github.com/krls096">GitHub <ArrowUpRight size={18} aria-hidden /></GlassButton>
              </div>
            </GlassPanel>
          </motion.div>
        </section>
      </main>

      <p className="hidden lg:block fixed bottom-4 right-4 glass rounded-full px-4 py-2 text-xs text-muted whitespace-nowrap">
        {t('preview.note')}
      </p>
    </>
  )
}
