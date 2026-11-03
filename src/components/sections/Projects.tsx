import { motion } from 'motion/react'
import { ArrowLeftRight, ArrowUpRight, Building2, FileText, Gauge, Home, Lock, Phone, Presentation, ShieldQuestion, UserRound } from 'lucide-react'
import type { ReactNode } from 'react'
import type { Project } from '../../content/types'
import { useContent } from '../../hooks/useContent'
import { usePreferences } from '../../hooks/usePreferences'
import { Chip } from '../glass/Chip'
import { GlassCard } from '../glass/GlassCard'
import { GlassPanel } from '../glass/GlassPanel'
import { SectionHeading } from '../glass/SectionHeading'
import { LazyVideo } from '../ui/LazyVideo'
import { reveal, sectionClass } from '../ui/motion'

// Columnas que ocupa cada proyecto en la rejilla de 6 (escritorio)
const span: Record<Project['id'], string> = {
  ponent: 'lg:col-span-4',
  umbral: 'lg:col-span-2',
  pipeline: 'lg:col-span-3',
  edits: 'lg:col-span-3',
  panel: 'lg:col-span-3',
  propflow: 'lg:col-span-3',
}

// Ilustración del emparejamiento comprador ↔ propiedad (datos inventados)
function PropFlowArt() {
  const { lang } = usePreferences()
  const rows = lang === 'es'
    ? [['Ruzafa · 250 k€', 'Piso 3 hab.', '94 %'], ['Benimaclet · 180 k€', 'Piso 2 hab.', '88 %'], ['Campanar · 320 k€', 'Ático', '81 %']]
    : [['Ruzafa · €250k', '3-bed flat', '94 %'], ['Benimaclet · €180k', '2-bed flat', '88 %'], ['Campanar · €320k', 'Penthouse', '81 %']]
  return (
    <div className="mb-6 flex flex-1 flex-col justify-center gap-2.5" aria-hidden="true">
      {rows.map(([buyer, home, score]) => (
        <GlassPanel key={buyer} strong className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm">
          <UserRound size={16} className="shrink-0 text-accent-2" />
          <span className="min-w-0 flex-1 truncate">{buyer}</span>
          <ArrowLeftRight size={14} className="shrink-0 text-muted" />
          <Home size={16} className="shrink-0 text-accent-2" />
          <span className="hidden min-w-0 flex-1 truncate sm:block">{home}</span>
          <span className="font-mono text-xs font-semibold text-success tabular-nums">{score}</span>
        </GlassPanel>
      ))}
    </div>
  )
}

function Body({ p, children }: { p: Project; children?: ReactNode }) {
  return (
    <>
      {children}
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">{p.title}</h3>
        {p.badge && <Chip icon={p.id === 'panel' ? Lock : undefined}>{p.badge}</Chip>}
      </div>
      <p className="mt-2 leading-relaxed text-muted">{p.body}</p>
      <div className="mt-5 flex flex-wrap items-center gap-2">
        {p.chips.map(c => <Chip key={c} tone={c.startsWith('Intel') || c.startsWith('Artif') ? 'accent' : 'default'}>{c}</Chip>)}
        {p.link && (
          <a href={p.link.href} target="_blank" rel="noopener" className="ml-auto inline-flex h-11 items-center gap-1 rounded-full px-1 text-sm font-medium text-accent-2 transition-colors hover:text-fg">
            {p.link.label} <ArrowUpRight size={16} aria-hidden />
          </a>
        )}
      </div>
      {p.credit && <p className="mt-4 text-[11px] text-muted">{p.credit}</p>}
    </>
  )
}

// Ilustración sin datos de lo que la IA añade a cada ficha del panel
function PanelArt() {
  const { lang } = usePreferences()
  const items = lang === 'es'
    ? ['Scoring', 'Guion de llamada', 'Objeciones', 'Análisis web', 'Demo nueva', 'Ficha de empresa']
    : ['Scoring', 'Call script', 'Objections', 'Web review', 'Fresh demo', 'Company profile']
  const icons = [Gauge, Phone, ShieldQuestion, FileText, Presentation, Building2]
  return (
    <div className="mb-6 grid grid-cols-2 gap-2.5" aria-hidden="true">
      {items.map((label, i) => {
        const Icon = icons[i]
        return (
          <GlassPanel key={label} strong className="flex items-center gap-2.5 rounded-2xl px-3.5 py-3">
            <Icon size={16} className="shrink-0 text-accent-2" />
            <span className="truncate text-sm font-medium">{label}</span>
          </GlassPanel>
        )
      })}
    </div>
  )
}

function PonentArt() {
  const { lang } = usePreferences()
  return (
    <div className="relative mb-6 overflow-hidden rounded-2xl border border-glass-border bg-gradient-to-br from-accent/30 via-accent-2/10 to-transparent px-6 py-10" aria-hidden="true">
      <div className="absolute -right-10 -top-16 size-56 rounded-full bg-accent-2/30 blur-3xl" />
      <p className="relative font-display text-4xl font-bold tracking-[-0.04em] md:text-5xl">Ponent Labs</p>
      <p className="relative mt-2 max-w-sm text-sm text-fg/75">
        {lang === 'es' ? 'Primero el problema. Después, la herramienta.' : 'The problem first. Then the tool.'}
      </p>
    </div>
  )
}

export function Projects() {
  const { projects } = useContent()
  const by = Object.fromEntries(projects.items.map(p => [p.id, p])) as Record<Project['id'], Project>

  const art: Partial<Record<Project['id'], ReactNode>> = {
    ponent: <PonentArt />,
    pipeline: (
      <div className="mb-6 grid grid-cols-2 gap-3">
        <LazyVideo src="/media/reel-space.mp4" poster="/media/reel-space-poster.jpg" label={by.pipeline.title} className="aspect-[9/16] rounded-2xl" />
        <LazyVideo src="/media/reel-engine.mp4" poster="/media/reel-engine-poster.jpg" label={by.pipeline.title} className="aspect-[9/16] rounded-2xl" />
      </div>
    ),
    // El clip crece hasta igualar la altura de la tarjeta del pipeline (horizontal, se puede recortar)
    edits: (
      <div className="relative mb-6 aspect-video flex-1 overflow-hidden rounded-2xl lg:aspect-auto">
        <LazyVideo src="/media/edit-omens.mp4" poster="/media/edit-omens-poster.jpg" label={by.edits.title} className="absolute inset-0 h-full" />
      </div>
    ),
    panel: <PanelArt />,
    propflow: <PropFlowArt />,
  }

  return (
    <section id="proyectos" className={sectionClass}>
      <SectionHeading eyebrow={projects.eyebrow} title={projects.title} />
      <div className="grid gap-5 lg:grid-cols-6">
        {projects.items.map((p, i) => (
          <motion.div key={p.id} {...reveal((i % 2) * 0.08)} className={span[p.id]}>
            <GlassCard interactive className="flex h-full flex-col p-5 md:p-6">
              <Body p={p}>{art[p.id]}</Body>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
