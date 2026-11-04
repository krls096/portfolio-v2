import { Command, Globe, Image, Moon, Sparkles, Sun } from 'lucide-react'
import { usePreferences } from '../../hooks/usePreferences'
import { useUi } from '../../hooks/useUi'

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)

const btn = 'glass h-11 min-w-11 px-3 inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium text-fg/80 hover:text-fg transition-colors cursor-pointer'

export function Controls() {
  const { lang, theme, backdrop, t, toggleLang, toggleTheme, toggleBackdrop } = usePreferences()
  const { setPaletteOpen } = useUi()
  const themeLabel = theme === 'dark' ? t('controls.toLight') : t('controls.toDark')

  return (
    <div className="flex items-center gap-2">
      <button type="button" onClick={() => setPaletteOpen(true)} className={btn} aria-label={`${isMac ? '⌘K' : 'Ctrl K'} · ${t('palette.open')}`} title={t('palette.open')} aria-keyshortcuts="Control+K Meta+K">
        <Command size={16} aria-hidden />
        <kbd className="hidden font-mono text-xs md:inline">{isMac ? '⌘K' : 'Ctrl K'}</kbd>
      </button>
      <button type="button" onClick={toggleBackdrop} className={btn} aria-label={`${t(backdrop === 'aurora' ? 'controls.bg.aurora' : 'controls.bg.photo')} · ${t('controls.bg')}`} title={t('controls.bg')}>
        {backdrop === 'aurora' ? <Sparkles size={16} aria-hidden /> : <Image size={16} aria-hidden />}
        <span className="hidden sm:inline">{t(backdrop === 'aurora' ? 'controls.bg.aurora' : 'controls.bg.photo')}</span>
      </button>
      <button type="button" onClick={toggleLang} className={btn} aria-label={`${lang === 'es' ? 'EN' : 'ES'} · ${t('controls.lang')}`} title={t('controls.lang')}>
        <Globe size={16} aria-hidden />
        <span>{lang === 'es' ? 'EN' : 'ES'}</span>
      </button>
      <button type="button" onClick={toggleTheme} className={btn} aria-label={themeLabel} title={themeLabel}>
        {theme === 'dark' ? <Sun size={16} aria-hidden /> : <Moon size={16} aria-hidden />}
      </button>
    </div>
  )
}
