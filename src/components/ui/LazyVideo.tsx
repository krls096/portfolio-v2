import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'

type Props = { src: string; poster: string; label: string; className?: string }

// Vídeo en bucle y sin sonido que solo se descarga y reproduce mientras está en pantalla.
// Con "reducir movimiento" se queda en la imagen de portada.
export function LazyVideo({ src, poster, label, className = '' }: Props) {
  const ref = useRef<HTMLVideoElement>(null)
  const reduce = useReducedMotion()
  const [near, setNear] = useState(false)

  // La portada tampoco se descarga hasta que el vídeo está cerca de la pantalla
  useEffect(() => {
    const v = ref.current
    if (!v) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setNear(true); io.disconnect() } }, { rootMargin: '600px' })
    io.observe(v)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const v = ref.current
    if (!v || reduce) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (!v.src) v.src = src
        v.play().catch(() => { /* autoplay bloqueado: se queda la portada */ })
      } else {
        v.pause()
      }
    }, { threshold: 0.25 })
    io.observe(v)
    return () => io.disconnect()
  }, [src, reduce])

  return (
    <video
      ref={ref}
      className={`block w-full object-cover bg-black/40 ${className}`}
      poster={near ? poster : undefined}
      muted loop playsInline preload="none"
      aria-label={label}
    />
  )
}
