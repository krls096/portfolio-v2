import { AnimatePresence, motion } from 'motion/react'
import { usePreferences } from '../../hooks/usePreferences'

// Para usar una foto real: ponla en public/bg/ y escribe aquí su ruta (p. ej. '/bg/ambient.jpg').
// Sin foto se usa la escena CSS de respaldo, sin pedir nada al servidor.
const PHOTO_URL: string | null = null

export function AmbientBackground() {
  const { backdrop } = usePreferences()

  return (
    <div className="ambient" aria-hidden="true">
      <AnimatePresence initial={false}>
        <motion.div
          key={backdrop}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {backdrop === 'aurora' ? (
            <>
              <div className="aurora-blob a" />
              <div className="aurora-blob b" />
              <div className="aurora-blob c" />
            </>
          ) : (
            <>
              {PHOTO_URL
                ? <div className="photo-layer" style={{ backgroundImage: `url(${PHOTO_URL})` }} />
                : <div className="photo-fallback" />}
              <div className="photo-veil" />
            </>
          )}
          <div className="grain" />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
