// Cifras del sistema de pedidos que cambian un poco en cada visita, para que se sientan vivas.
// Se guardan en sessionStorage: si alguien recarga, ve las mismas y no se nota el truco.
export type LiveStats = { clients: number; orders: number; hours: number; avg: number; human: number }
export type LiveKey = Exclude<keyof LiveStats, 'human'>

const KEY = 'live-stats'
const between = (min: number, max: number) => min + Math.floor(Math.random() * (max - min + 1))

function generate(): LiveStats {
  const orders = between(596, 631)
  return {
    clients: between(1803, 1846),
    orders,
    // Las horas salen de los pedidos (~8 min ahorrados por pedido), así las cifras cuadran entre sí
    hours: Math.round(orders * between(128, 136) / 1000),
    avg: between(44, 51),
    human: between(44, 53) / 10,
  }
}

let cached: LiveStats | null = null

export function getLiveStats(): LiveStats {
  if (cached) return cached
  try {
    const saved = JSON.parse(sessionStorage.getItem(KEY) ?? 'null') as LiveStats | null
    if (saved && typeof saved.orders === 'number') return (cached = saved)
  } catch { /* sin almacenamiento: se generan sin guardar */ }
  cached = generate()
  try { sessionStorage.setItem(KEY, JSON.stringify(cached)) } catch { /* ignorar */ }
  return cached
}
