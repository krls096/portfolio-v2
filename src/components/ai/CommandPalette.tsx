import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  Check, Compass, Github, Globe, Image, Linkedin, Mail, MessageCircle, Moon, Search, Sparkles, Sun, type LucideIcon,
} from 'lucide-react'
import { usePreferences } from '../../hooks/usePreferences'
import { scrollToSection, useUi } from '../../hooks/useUi'
import type { DictKey } from '../../i18n/dictionaries'
import { normalize } from '../../lib/intents'
import { NAV } from '../glass/Dock'
import { ease } from '../ui/motion'

type Item = { id: string; group: DictKey; label: string; icon: LucideIcon; run: () => void; keep?: boolean }

const EMAIL = 'krls096mus@gmail.com'

// Ctrl/⌘ + K: saltar a secciones y lanzar acciones sin tocar el ratón
export function CommandPalette() {
  const { t, theme, backdrop, toggleLang, toggleTheme, toggleBackdrop } = usePreferences()
  const { paletteOpen: open, setPaletteOpen: setOpen, setChatOpen } = useUi()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)

  // Atajo global
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(!open)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, setOpen])

  // Al abrir: guarda el foco, limpia y enfoca el buscador. Al cerrar: devuelve el foco
  useEffect(() => {
    if (open) {
      returnFocus.current = document.activeElement as HTMLElement | null
      setQuery('')
      setActive(0)
      setCopied(false)
      setTimeout(() => inputRef.current?.focus(), 30)
    } else {
      returnFocus.current?.focus?.()
    }
  }, [open])

  const items = useMemo<Item[]>(() => [
    ...NAV.map(n => ({ id: n.id, group: 'palette.sections' as DictKey, label: t(n.label), icon: n.icon, run: () => scrollToSection(n.id) })),
    { id: 'metodo', group: 'palette.sections', label: t('nav.method'), icon: Compass, run: () => scrollToSection('metodo') },
    { id: 'chat', group: 'palette.actions', label: t('action.chat'), icon: Sparkles, run: () => setChatOpen(true) },
    { id: 'lang', group: 'palette.actions', label: t('controls.lang'), icon: Globe, run: toggleLang, keep: true },
    { id: 'theme', group: 'palette.actions', label: theme === 'dark' ? t('controls.toLight') : t('controls.toDark'), icon: theme === 'dark' ? Sun : Moon, run: toggleTheme, keep: true },
    { id: 'bg', group: 'palette.actions', label: `${t('controls.bg')} · ${t(backdrop === 'aurora' ? 'controls.bg.photo' : 'controls.bg.aurora')}`, icon: Image, run: toggleBackdrop, keep: true },
    { id: 'whatsapp', group: 'palette.links', label: t('action.whatsapp'), icon: MessageCircle, run: () => window.open('https://wa.me/34644226771', '_blank', 'noopener') },
    {
      id: 'email', group: 'palette.links', label: copied ? t('action.copied') : t('action.email'), icon: copied ? Check : Mail, keep: true,
      run: () => { navigator.clipboard?.writeText(EMAIL).then(() => setCopied(true)).catch(() => { location.href = `mailto:${EMAIL}` }) },
    },
    { id: 'linkedin', group: 'palette.links', label: 'LinkedIn', icon: Linkedin, run: () => window.open('https://www.linkedin.com/in/carlos-cantos-blasco-650023437/', '_blank', 'noopener') },
    { id: 'github', group: 'palette.links', label: 'GitHub', icon: Github, run: () => window.open('https://github.com/krls096', '_blank', 'noopener') },
  ], [t, theme, backdrop, copied, toggleLang, toggleTheme, toggleBackdrop, setChatOpen])

  const q = normalize(query)
  const results = q ? items.filter(i => normalize(`${i.label} ${i.id}`).includes(q)) : items
  const current = Math.min(active, Math.max(results.length - 1, 0))

  function run(item: Item) {
    item.run()
    if (!item.keep) setOpen(false)
  }

  function onKeyDown(e: ReactKeyboardEvent) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((current + 1) % Math.max(results.length, 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((current - 1 + results.length) % Math.max(results.length, 1)) }
    else if (e.key === 'Enter' && results[current]) { e.preventDefault(); run(results[current]) }
    else if (e.key === 'Escape') { e.preventDefault(); setOpen(false) }
    else if (e.key === 'Tab') e.preventDefault() // el foco se queda en el buscador mientras la paleta está abierta
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center bg-black/40 px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          onMouseDown={e => { if (e.target === e.currentTarget) setOpen(false) }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t('palette.title')}
            className="glass glass-strong w-full max-w-xl overflow-hidden rounded-3xl"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.15 } }}
            transition={{ duration: 0.25, ease }}
          >
            <div className="flex items-center gap-3 border-b border-glass-border px-5">
              <Search size={18} className="shrink-0 text-muted" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={e => { setQuery(e.target.value); setActive(0) }}
                onKeyDown={onKeyDown}
                placeholder={t('palette.placeholder')}
                aria-label={t('palette.placeholder')}
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-list"
                aria-activedescendant={results[current] ? `palette-${results[current].id}` : undefined}
                autoComplete="off"
                className="h-14 min-w-0 flex-1 bg-transparent text-base text-fg placeholder:text-muted focus:outline-none"
              />
              <kbd className="hidden rounded-md border border-glass-border px-1.5 py-0.5 font-mono text-[11px] text-muted sm:block">Esc</kbd>
            </div>

            <ul id="palette-list" role="listbox" className="max-h-[min(420px,55svh)] overflow-y-auto overscroll-contain p-2">
              {results.length === 0 && <li className="px-4 py-8 text-center text-sm text-muted">{t('palette.empty')}</li>}
              {results.map((item, i) => {
                const Icon = item.icon
                const showGroup = i === 0 || results[i - 1].group !== item.group
                return (
                  <li key={item.id} role="presentation">
                    {showGroup && <p className="px-3 pt-3 pb-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted">{t(item.group)}</p>}
                    <div
                      id={`palette-${item.id}`}
                      role="option"
                      aria-selected={i === current}
                      onMouseMove={() => setActive(i)}
                      onClick={() => run(item)}
                      className={`flex h-11 cursor-pointer items-center gap-3 rounded-xl px-3 text-sm transition-colors ${i === current ? 'bg-accent text-white' : 'text-fg/90'}`}
                    >
                      <Icon size={17} aria-hidden className={i === current ? '' : 'text-accent-2'} />
                      <span className="flex-1 truncate">{item.label}</span>
                    </div>
                  </li>
                )
              })}
            </ul>

            <p className="border-t border-glass-border px-5 py-2.5 text-[11px] text-muted">{t('palette.hint')}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
