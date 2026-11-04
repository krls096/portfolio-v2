import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { usePreferences } from '../../hooks/usePreferences'
import { LazyVideo } from '../ui/LazyVideo'

// Un compás de 16 tiempos: la altura de cada barra es la energía del golpe (1 = bombo)
const BEATS = [1, 0.35, 0.55, 0.3, 0.9, 0.35, 0.6, 0.4, 1, 0.3, 0.5, 0.35, 0.95, 0.45, 0.7, 0.5]
const BEAT_MS = 460 // tempo de la animación, ~130 BPM

// Monitor de montaje encima del clip: zoom en cada bombo, flash cada compás,
// bandas de cine, título del tema y línea de tiempo con los golpes marcados
export function EditArt({ label }: { label: string }) {
  const { t } = usePreferences()
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [beat, setBeat] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Solo late mientras la tarjeta está en pantalla
  useEffect(() => {
    if (reduce || !visible) return
    const id = setInterval(() => setBeat(b => b + 1), BEAT_MS)
    return () => clearInterval(id)
  }, [reduce, visible])

  const step = beat % BEATS.length
  const kick = BEATS[step] >= 0.9
  const cut = Math.floor(beat / 2) % 24 + 1

  // Punch-in en cada bombo: se reinicia la animación sin volver a montar el vídeo
  const zoomRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = zoomRef.current
    if (!el || !kick || beat === 0) return
    el.classList.remove('edit-punch')
    void el.offsetWidth
    el.classList.add('edit-punch')
  }, [beat, kick])

  return (
    <div ref={ref} className="relative mb-6 aspect-video flex-1 overflow-hidden rounded-2xl bg-black lg:aspect-auto">
      <div ref={zoomRef} className="absolute inset-0">
        <LazyVideo src="/media/edit-omens.mp4" poster="/media/edit-omens-poster.webp" label={label} className="absolute inset-0 h-full" />
      </div>

      {/* Flash blanco al empezar cada compás */}
      {!reduce && step === 0 && beat > 0 && <div key={`f${beat}`} className="edit-flash pointer-events-none absolute inset-0 bg-white" />}

      {/* Bandas de cine */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[9%] bg-black" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[9%] bg-black" />

      {/* Datos del montaje */}
      <div className="pointer-events-none absolute inset-x-3 top-[calc(9%+0.6rem)] flex items-center justify-between font-mono text-[10px] text-white/85">
        <span className="inline-flex items-center gap-1.5 rounded-md bg-black/45 px-2 py-1 backdrop-blur-sm">
          <span className={`size-1.5 rounded-full ${kick ? 'bg-red-500' : 'bg-red-500/40'}`} />
          {t('edits.sync')}
        </span>
        <span className="rounded-md bg-black/45 px-2 py-1 tabular-nums backdrop-blur-sm">{t('edits.cut')} {String(cut).padStart(2, '0')}/24</span>
      </div>

      {/* Título del tema, como los rótulos del edit */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[calc(9%+2.9rem)] text-center text-white">
        <p className={`font-display text-2xl font-bold uppercase tracking-[0.5em] transition-[letter-spacing,opacity] duration-300 sm:text-3xl ${kick ? 'tracking-[0.62em]' : ''}`}
          style={{ textShadow: '0 2px 18px rgb(0 0 0 / .7)' }}>
          Omens
        </p>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em] text-white/70">EsDeeKid</p>
      </div>

      {/* Línea de tiempo: cada barra es un golpe, la que suena se ilumina */}
      <div className="pointer-events-none absolute inset-x-3 bottom-[calc(9%+0.5rem)] flex h-8 items-end gap-[3px] rounded-lg bg-black/45 px-2 py-1.5 backdrop-blur-sm" aria-hidden="true">
        {BEATS.map((h, i) => (
          <span
            key={i}
            className={`flex-1 rounded-sm transition-colors duration-150 ${i === step ? 'bg-white' : i < step ? 'bg-accent-2/80' : 'bg-white/25'}`}
            style={{ height: `${h * 100}%` }}
          />
        ))}
      </div>
    </div>
  )
}
