import type { ChatContent } from './types'

// Respuestas pre-escritas del asistente. No hay modelo de lenguaje detrás: todo corre en el navegador.
const WHATSAPP = 'https://wa.me/34644226771'

export const chatEs: ChatContent = {
  open: 'Pregúntale a Carlos',
  title: 'Asistente de Carlos',
  subtitle: 'Respuestas preparadas por él',
  greeting: 'Hola, soy el asistente de Carlos. Respondo con lo que él me ha contado. ¿Qué quieres saber?',
  placeholder: 'Escribe tu pregunta…',
  send: 'Enviar',
  close: 'Cerrar chat',
  typing: 'Escribiendo…',
  suggestions: [
    { label: '¿Qué haces?', intent: 'what' },
    { label: '¿Cuánto cuesta?', intent: 'price' },
    { label: '¿Estás disponible?', intent: 'availability' },
    { label: '¿Con qué trabajas?', intent: 'stack' },
    { label: 'Enséñame un proyecto', intent: 'projects' },
  ],
  intents: [
    {
      id: 'what',
      keywords: ['que haces', 'a que te dedicas', 'dedicas', 'servicio', 'ofreces', 'automatiz', 'haces'],
      answer: 'Automatizo procesos e integro IA en negocios. El ejemplo más claro: un sistema que recibía pedidos por WhatsApp y los registraba solo, para +1.800 clientes.',
      action: { kind: 'scroll', target: 'servicios', label: 'Ver servicios' },
    },
    {
      id: 'price',
      keywords: ['precio', 'cuesta', 'cuanto', 'tarifa', 'presupuesto', 'coste', 'cobras', 'barato', 'caro'],
      answer: 'Depende del proceso. Normalmente empiezo con una llamada corta y gratuita para ver si tiene sentido, y luego paso un presupuesto cerrado.',
      action: { kind: 'link', href: WHATSAPP, label: 'Pedir la llamada' },
    },
    {
      id: 'availability',
      keywords: ['disponible', 'disponibilidad', 'contratar', 'empleo', 'oferta', 'vacante', 'incorporar', 'puesto', 'freelance', 'cuando puedes'],
      answer: 'Ahora mismo acepto proyectos a través de Ponent Labs. Y también escucho ofertas de empleo, siempre que encajen con lo que hago: cuéntale qué tienes en mente.',
      action: { kind: 'link', href: WHATSAPP, label: 'Escribirle por WhatsApp' },
    },
    {
      id: 'stack',
      keywords: ['stack', 'tecnolog', 'herramienta', 'con que trabajas', 'n8n', 'lenguaje', 'usas', 'docker', 'react'],
      answer: 'n8n para orquestar, Claude y OpenAI para la IA, Docker en VPS para desplegar y PostgreSQL/Supabase para los datos.',
    },
    {
      id: 'projects',
      keywords: ['proyecto', 'ejemplo', 'portfolio', 'caso', 'trabajos', 'ensena', 'demo', 'reel', 'video'],
      answer: 'Te llevo a la sección de proyectos: Ponent Labs, Umbral, el pipeline de vídeo con IA y más.',
      action: { kind: 'scroll', target: 'proyectos', label: 'Ir a proyectos' },
    },
    {
      id: 'ponent',
      keywords: ['ponent', 'umbral', 'empresa', 'marca', 'agencia', 'inmobiliaria'],
      answer: 'Ponent Labs es su marca: soluciones a medida para negocios de la Comunitat Valenciana. Umbral es su producto para inmobiliarias, para que ningún contacto se quede esperando.',
      action: { kind: 'link', href: 'https://ponentlabs.com', label: 'Visitar ponentlabs.com' },
    },
    {
      id: 'contact',
      keywords: ['contacto', 'contactar', 'whatsapp', 'email', 'correo', 'telefono', 'llamar', 'hablar', 'escribir', 'linkedin'],
      answer: 'Lo más rápido es WhatsApp. También por email o LinkedIn, al final de la página.',
      action: { kind: 'link', href: WHATSAPP, label: 'Abrir WhatsApp' },
    },
    {
      id: 'bot',
      keywords: ['bot', 'eres', 'ia', 'chatgpt', 'gpt', 'modelo', 'api', 'quien eres', 'robot', 'real'],
      answer: 'Soy un asistente sencillo con respuestas preparadas por Carlos, sin modelo de lenguaje detrás. Así nadie puede gastarle la API 😉',
    },
    {
      id: 'hello',
      keywords: ['hola', 'buenas', 'hey', 'saludos', 'buenos dias', 'buenas tardes'],
      answer: '¡Hola! Pregúntame por lo que hace Carlos, sus proyectos, su disponibilidad o cómo contactarle.',
    },
    {
      id: 'thanks',
      keywords: ['gracias', 'genial', 'perfecto', 'vale'],
      answer: '¡A ti! Si quieres seguir la conversación con Carlos en persona, el WhatsApp está a un clic.',
      action: { kind: 'link', href: WHATSAPP, label: 'Abrir WhatsApp' },
    },
  ],
  fallback: {
    answer: 'Esa no me la sé. Mejor pregúntaselo a Carlos directamente:',
    action: { kind: 'link', href: WHATSAPP, label: 'Preguntar por WhatsApp' },
  },
}

export const chatEn: ChatContent = {
  open: 'Ask Carlos',
  title: 'Carlos’s assistant',
  subtitle: 'Answers written by him',
  greeting: 'Hi, I’m Carlos’s assistant. I answer with what he’s told me. What would you like to know?',
  placeholder: 'Type your question…',
  send: 'Send',
  close: 'Close chat',
  typing: 'Typing…',
  suggestions: [
    { label: 'What do you do?', intent: 'what' },
    { label: 'How much does it cost?', intent: 'price' },
    { label: 'Are you available?', intent: 'availability' },
    { label: 'What’s your stack?', intent: 'stack' },
    { label: 'Show me a project', intent: 'projects' },
  ],
  intents: [
    {
      id: 'what',
      keywords: ['what do you do', 'do you do', 'service', 'offer', 'automat', 'job'],
      answer: 'I automate processes and integrate AI into businesses. The clearest example: a system that took orders on WhatsApp and recorded them on its own, for 1,800+ clients.',
      action: { kind: 'scroll', target: 'servicios', label: 'See services' },
    },
    {
      id: 'price',
      keywords: ['price', 'cost', 'how much', 'rate', 'quote', 'budget', 'charge', 'cheap', 'expensive'],
      answer: 'It depends on the process. I usually start with a short, free call to see if it makes sense, and then send a fixed quote.',
      action: { kind: 'link', href: WHATSAPP, label: 'Book the call' },
    },
    {
      id: 'availability',
      keywords: ['available', 'availability', 'hire', 'hiring', 'employment', 'position', 'vacancy', 'join', 'freelance', 'role'],
      answer: 'Right now he takes on projects through Ponent Labs. He’s also open to job offers, as long as they fit what he does: tell him what you have in mind.',
      action: { kind: 'link', href: WHATSAPP, label: 'Message him on WhatsApp' },
    },
    {
      id: 'stack',
      keywords: ['stack', 'technolog', 'tool', 'work with', 'n8n', 'language', 'use', 'docker', 'react'],
      answer: 'n8n to orchestrate, Claude and OpenAI for the AI, Docker on a VPS to deploy and PostgreSQL/Supabase for the data.',
    },
    {
      id: 'projects',
      keywords: ['project', 'example', 'portfolio', 'case', 'work', 'show', 'demo', 'reel', 'video'],
      answer: 'Taking you to the projects: Ponent Labs, Umbral, the AI video pipeline and more.',
      action: { kind: 'scroll', target: 'proyectos', label: 'Go to projects' },
    },
    {
      id: 'ponent',
      keywords: ['ponent', 'umbral', 'company', 'brand', 'agency', 'real estate'],
      answer: 'Ponent Labs is his brand: custom solutions for businesses in the Valencia region. Umbral is its product for real-estate agencies, so no contact is left waiting.',
      action: { kind: 'link', href: 'https://ponentlabs.com', label: 'Visit ponentlabs.com' },
    },
    {
      id: 'contact',
      keywords: ['contact', 'whatsapp', 'email', 'mail', 'phone', 'call', 'talk', 'reach', 'linkedin'],
      answer: 'WhatsApp is the fastest. Email and LinkedIn are at the bottom of the page too.',
      action: { kind: 'link', href: WHATSAPP, label: 'Open WhatsApp' },
    },
    {
      id: 'bot',
      keywords: ['bot', 'are you', 'ai', 'chatgpt', 'gpt', 'model', 'api', 'who are you', 'robot', 'real'],
      answer: 'I’m a simple assistant with answers written by Carlos, no language model behind me. That way nobody can burn through his API 😉',
    },
    {
      id: 'hello',
      keywords: ['hello', 'hi', 'hey', 'good morning', 'greetings'],
      answer: 'Hi! Ask me about what Carlos does, his projects, his availability or how to reach him.',
    },
    {
      id: 'thanks',
      keywords: ['thanks', 'thank you', 'great', 'perfect', 'cool'],
      answer: 'You’re welcome! If you want to keep talking with Carlos himself, WhatsApp is one click away.',
      action: { kind: 'link', href: WHATSAPP, label: 'Open WhatsApp' },
    },
  ],
  fallback: {
    answer: 'I don’t know that one. Better ask Carlos directly:',
    action: { kind: 'link', href: WHATSAPP, label: 'Ask on WhatsApp' },
  },
}
