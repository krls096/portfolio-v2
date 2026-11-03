import { motion } from 'motion/react'
import { Briefcase, FolderKanban, House, Layers, Mail, type LucideIcon } from 'lucide-react'
import { useActiveSection } from '../../hooks/useActiveSection'
import { usePreferences } from '../../hooks/usePreferences'
import type { DictKey } from '../../i18n/dictionaries'

export const NAV: { id: string; icon: LucideIcon; label: DictKey }[] = [
  { id: 'inicio', icon: House, label: 'nav.home' },
  { id: 'servicios', icon: Layers, label: 'nav.services' },
  { id: 'proyectos', icon: FolderKanban, label: 'nav.projects' },
  { id: 'trayectoria', icon: Briefcase, label: 'nav.experience' },
  { id: 'contacto', icon: Mail, label: 'nav.contact' },
]
const IDS = NAV.map(n => n.id)

// Navegación tipo visionOS: columna a la izquierda en escritorio, barra flotante abajo en móvil
export function Dock() {
  const { t } = usePreferences()
  const active = useActiveSection(IDS)

  return (
    <nav
      aria-label={t('nav.label')}
      className="fixed z-40 bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2
                 lg:bottom-auto lg:left-5 lg:top-1/2 lg:translate-x-0 lg:-translate-y-1/2"
    >
      <ul className="glass flex gap-1 rounded-full p-1.5 lg:flex-col">
        {NAV.map(({ id, icon: Icon, label }) => {
          const isActive = active === id
          return (
            <li key={id} className="group relative">
              <a
                href={`#${id}`}
                aria-label={t(label)}
                aria-current={isActive ? 'true' : undefined}
                className={`relative flex size-11 items-center justify-center rounded-full transition-colors duration-200
                            ${isActive ? 'text-white' : 'text-muted hover:text-fg'}`}
              >
                {isActive && (
                  <motion.span
                    layoutId="dock-active"
                    className="absolute inset-0 rounded-full bg-accent shadow-[0_0_20px_-4px_var(--accent)]"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
                <Icon size={19} className="relative" aria-hidden />
              </a>
              {/* Etiqueta al pasar el ratón (solo escritorio) */}
              <span className="glass pointer-events-none absolute left-full top-1/2 ml-3 hidden -translate-y-1/2 -translate-x-1 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium opacity-0 transition-all duration-200 lg:block group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100">
                {t(label)}
              </span>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
