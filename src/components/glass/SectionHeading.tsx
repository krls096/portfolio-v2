import { motion } from 'motion/react'

type Props = { eyebrow: string; title: string; subtitle?: string; align?: 'left' | 'center' }

export function SectionHeading({ eyebrow, title, subtitle, align = 'left' }: Props) {
  const center = align === 'center'
  return (
    <motion.div
      className={`mb-10 md:mb-14 max-w-2xl ${center ? 'mx-auto text-center' : ''}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent-2">{eyebrow}</p>
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] leading-[1.05]">{title}</h2>
      {subtitle && <p className="mt-4 text-base md:text-lg leading-relaxed text-muted">{subtitle}</p>}
    </motion.div>
  )
}
