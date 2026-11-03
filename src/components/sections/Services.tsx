import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Bot, ChevronDown, Server, Workflow } from 'lucide-react'
import { useContent } from '../../hooks/useContent'
import { Chip } from '../glass/Chip'
import { GlassCard } from '../glass/GlassCard'
import { IconBadge } from '../glass/IconBadge'
import { SectionHeading } from '../glass/SectionHeading'
import { ease, reveal, sectionClass } from '../ui/motion'

const icons = [Workflow, Bot, Server]

export function Services() {
  const { services } = useContent()
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="servicios" className={sectionClass}>
      <SectionHeading eyebrow={services.eyebrow} title={services.title} subtitle={services.subtitle} />
      <div className="grid items-start gap-5 md:grid-cols-3">
        {services.items.map((s, i) => {
          const isOpen = open === i
          const panelId = `svc-detail-${i}`
          return (
            <motion.div key={s.title} {...reveal(i * 0.08)}>
              <GlassCard interactive className="flex flex-col gap-5">
                <IconBadge icon={icons[i]} />
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {s.chips.map(c => <Chip key={c}>{c}</Chip>)}
                </div>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease }}
                      className="overflow-hidden"
                    >
                      <p className="glass glass-strong rounded-2xl p-4 font-mono text-xs leading-relaxed text-fg/85">{s.detail}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="-mx-2 -mb-2 inline-flex h-11 w-max cursor-pointer items-center gap-1.5 rounded-full px-2 text-sm font-medium text-accent-2 transition-colors hover:text-fg"
                >
                  {isOpen ? services.less : services.more}
                  <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} aria-hidden />
                </button>
              </GlassCard>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
