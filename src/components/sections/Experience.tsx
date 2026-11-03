import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { GraduationCap } from 'lucide-react'
import { useContent } from '../../hooks/useContent'
import { Chip } from '../glass/Chip'
import { GlassCard } from '../glass/GlassCard'
import { IconBadge } from '../glass/IconBadge'
import { SectionHeading } from '../glass/SectionHeading'
import { reveal, sectionClass } from '../ui/motion'

export function Experience() {
  const { experience: e } = useContent()
  const track = useRef<HTMLOListElement>(null)
  // La línea se va llenando según avanza el scroll por la trayectoria
  const { scrollYProgress } = useScroll({ target: track, offset: ['start 70%', 'end 50%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <section id="trayectoria" className={sectionClass}>
      <SectionHeading eyebrow={e.eyebrow} title={e.title} />

      <ol ref={track} className="relative space-y-5 pl-8 md:pl-10">
        <span className="absolute left-[11px] top-2 bottom-2 w-0.5 rounded-full bg-fg/10 md:left-[15px]" aria-hidden="true" />
        <motion.span
          className="absolute left-[11px] top-2 bottom-2 w-0.5 origin-top rounded-full bg-gradient-to-b from-accent-2 to-accent shadow-[0_0_12px_var(--accent)] md:left-[15px]"
          style={{ scaleY: fill }}
          aria-hidden="true"
        />
        {e.jobs.map((j, i) => (
          <motion.li key={j.role} {...reveal(i * 0.05)} className="relative">
            <span
              className={`absolute -left-8 top-6 size-6 rounded-full border-2 md:-left-10 md:size-8
                          ${j.current ? 'border-accent bg-accent shadow-[0_0_16px_var(--accent)]' : 'border-glass-border bg-bg'}`}
              aria-hidden="true"
            />
            <GlassCard className="md:p-7">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="font-display text-lg font-semibold tracking-tight md:text-xl">{j.role}</h3>
                <Chip tone={j.current ? 'success' : 'default'}>{j.date}</Chip>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">{j.body}</p>
            </GlassCard>
          </motion.li>
        ))}
      </ol>

      <h3 className="mt-16 mb-6 font-display text-2xl font-semibold tracking-tight">{e.educationTitle}</h3>
      <div className="grid gap-5 sm:grid-cols-2">
        {e.education.map((ed, i) => (
          <motion.div key={ed.title} {...reveal(i * 0.08)}>
            <GlassCard className="flex h-full items-start gap-4">
              <IconBadge icon={GraduationCap} />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="font-display font-semibold">{ed.title}</h4>
                  <Chip>{ed.badge}</Chip>
                </div>
                <p className="mt-1.5 text-sm text-muted">{ed.body}</p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
