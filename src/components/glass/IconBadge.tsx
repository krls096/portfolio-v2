import type { LucideIcon } from 'lucide-react'

// Icono dentro de un cuadrado de cristal con brillo azul
export function IconBadge({ icon: Icon, size = 'md' }: { icon: LucideIcon; size?: 'md' | 'lg' }) {
  const box = size === 'lg' ? 'size-14 rounded-2xl' : 'size-11 rounded-xl'
  return (
    <span className={`glass glass-strong ${box} inline-flex items-center justify-center text-accent-2 shadow-[0_0_30px_-10px_var(--accent)]`}>
      <Icon size={size === 'lg' ? 26 : 20} aria-hidden />
    </span>
  )
}
