import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'
import { useNumberFormat } from '../../hooks/useContent'
import type { Metric } from '../../content/types'

// Cuenta desde 0 hasta el valor la primera vez que entra en pantalla
export function CountUp({ value, prefix = '', suffix = '' }: Pick<Metric, 'value' | 'prefix' | 'suffix'>) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()
  const nf = useNumberFormat()
  const numeric = typeof value === 'number'
  const [n, setN] = useState(numeric && !reduce ? 0 : value)

  useEffect(() => {
    if (!numeric || !inView || reduce) { setN(value); return }
    const c = animate(0, value, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: v => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, numeric, reduce, value])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{typeof n === 'number' ? nf.format(n) : n}{suffix}
    </span>
  )
}
