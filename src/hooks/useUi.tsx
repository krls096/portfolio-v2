import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

// Estado de las capas flotantes, compartido para que la paleta pueda abrir el chat
type Ui = {
  chatOpen: boolean
  setChatOpen: (open: boolean) => void
  paletteOpen: boolean
  setPaletteOpen: (open: boolean) => void
}

const UiContext = createContext<Ui | null>(null)

export function UiProvider({ children }: { children: ReactNode }) {
  const [chatOpen, setChatOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const value = useMemo(() => ({ chatOpen, setChatOpen, paletteOpen, setPaletteOpen }), [chatOpen, paletteOpen])
  return <UiContext.Provider value={value}>{children}</UiContext.Provider>
}

export function useUi() {
  const ctx = useContext(UiContext)
  if (!ctx) throw new Error('useUi debe usarse dentro de <UiProvider>')
  return ctx
}

// Desplazamiento a una sección respetando "reducir movimiento"
export function scrollToSection(id: string) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
}
