import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { dictionaries, type DictKey, type Lang } from '../i18n/dictionaries'

export type Theme = 'dark' | 'light'
export type Backdrop = 'aurora' | 'photo'

type Preferences = {
  lang: Lang
  theme: Theme
  backdrop: Backdrop
  t: (key: DictKey) => string
  toggleLang: () => void
  toggleTheme: () => void
  toggleBackdrop: () => void
}

const PreferencesContext = createContext<Preferences | null>(null)

function store(key: string, value: string) {
  try { localStorage.setItem(key, value) } catch { /* modo privado: no pasa nada */ }
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  // El script del <head> ya dejó el estado inicial en <html>; lo leemos de ahí
  const root = document.documentElement
  const [lang, setLang] = useState<Lang>(root.lang === 'en' ? 'en' : 'es')
  const [theme, setTheme] = useState<Theme>(root.classList.contains('light') ? 'light' : 'dark')
  const [backdrop, setBackdrop] = useState<Backdrop>(root.dataset.bg === 'photo' ? 'photo' : 'aurora')

  useEffect(() => {
    root.lang = lang
    store('lang', lang)
  }, [lang, root])

  useEffect(() => {
    root.classList.toggle('light', theme === 'light')
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#eef2f7' : '#05070d')
    store('theme', theme)
  }, [theme, root])

  useEffect(() => {
    root.dataset.bg = backdrop
    store('bg', backdrop)
  }, [backdrop, root])

  const t = useCallback((key: DictKey) => dictionaries[lang][key], [lang])

  const value = useMemo<Preferences>(() => ({
    lang, theme, backdrop, t,
    toggleLang: () => setLang(l => (l === 'es' ? 'en' : 'es')),
    toggleTheme: () => setTheme(v => (v === 'dark' ? 'light' : 'dark')),
    toggleBackdrop: () => setBackdrop(b => (b === 'aurora' ? 'photo' : 'aurora')),
  }), [lang, theme, backdrop, t])

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext)
  if (!ctx) throw new Error('usePreferences debe usarse dentro de <PreferencesProvider>')
  return ctx
}
