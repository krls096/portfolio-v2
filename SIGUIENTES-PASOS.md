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
| 6. Deploy en Vercel + dominio | ✅ en línea en https://carlos.ponentlabs.com |

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
  - ~~Cifras "vivas"~~ (quitado el 2026-11-09): el caso de éxito va en pasado, con jun–sep 2026 y cifras fijas.
  - Tarjeta de edits con efectos sobre el clip: zoom en cada bombo, flash por compás, bandas de cine, título «Omens · EsDeeKid», contador de cortes y línea de tiempo del beat. Solo se anima mientras está en pantalla y no se mueve con "reducir movimiento".

**Queda por decidir (no bloquea):**
- El fondo por defecto, aurora o foto. Ahora es aurora; tú usas Foto.
- `hreflang`: no aplica mientras ES y EN compartan la misma URL.

## Fase 6: deploy

**Hecho:**
- Proyecto `portfolio-v2` en Vercel (equipo Krls), conectado al repo. Cada push a `main` despliega solo.
- En producción: https://portfolio-v2-drab-kappa-63.vercel.app
- Dominio `carlos.ponentlabs.com` añadido al proyecto. Vercel lo da por verificado porque ponentlabs.com ya está en tu cuenta.

**DNS (hecho el 2026-11-04):** CNAME `carlos` → `326bcd0a127710e3.vercel-dns-017.com` en Cloudflare, sin proxy (nube gris). Vercel lo da por bien configurado. El certificado es de Let's Encrypt, válido hasta feb 2027 y se renueva solo. `http://` redirige a `https://`.

**Después del DNS:**
1. ✅ Web, certificado, imagen OG, sitemap y robots respondiendo en el dominio.
2. Lighthouse sobre el dominio real.
3. En ponentlabs.com, un enlace discreto tipo "Sobre el fundador".

## Decisiones que siguen en pie

- **Chat sin API**: las respuestas están en `src/content/chat.ts`. Para añadir una pregunta, se crea una intención con sus palabras clave y su respuesta, en ES y en EN. Solo pasaríamos a un modelo barato si se queda corto, y siempre detrás de una función serverless con límites (PLAN.md §6b).
- **Umbral**: el panel comercial se menciona sin capturas ni enlace, porque tiene datos reales.
- **Distribuidor**: sigue anónimo. No hay precio "desde X €".
- **Números**: nada de cifras redondas. El caso de éxito va en pasado (proyecto terminado en sep 2026) y sin cifras que cambien solas.
- **Flujo de trabajo**: cada fase se comprueba en el navegador y se te pregunta antes de cada commit y push.
- **Web antigua**: la carpeta `Portfolio` no se toca.

## Para retomar

Pendiente opcional: Lighthouse sobre el dominio real y el enlace "Sobre el fundador" en ponentlabs.com.
