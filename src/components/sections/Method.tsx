import { motion } from 'motion/react'
import { useContent } from '../../hooks/useContent'
import { GlassCard } from '../glass/GlassCard'
import { SectionHeading } from '../glass/SectionHeading'
import { reveal, sectionClass } from '../ui/motion'

export function Method() {
  const { method } = useContent()
  return (
    <section id="metodo" className={sectionClass}>
      <SectionHeading eyebrow={method.eyebrow} title={method.title} subtitle={method.body} />
      <ol className="grid gap-5 md:grid-cols-3">
        {method.steps.map((s, i) => (
          <motion.li key={s.title} {...reveal(i * 0.08)}>
            <GlassCard className="h-full">
              <span className="font-mono text-sm text-accent-2">0{i + 1}</span>
              <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
            </GlassCard>
          </motion.li>
        ))}
      </ol>
    </section>
  )
}
