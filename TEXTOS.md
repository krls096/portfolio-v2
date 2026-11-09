# Textos del portfolio — borrador v1 para revisar

> Cómo revisarlo: marca lo que no te guste, tacha o reescribe encima. Donde hay **A / B** elige una.
> Lo que va entre `[?]` es un dato que necesito que me confirmes.
> Escribo primero en español; el inglés se traduce cuando el español esté cerrado.

**Tono que propongo:** primera persona, directo y concreto, como habla ponentlabs.com. Nada de "soluciones disruptivas" ni "sinergias". Frases cortas, resultados medibles y cero relleno.
**A quién le habla:** sobre todo a quien llega desde Ponent Labs y quiere saber quién hay detrás. Después, a reclutadores y socios.

---

## 1. Hero

**Etiqueta:** Fundador de Ponent Labs · Valencia

**Titular:**
- **A)** Carlos Cantos / *Automation & AI Developer*  ← el actual
- **B)** Carlos Cantos / *Construyo sistemas que trabajan solos y ahorran tiempo*

**Texto:**
- **A)** Automatizo procesos e integro IA en negocios reales. Mi sistema de pedidos lleva meses en producción atendiendo a +1.800 clientes sin que nadie toque un Excel.
- **B)** Busco dónde se le van las horas a un negocio y las devuelvo con automatización e IA. Por ejemplo, un sistema que desarrollé gestionó los pedidos de +1.800 clientes sin intervención manual.

**Botones:** `Hablar conmigo` · `Ver proyectos`

**Panel del hero (consola del agente), líneas que van apareciendo:**
```
↘ Nuevo mensaje de WhatsApp: "Buenas, me pones 3 cajas de lo de siempre"
◆ Agente IA: cliente identificado · pedido interpretado (3 × ref. habitual)
✓ Pedido #4821 guardado en la base de datos
✓ Confirmación enviada al cliente · 4,2 s
```
(Datos inventados; ilustran el flujo real.)

---

## 2. Cifras (debajo del hero)

| Cifra | Etiqueta |
|---|---|
| +1.800 | clientes gestionados |
| 600 | pedidos al mes |
| 24/7 | sin intervención manual |
| `[?]` | ¿añadimos otra? p. ej. horas ahorradas al mes, nº de workflows en producción o tiempo medio por pedido | podriamos poner una cantidad de horas, que serían como 80h al mes, 5 workflows y tiempo medio unos 47s

---

## 3. Lo que hago

**Antetítulo:** Servicios
**Título:** Lo que hago
**Subtítulo:** Primero entiendo el problema. Después elijo o desarrollo la herramienta.

| Tarjeta | Texto | Chips |
|---|---|---|
| **Automatización** | Conecto las herramientas que ya usas para que los procesos repetitivos se hagan solos, de principio a fin. | n8n · Webhooks · APIs |
| **IA aplicada** | Pongo modelos de lenguaje a trabajar dentro del proceso: leen mensajes, extraen datos, clasifican y responden. | Claude · OpenAI · Agentes |
| **Infraestructura** | Lo despliego y lo mantengo en servidores propios, con bases de datos y copias, para que funcione cada día. | Docker · VPS · PostgreSQL |

**Detalle técnico al expandir cada tarjeta** (sustituye al modal de ahora):
- Automatización: flujos condicionales en n8n, nodos HTTP, transformación de JSON y gestión de errores con alertas, para que nada falle en silencio.
- IA aplicada: prompts estructurados con salida en JSON validado, extracción de datos de texto libre, agentes conversacionales y un humano en el bucle cuando hace falta.
- Infraestructura: n8n y bases de datos self-hosted con Docker Compose, variables de entorno, volúmenes persistentes y redes aisladas.

---

## 4. Caso de éxito (dashboard)

**Antetítulo:** Caso de éxito
**Título:** Pedidos por WhatsApp, procesados solos
**Texto:** Una distribuidora recibía cientos de pedidos al mes por WhatsApp y alguien tenía que copiarlos a mano. Desarrollé un agente de IA que los leía, identificaba al cliente y el producto, y los registraba en la base de datos. Las personas solo intervenían cuando el agente tenía dudas.

**Flujo:** WhatsApp → n8n → Agente IA → Base de datos → Pedido completado

**Bloques del dashboard:**
- Gráfico "Pedidos por mes", con el mes actual resaltado (valores ilustrativos)
- Ejemplo de actividad: 4-5 pedidos inventados
- Métricas: clientes, pedidos/mes y tiempo medio por pedido (47s como ya he dicho antes)

`[?]` ¿Se puede decir que es una **distribuidora** y de **qué sector**, o lo dejamos anónimo del todo? lo dejamos anonimo por si aca

---

## 5. Proyectos

**Antetítulo:** Proyectos
**Título:** Lo que he construido

1. **Ponent Labs** · *destacado*
   Mi marca. Soluciones a medida para negocios de la Comunitat Valenciana: primero el problema, después la herramienta, y si no existe, la construimos.
   Chips: Marca · Web · Consultoría — `Visitar ponentlabs.com ↗`

2. **Umbral**
   El producto de Ponent Labs para inmobiliarias. Que ningún contacto se quede esperando: cada consulta atendida y con seguimiento hasta el cierre.
   Chips: n8n · WhatsApp · Inteligencia Artificial · CRM — `Probar la demo ↗`

3. **Pipeline de vídeo con Inteligencia Artificial** (vídeo del reel)
   Reels hechos sin cámara ni editor. Un agente de IA con herramientas propias escribe el guion, genera la voz, anima todo en código y renderiza el vídeo final. Yo dirijo y reviso.
   Chips: Inteligencia Artificial · Motor de edición · TTS

4. **Edits al ritmo de la música** (clip del edit, sin sonido)
   El mismo pipeline en modo cinemático: corta los planos al compás de la canción, añade zooms, flashes, títulos y efectos, y entrega el montaje listo para publicar.
   Chips: Inteligencia Artificial · Motor de edición · Beat sync
   *Pie pequeño:* "Material audiovisual de sus respectivos autores" `[?]` ¿pongo el nombre del artista o videoclip? si pon ej ilustrativo esdeekid o algo así, si veo que es muy violento o tal pues lo cambio mas adelante

5. **Panel comercial de Umbral** · *Uso interno*
   La herramienta de los comerciales. Cada empresa llega enriquecida por IA: puntuación de prioridad, guion de llamada, objeciones previstas con su respuesta, un análisis de su web y en el caso correspondiente una demo nueva para presentar al cliente.
   Chips: Inteligencia Artificial · Scoring · Prospección

6. **PropFlow** · *MVP*
   CRM inmobiliario con emparejamiento automático entre compradores y propiedades por zona, presupuesto y tipología.
   Chips: n8n · Supabase · WhatsApp — `Ver demo ↗`

7. **Link in bio estilo iOS** · *Plantilla*
   Página de enlaces para redes dentro de una réplica de iOS: Dynamic Island, hojas modales y cristal.
   Chips: Frontend · CSS — `Ver demo ↗`

`[?]` ¿Quitamos PropFlow o el link in bio para que no quede tan largo? Propuesta: el link in bio fuera, que es lo más flojo frente al resto. Sí quitamos link in bio

---

## 6. Cómo está hecha esta web

**Antetítulo:** Detrás de esta web
**Título:** Hecha con Inteligencia Artificial, dirigida por mí
**Texto:** Esta web la he diseñado y programado trabajando con Claude Code como copiloto: planificación por fases, un sistema de diseño generado con skills de IA y revisión en el navegador en cada paso. Es la misma forma de trabajar que aplico a los proyectos de mis clientes: la IA acelera y yo decido. (este apartado no sé si me deja en mejor o peor puesto la verdad, quizá si lo enrevesamos un poco si que pueda quedar bien)

Tres pasos en tarjetas pequeñas:
1. **Plan:** objetivos, referencias y fases por escrito antes de tocar código.
2. **Sistema:** colores, tipografía y componentes definidos con IA y ajustados a mano.
3. **Verificación:** cada fase revisada en escritorio, móvil y modo claro antes de publicar.

---

## 7. Stack

**Título:** Con lo que trabajo
Fila 1: n8n · Claude · OpenAI · Motores de edición · Docker · PostgreSQL · Supabase
Fila 2: TypeScript · JavaScript · React · Tailwind · Linux VPS · Git · Cloudflare / Vercel

---

## 8. Trayectoria

**Antetítulo:** Trayectoria
**Título:** De dónde vengo

| Puesto | Fechas | Texto |
|---|---|---|
| **Fundador · Ponent Labs** | desde septiembre realmente 2026 – actualidad | Soluciones de automatización e IA a medida para negocios locales. |
| **Freelance · Automatización e IA** | Feb 2026 – Sept 2026  ¿sigue o se fundió con Ponent Labs? es en lo que ha evolucionado a ponentlabs | Sistema autónomo de gestión de pedidos para una distribuidora: +1.800 clientes, Docker y VPS. |
| **Mercadona** | Jun 2024 – Mar 2026 | Supervisión y resolución de incidencias en sistemas logísticos automatizados. Diagnóstico de fallos en líneas de producción. |
| **ITBACKING** | Sep 2023 – Dic 2023 | Desarrollo frontend en Angular y backend en ASP.NET Core, con bases de datos en SQL Server. |

**Formación:**
- **DAM** · Técnico Superior en Desarrollo de Aplicaciones Multiplataforma
- **Microsoft AI-900 y AI-102** · `[?]` ¿siguen en curso o ya tienes alguna? sigue en curso porque no he tenido tiempo y no he hecho nada

---

## 9. Contacto

**Título:**
- **A)** ¿Automatizamos?  ← el actual
- **B)** ¿Qué te quita horas cada semana? - este creo que es mejor para la conversión

**Texto:** Cuéntamelo en dos líneas. Si tiene solución, te digo cómo la plantearía; y si no la tiene, también te lo digo.
**Botones:** `Escríbeme por WhatsApp` · `Email` · `LinkedIn` · `GitHub`
**Pie:** © 2026 Carlos Cantos · Ponent Labs · Valencia

---

## 10. Agente "Pregúntale a Carlos" (respuestas pre-escritas)

**Saludo:** Hola, soy el asistente de Carlos. Respondo con lo que él me ha contado. ¿Qué quieres saber?

**Preguntas sugeridas (chips):** ¿Qué haces? · ¿Cuánto cuesta? · ¿Estás disponible? · ¿Con qué trabajas? · Enséñame un proyecto

| Intención | Respuesta |
|---|---|
| Qué haces | Automatizo procesos e integro IA en negocios. El ejemplo más claro: un sistema que recibe pedidos por WhatsApp y los registra solo, para +1.800 clientes. |
| Precio | Depende del proceso. Normalmente empiezo con una llamada corta y gratuita para ver si tiene sentido, y luego paso un presupuesto cerrado. `[?]` ¿mencionamos un "desde X €"? | No lo mencionamos
| Disponibilidad | Ahora mismo acepto proyectos a través de Ponent Labs. `[?]` ¿y ofertas de empleo, sí o no? | también ofertas de empleo pero habría que revisar que me proponen
| Stack | n8n para orquestar, Claude y OpenAI para la IA, Docker en VPS para desplegar y PostgreSQL/Supabase para los datos. |
| Proyectos | Te llevo a la sección de proyectos → (hace scroll) |
| Contacto | Lo más rápido es WhatsApp: [botón]. También por email o LinkedIn. |
| Sin entender | Esa no me la sé. Mejor pregúntaselo a Carlos directamente: [WhatsApp] |
| Sobre el propio bot | Soy un asistente sencillo con respuestas preparadas por Carlos, sin modelo de lenguaje detrás. Así nadie puede gastarle la API 😉 | esta me ha molado xd

---

## Resumen de lo que necesito de ti

1. Elegir A/B en el hero (titular y texto) y en el título de contacto.
2. Confirmar los `[?]`: cuarta cifra, si se nombra el sector de la distribuidora, el crédito del edit, fechas de Ponent Labs y del freelance, estado de AI-900/AI-102, precio "desde" y si aceptas ofertas de empleo.
3. Si quitamos algún proyecto.
4. Cualquier frase que no te suene a ti.

> **Actualización 2026-11-09:** el caso de éxito va en pasado. El proyecto con la distribuidora terminó en septiembre de 2026, así que la gráfica muestra solo jun–sep 2026 (valores ilustrativos) y los KPIs hablan del "mejor mes" (548 pedidos, 72 h, 48 s). Las cifras ya no cambian en cada visita y la consola del hero pone "demo".
