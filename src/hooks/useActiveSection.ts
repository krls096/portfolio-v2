import { useEffect, useState } from 'react'

// Devuelve el id de la sección que ocupa la franja central de la pantalla
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const els = ids.map(id => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
    const io = new IntersectionObserver(
      entries => {
        const hit = entries.find(e => e.isIntersecting)
        if (hit) setActive(hit.target.id)
      },
      // Solo cuenta lo que cruza una línea al 40 % de la altura
      { rootMargin: '-40% 0px -60% 0px' },
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [ids])

  return active
}
