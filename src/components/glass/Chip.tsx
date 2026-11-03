import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

type Tone = 'default' | 'accent' | 'success'

const tones: Record<Tone, string> = {
  default: 'text-fg/85',
  accent: 'text-accent-2',
  success: 'text-success',
}

export function Chip({ icon: Icon, tone = 'default', children }: { icon?: LucideIcon; tone?: Tone; children: ReactNode }) {
  return (
    <span className={`glass glass-strong inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap ${tones[tone]}`}>
      {Icon && <Icon size={14} aria-hidden />}
      {children}
    </span>
  )
}
