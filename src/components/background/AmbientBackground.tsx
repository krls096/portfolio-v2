import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { usePreferences } from '../../hooks/usePreferences'

// Si existe public/bg/ambient.jpg se usa como foto; si no, la escena CSS de respaldo
const PHOTO_URL = '/bg/ambient.jpg'

function usePhotoAvailable() {
  const [ok, setOk] = useState(false)
  useEffect(() => {
    const img = new Image()
    img.onload = () => setOk(true)
    img.src = PHOTO_URL
  }, [])
  return ok
}

export function AmbientBackground() {
  const { backdrop } = usePreferences()
  const hasPhoto = usePhotoAvailable()

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
              {hasPhoto
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
