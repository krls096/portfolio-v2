# Siguientes pasos (para retomar)

> Última actualización: 2026-11-04 · fase 5 hecha y subida a `origin/main`.
> El plan completo está en [PLAN.md](PLAN.md) y los textos en [TEXTOS.md](TEXTOS.md).

## Dónde estamos

| Fase | Estado |
|---|---|
| 1. Base (Vite + React + TS + Tailwind + Motion, tema, idioma, fondos) | ✅ hecha |
| 2. Sistema glass (panel, tarjetas, botones, dock, chips) | ✅ hecha |
| 3. Secciones con los textos revisados | ✅ hecha |
| 4. IA: chat "Pregúntale a Carlos" + paleta Ctrl/⌘+K | ✅ hecha |
| 5. Pulido: SEO, rendimiento, accesibilidad, responsive | ✅ hecha |
| **6. Deploy en Vercel + dominio** | ⏭️ **siguiente** |

## Cómo arrancarlo

```bash
npm run dev
```

Se abre en http://localhost:5173. Para comprobar que compila: `npm run build`.

## Fase 5: lo que se hizo

**Lighthouse** (build de producción): móvil **96**, escritorio **100**. Accesibilidad, buenas prácticas y SEO: **100** en los dos.

- **SEO**:
  - Open Graph y Twitter card, con la imagen `public/og.jpg` (1200×630, estilo glass).
  - Enlace canónico, `robots.txt`, `sitemap.xml` y datos estructurados `Person`.
  - La descripción cambia con el idioma.
- **Rendimiento**:
  - Las fuentes se sirven desde la propia web (`public/fonts`) y se precargan. Esto arregló el salto de texto (CLS 0.13 → 0) y bajó el FCP en móvil de 2,9 s a 1,5 s.
  - Portadas de vídeo en WebP, que solo se descargan cuando el vídeo está cerca de la pantalla.
- **Accesibilidad**:
  - El azul de los botones tiene más contraste con el texto blanco (5,2:1).
  - El nombre accesible de los botones incluye el texto visible ("EN", "Aurora", "Ctrl K").
- **Responsive**: sin scroll horizontal a 375, 768, 1024 y 1440 px. En tablet los proyectos van ahora en dos columnas.
- **Detalles**:
  - La paleta busca en los dos idiomas.
  - Cifras "vivas" (`src/lib/liveStats.ts`): clientes, pedidos, horas y segundos por pedido cambian un poco en cada visita (clientes 1.803–1.846, pedidos 596–631). En la misma sesión no cambian al recargar. Las horas salen de los pedidos, y la gráfica y los KPIs muestran las mismas cifras.
  - Tarjeta de edits con efectos sobre el clip: zoom en cada bombo, flash por compás, bandas de cine, título «Omens · EsDeeKid», contador de cortes y línea de tiempo del beat. Solo se anima mientras está en pantalla y no se mueve con "reducir movimiento".

**Queda por decidir (no bloquea):**
- El fondo por defecto, aurora o foto. Ahora es aurora; tú usas Foto.
- `hreflang`: no aplica mientras ES y EN compartan la misma URL.

## Fase 6: deploy

1. Crear el proyecto en Vercel conectado a `krls096/portfolio-v2`. Preset: Vite. Build: `npm run build`. Salida: `dist`.
2. Dominio recomendado: **`carlos.ponentlabs.com`**, con un registro CNAME a Vercel en el DNS de ponentlabs.com (razones en PLAN.md §10).
3. Desde ponentlabs.com, un enlace discreto tipo "Sobre el fundador".
4. Prueba final en el dominio real: Lighthouse, la imagen OG con un validador de enlaces y la web en el móvil de verdad.

## Decisiones que siguen en pie

- **Chat sin API**: las respuestas están en `src/content/chat.ts`. Para añadir una pregunta, se crea una intención con sus palabras clave y su respuesta, en ES y en EN. Solo pasaríamos a un modelo barato si se queda corto, y siempre detrás de una función serverless con límites (PLAN.md §6b).
- **Umbral**: el panel comercial se menciona sin capturas ni enlace, porque tiene datos reales.
- **Distribuidor**: sigue anónimo. No hay precio "desde X €".
- **Números**: nada de cifras redondas (612, no 600).
- **Flujo de trabajo**: cada fase se comprueba en el navegador y se te pregunta antes de cada commit y push.
- **Web antigua**: la carpeta `Portfolio` no se toca.

## Para retomar

Con decir **"seguimos con la fase 6"** basta.
