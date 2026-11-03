# Portfolio v2 — Plan de rediseño

> Estado: **aprobado, en desarrollo (fase 1)**. Repo: [krls096/portfolio-v2](https://github.com/krls096/portfolio-v2). La web antigua (`portfolio-website`) no se toca.
> Fecha: 2026-11-03

## 0. Decisiones tomadas

| Tema | Decisión |
|---|---|
| Repo | Repo nuevo `krls096/portfolio-v2` (este) |
| Agente IA | **Respuestas pre-generadas** en el navegador, sin API ni coste. Si se queda corto, se valora un modelo barato detrás de una función serverless con límite por IP, tope de gasto y sin exponer la clave (ver §6b) |
| Fondo | Se implementan **los dos** (imagen IA desenfocada y aurora animada) y se elige viendo el resultado |
| Framework | Vite + React + TypeScript (lo más simple y efectivo para una web estática) |
| Proyectos nuevos | Dashboard de prospección para los comerciales de Umbral · Motor de edición de reels y edits · ponentlabs.com |
| Dominio | `ponentlabs.com` es la marca. Propuesta para no mezclar portfolio y clientes en §10 |

---

## 1. Objetivo

Pasar de una landing correcta pero genérica (Tailwind CDN, emojis como iconos, un solo HTML) a un portfolio que:

1. **Parezca un producto premium**, no una plantilla: estética *glass dashboard* como la del reel de referencia.
2. **Demuestre IA avanzada en vivo**, no solo la cuente: el visitante interactúa con un agente, ve un flujo de automatización ejecutarse y entiende cómo se construyó la web.
3. Mantenga lo que ya funciona: bilingüe ES/EN, tema claro/oscuro, SEO, datos reales (+1.800 clientes, 600 pedidos/mes, experiencia, formación).

---

## 2. Qué he sacado del reel de referencia (code.xr — "Glassy Dashboard V5")

| Elemento del reel | Cómo lo adaptamos |
|---|---|
| Fondo fotográfico (salón con ventanales) muy desenfocado detrás de toda la UI | Fondo ambiental a pantalla completa (imagen generada con IA, o *aurora* animada en WebGL/CSS como alternativa ligera) |
| Tarjetas translúcidas con `backdrop-blur`, borde fino blanco al 10-20 % y brillo superior | Sistema de "paneles de cristal" reutilizable para todas las secciones |
| Dock vertical de iconos a la izquierda + barra superior en píldora | Navegación tipo *visionOS*: dock lateral en escritorio, barra inferior en móvil |
| KPIs grandes + gráfico de barras con **una barra resaltada en azul** | Sección "Caso de éxito" convertida en un dashboard real con métricas animadas |
| Paleta azul + blanco, mucho aire, tipografía limpia | Acento azul eléctrico, neutros fríos, tipografía geométrica |
| Animaciones suaves de entrada (Framer Motion) | Entradas escalonadas, *springs*, transiciones con continuidad espacial |
| Stack: React + Tailwind + Framer Motion + Lucide | Mismo stack (ver §4) |

No copiamos el diseño tal cual: tomamos el lenguaje visual (glass + dashboard) y lo ponemos al servicio de **tu** historia.

---

## 3. Dirección de diseño

Generada con la skill **ui-ux-pro-max** (estilo *Liquid Glass*, patrón *Scroll-Triggered Storytelling*) y ajustada a la referencia. Descarto su paleta dorada/tipografía serif "luxury" porque no encaja con un perfil técnico ni con el reel.

- **Estilo:** Liquid Glass / visionOS — translucidez, desenfoque, bordes de luz, profundidad por capas.
- **Modo:** oscuro por defecto, claro disponible (como ahora).
- **Paleta (tokens CSS):**
  - Fondo `#05070D` · Superficie cristal `rgba(255,255,255,0.06)` · Borde `rgba(255,255,255,0.12)`
  - Texto `#F5F7FA` · Texto secundario `#9AA4B2`
  - Acento `#3B82F6` (azul) → degradado a `#60A5FA` · Éxito `#34D399`
  - Modo claro: fondo `#EEF2F7`, cristal `rgba(255,255,255,0.55)`, texto `#0B1220`
- **Tipografía:** *Geist* o *Inter Tight* para titulares (grandes, tracking negativo) + *Inter* para texto + *JetBrains Mono* para código/terminal.
- **Iconos:** Lucide (SVG). **Fuera emojis** como iconos.
- **Movimiento:** 300-450 ms, *springs* suaves, *stagger* en grids; todo respeta `prefers-reduced-motion`.
- **Accesibilidad:** contraste ≥ 4.5:1 sobre el cristal (capa de oscurecido bajo el texto), foco visible, navegación por teclado, objetivos táctiles ≥ 44 px.

---

## 4. Stack técnico

| Pieza | Elección | Por qué |
|---|---|---|
| Framework | **Vite + React 18 + TypeScript** | Rápido, estático, se despliega en cualquier sitio. (Alternativa: Next.js si queremos más SSR/SEO — ver preguntas) |
| Estilos | **Tailwind CSS v4** (compilado, no CDN) | Sin el script CDN de ahora, más rápido y profesional |
| Animación | **Motion (Framer Motion)** | El mismo del reel |
| Iconos | **lucide-react** | |
| Gráficos | SVG propio animado (o Recharts si crece) | Ligero |
| i18n | Diccionarios ES/EN en JSON + hook propio | Mantiene lo que ya tienes |
| Agente IA | **Motor local de respuestas pre-generadas** (intenciones + palabras clave ES/EN, efecto de escritura en *streaming*) | Cero coste, cero riesgo de abuso |
| Deploy | **Vercel** (ya lo usas para PropFlow y la plantilla iOS) | |

---

## 5. Estructura de la web (secciones)

1. **Hero "Command Center"**
   Nombre + rol con titular grande. A la derecha, un panel de cristal que simula una consola de agente: muestra en tiempo real "tareas" que se ejecutan (pedido recibido → clasificado por IA → guardado en BD). Sustituye a la terminal actual con algo más vistoso.
   CTA: *Hablar con mi agente* · *Ver proyectos*.

2. **Barra de KPIs** (tarjetas glass)
   +1.800 clientes · 600 pedidos/mes · 24/7 · nº de workflows en producción. Contadores animados.

3. **Lo que hago** — *bento grid* de cristal
   Automatización · IA / Agentes · Infraestructura. Cada tarjeta se expande (transición compartida de Motion) con el detalle técnico, en lugar del modal actual.

4. **Caso de éxito como dashboard** (la pieza estrella, inspirada directamente en el reel)
   Panel completo: gráfico de barras de pedidos/mes con la barra actual resaltada, lista de actividad reciente, y el **flujo animado WhatsApp → n8n → Agente IA → SQL → Pedido completado**, con "pulsos" que recorren los nodos.
   Datos de ejemplo/anonimizados (no datos reales de clientes).

5. **Proyectos** (bento grid, el primero más grande)
   - **Ponent Labs** (ponentlabs.com): la marca, agencia de automatización e IA.
   - **Motor de reels y edits con IA**: vídeos 100 % hechos con código (Remotion), voz sintética, música y efectos montados automáticamente al ritmo. Se ilustra con un vídeo corto en bucle.
   - **Dashboard de prospección para Umbral**: panel para comerciales con *scoring* de empresas, guiones de llamada, gestión de objeciones, análisis de la web del cliente y seguimiento de contactos. Solo capturas con **datos ficticios**, nunca los reales.
   - **PropFlow**: dashboard de *scoring* inmobiliario (n8n + Supabase + WhatsApp).
   - **Plantilla "link in bio" estilo iOS**.
   Cada tarjeta con *preview*, chips de stack y enlace cuando sea público.

6. **"Cómo está hecha esta web"** — demuestra el uso de IA
   Explica brevemente el proceso: diseño con skills de IA, código con Claude Code, agente propio con API de Claude. Transparente y diferenciador.

7. **Stack** — marquesina de logos SVG reales (n8n, Docker, PostgreSQL, Supabase, OpenAI, Claude, etc.).

8. **Trayectoria** — timeline de cristal (Freelance AI, Mercadona, ITBACKING) + formación (DAM, AI-900/AI-102).

9. **Contacto** — CTA final grande + WhatsApp, email, LinkedIn, GitHub.

**Elementos flotantes (globales):**
- **Agente "Pregúntale a Carlos"**: chat flotante de cristal. Preguntas sugeridas en chips + texto libre; un clasificador local por intenciones elige la respuesta pre-escrita (experiencia, servicios, precios/disponibilidad, stack, proyectos, contacto) y la muestra con efecto de *streaming*. Si no entiende, ofrece WhatsApp/email. Todo en el navegador.
- **Paleta de comandos `Ctrl/⌘ + K`**: saltar a secciones, cambiar idioma/tema, abrir el chat. Detalle muy "dev".
- Dock de navegación + selector ES/EN + tema.

---

## 6. Señales de "IA avanzada" (resumen)

1. Agente conversacional en la web (pre-generado; ampliable a LLM real).
2. Visualización animada de un pipeline real de automatización con IA.
3. Sección que documenta cómo se construyó la web con IA.
4. Fondo/imágenes generados con IA (si lo apruebas).
5. Paleta de comandos y microinteracciones de producto, no de plantilla.

### 6b. Si algún día pasamos a un LLM real (opcional)

Para que nadie te "explote" la clave:
- La clave solo vive en una variable de entorno de Vercel; el navegador nunca la ve.
- **Tope de gasto mensual** en la consola de Anthropic (p. ej. 5 €): si se alcanza, la API se corta y no cobra más.
- Límite por IP (p. ej. 15 mensajes/día) y longitud máxima de mensaje y respuesta.
- Modelo barato (Haiku) y *fallback* automático a las respuestas pre-generadas si la API falla o se agota el cupo.

---

## 7. Estructura de carpetas

```
portfolio-v2/              ← repo nuevo (github.com/krls096/portfolio-v2)
    ├── PLAN.md            ← este documento
    ├── package.json
    ├── vite.config.ts
    ├── index.html
    ├── public/            ← fondo, og-image, favicon
    └── src/
        ├── main.tsx · App.tsx
        ├── styles/        ← tokens y tema
        ├── i18n/          ← es.json · en.json
        ├── data/          ← experiencia, proyectos, KPIs (contenido separado del código)
        ├── components/
        │   ├── glass/     ← GlassPanel, GlassButton, Dock…
        │   ├── sections/  ← Hero, Kpis, Services, CaseDashboard, Projects, …
        │   └── ai/        ← ChatAgent, CommandPalette, WorkflowViz
        └── hooks/
```

---

## 8. Fases de trabajo

| # | Fase | Entregable |
|---|---|---|
| 1 | **Base** | Proyecto Vite + React + TS + Tailwind + Motion, tokens de diseño, tema, i18n, fondo ambiental |
| 2 | **Sistema glass** | Componentes `GlassPanel`, botones, dock, chips; página de prueba |
| 3 | **Secciones** | Hero, KPIs, Servicios, Caso-dashboard, Proyectos, Stack, Trayectoria, Contacto con el contenido actual migrado |
| 4 | **IA** | Agente de chat pre-generado, paleta `⌘K`, visualización del workflow |
| 5 | **Pulido** | Responsive (375/768/1024/1440), accesibilidad, `reduced-motion`, rendimiento (Lighthouse ≥ 90), SEO + OG image |
| 6 | **Deploy** | Proyecto en Vercel conectado al repo, dominio (ver §10) |

Revisión contigo al final de las fases 2, 3 y 4 con capturas del navegador.

---

## 9. Pendiente de tu parte (no bloquea la fase 1)

- Capturas o un vídeo corto de: el motor de reels (un edit terminado), el dashboard de Umbral **con datos ficticios** y ponentlabs.com.
- Si alguno de esos proyectos tiene URL pública que se pueda enlazar.

## 10. Dominio: portfolio vs. clientes de Ponent Labs

Recomendación: **no** poner el portfolio en la raíz de `ponentlabs.com`. La raíz es para el cliente (qué hace la agencia y cómo contratarla). El portfolio personal va en **`carlos.ponentlabs.com`** (subdominio gratis en Vercel), enlazado discretamente desde ponentlabs.com como "Sobre el fundador".

- El cliente no se encuentra un CV cuando busca un servicio.
- Quien quiera ver quién está detrás (un cliente grande, un reclutador, un socio) lo encuentra en un clic, y eso **suma** credibilidad a la marca.
- Ponent Labs aparece en el portfolio como proyecto principal, así que las dos webs se refuerzan entre sí.
