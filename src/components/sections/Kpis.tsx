import { motion } from 'motion/react'
import { useContent } from '../../hooks/useContent'
import { GlassPanel } from '../glass/GlassPanel'
import { CountUp } from '../ui/CountUp'
import { reveal } from '../ui/motion'

export function Kpis() {
  const { kpis } = useContent()
  return (
    <section aria-label="KPIs" className="mx-auto max-w-6xl px-4 lg:pl-24 -mt-6 md:-mt-10">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
        {kpis.map((k, i) => (
          <motion.div key={k.label} {...reveal(i * 0.06)}>
            <GlassPanel className="h-full rounded-3xl p-5 md:p-6">
              <div className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
                <CountUp value={k.value} prefix={k.prefix} suffix={k.suffix} />
              </div>
              <div className="mt-1.5 text-sm text-muted">{k.label}</div>
            </GlassPanel>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
