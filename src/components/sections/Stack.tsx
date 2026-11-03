import { useContent } from '../../hooks/useContent'

// Dos filas de chips en movimiento continuo, en sentidos opuestos
export function Stack() {
  const { stack } = useContent()
  return (
    <section aria-labelledby="stack-title" className="py-16 md:py-24">
      <h2 id="stack-title" className="mb-10 px-4 text-center font-display text-3xl font-bold tracking-[-0.03em] md:text-4xl">{stack.title}</h2>
      <div className="space-y-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        {stack.rows.map((row, r) => (
          <div key={r} className="overflow-hidden">
            <ul className={`marquee flex w-max gap-4 ${r % 2 ? 'reverse' : ''}`}>
              {/* Seis copias (número par): la mitad cubre incluso pantallas de 2560 px y desplazar un 50 % cierra el bucle sin salto */}
              {Array.from({ length: 6 }, () => row).flat().map((item, i) => (
                <li
                  key={`${item}-${i}`}
                  aria-hidden={i >= row.length || undefined}
                  className="glass whitespace-nowrap rounded-2xl px-5 py-3 text-base font-medium md:text-lg"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
