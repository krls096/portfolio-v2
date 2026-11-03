import type { HTMLAttributes, PointerEvent } from 'react'

type Props = HTMLAttributes<HTMLDivElement> & { interactive?: boolean }

// Tarjeta de cristal. Con `interactive`, un reflejo de luz sigue al puntero
export function GlassCard({ interactive, className = '', onPointerMove, ...rest }: Props) {
  function handleMove(e: PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
    onPointerMove?.(e)
  }

  return (
    <div
      className={`glass rounded-3xl p-6 ${interactive ? 'spotlight transition-transform duration-300 ease-[var(--ease-spring)] hover:-translate-y-1' : ''} ${className}`}
      onPointerMove={interactive ? handleMove : onPointerMove}
      {...rest}
    />
  )
}
