import type { HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLDivElement> & { strong?: boolean }

export function GlassPanel({ strong, className = '', ...rest }: Props) {
  return <div className={`glass ${strong ? 'glass-strong' : ''} rounded-3xl ${className}`} {...rest} />
}
