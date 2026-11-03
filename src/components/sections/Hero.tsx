import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowRight, Bot, CheckCircle2, Database, MessageCircle, Workflow } from 'lucide-react'
import { useContent } from '../../hooks/useContent'
import { Chip } from '../glass/Chip'
import { GlassButton } from '../glass/GlassButton'
import { GlassPanel } from '../glass/GlassPanel'
import { enter, ease } from '../ui/motion'

const lineStyle = {
  in: { icon: MessageCircle, cls: 'text-fg/90' },
  ai: { icon: Bot, cls: 'text-accent-2 light:text-accent' },
  ok: { icon: CheckCircle2, cls: 'text-success' },
}

// Consola que simula al agente procesando un pedido, línea a línea y en bucle
function AgentConsole() {
  const { hero } = useContent()
  const { lines, title, note } = hero.console
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(reduce ? lines.length : 0)

  useEffect(() => {
    if (reduce) { setShown(lines.length); return }
    const done = shown >= lines.length
    const id = setTimeout(() => setShown(done ? 0 : shown + 1), done ? 3200 : shown === 0 ? 700 : 1100)
    return () => clearTimeout(id)
  }, [shown, lines.length, reduce])

  return (
    <GlassPanel className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-glass-border px-5 py-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-fg/20" />
          <span className="size-2.5 rounded-full bg-fg/20" />
          <span className="size-2.5 rounded-full bg-fg/20" />
        </div>
        <span className="font-mono text-xs text-muted">{title}</span>
        <span className="inline-flex items-center gap-1.5 text-xs text-success">
          <span className="relative flex size-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-success/60" />
            <span className="relative size-2 rounded-full bg-success" />
          </span>
          live
        </span>
      </div>

      <ol className="min-h-[232px] space-y-3 p-5 font-mono text-[13px] leading-relaxed" aria-live="off">
        <AnimatePresence initial={false}>
          {lines.slice(0, shown).map((l, i) => {
            const { icon: Icon, cls } = lineStyle[l.kind]
            return (
              <motion.li
                key={`${i}-${l.text}`}
                className={`glass glass-strong flex items-start gap-3 rounded-2xl px-4 py-3 ${cls}`}
                initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, transition: { duration: 0.25 } }}
                transition={{ duration: 0.45, ease }}
              >
                <Icon size={16} className="mt-0.5 shrink-0" aria-hidden />
                <span>{l.text}</span>
              </motion.li>
            )
          })}
        </AnimatePresence>
      </ol>

      <div className="flex flex-wrap items-center gap-2 border-t border-glass-border px-5 py-4">
        {[
          { icon: MessageCircle, label: 'WhatsApp' },
          { icon: Workflow, label: 'n8n' },
          { icon: Bot, label: 'AI' },
          { icon: Database, label: 'SQL' },
        ].map(({ icon, label }, i, arr) => (
          <span key={label} className="inline-flex items-center gap-2">
            <Chip icon={icon} tone="accent">{label}</Chip>
            {i < arr.length - 1 && <ArrowRight size={12} className="text-muted" aria-hidden />}
          </span>
        ))}
        <span className="ml-auto text-[11px] text-muted">{note}</span>
      </div>
    </GlassPanel>
  )
}

export function Hero() {
  const { hero } = useContent()
  return (
    <section id="inicio" className="mx-auto grid min-h-svh max-w-6xl items-center px-4 pt-28 pb-16 lg:pl-24">
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
        <motion.div {...enter()} className="space-y-6">
          <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium text-muted">
            <span className="size-1.5 rounded-full bg-success" />
            {hero.eyebrow}
          </span>
          <h1 className="font-display font-bold tracking-[-0.04em]">
            <span className="block text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">{hero.name}</span>
            <span className="mt-3 block bg-gradient-to-r from-accent-2 to-accent bg-clip-text pb-1 text-3xl leading-[1.05] text-transparent sm:text-4xl lg:text-[2.75rem]">
              {hero.headline}
            </span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted">{hero.body}</p>
          <div className="flex flex-wrap gap-3">
            <GlassButton variant="primary" href="#contacto"><MessageCircle size={18} aria-hidden /> {hero.cta1}</GlassButton>
            <GlassButton href="#proyectos">{hero.cta2} <ArrowRight size={18} aria-hidden /></GlassButton>
          </div>
        </motion.div>

        <motion.div {...enter(0.15)}>
          <AgentConsole />
        </motion.div>
      </div>
    </section>
  )
}
