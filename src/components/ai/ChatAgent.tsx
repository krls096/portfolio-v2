import { useEffect, useRef, useState, type FormEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, Bot, MessageCircle, SendHorizontal, X } from 'lucide-react'
import type { ChatAction } from '../../content/types'
import { useContent } from '../../hooks/useContent'
import { scrollToSection, useUi } from '../../hooks/useUi'
import { matchIntent } from '../../lib/intents'
import { ease } from '../ui/motion'

type Message = { id: number; from: 'bot' | 'user'; text: string; action?: ChatAction; stream?: boolean }

// Muestra el texto poco a poco, como un modelo respondiendo en streaming
function StreamText({ text, onDone }: { text: string; onDone: () => void }) {
  const reduce = useReducedMotion()
  const [n, setN] = useState(reduce ? text.length : 0)
  useEffect(() => {
    if (n >= text.length) { onDone(); return }
    const id = setTimeout(() => setN(v => Math.min(text.length, v + 2)), 14)
    return () => clearTimeout(id)
  }, [n, text, onDone])
  return <>{text.slice(0, n)}{n < text.length && <span className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse rounded-sm bg-accent-2" />}</>
}

function ActionButton({ action, onScroll }: { action: ChatAction; onScroll: () => void }) {
  const cls = 'mt-2.5 inline-flex h-9 items-center gap-1.5 rounded-full bg-accent px-3.5 text-xs font-medium text-white transition-transform hover:-translate-y-0.5'
  if (action.kind === 'link') {
    return <a href={action.href} target="_blank" rel="noopener" className={cls}>{action.label} <ArrowUpRight size={14} aria-hidden /></a>
  }
  return (
    <button type="button" className={`${cls} cursor-pointer`} onClick={() => { onScroll(); scrollToSection(action.target) }}>
      {action.label}
    </button>
  )
}

export function ChatAgent() {
  const { chat } = useContent()
  const { chatOpen, setChatOpen } = useUi()
  const [messages, setMessages] = useState<Message[]>([])
  const [typing, setTyping] = useState(false)
  const [streaming, setStreaming] = useState(false)
  const [input, setInput] = useState('')
  const [used, setUsed] = useState<string[]>([])
  const nextId = useRef(1)
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const launcherRef = useRef<HTMLButtonElement>(null)
  const busy = typing || streaming

  // Al cambiar de idioma, la conversación empieza de nuevo en ese idioma
  useEffect(() => {
    setMessages([{ id: 0, from: 'bot', text: chat.greeting }])
    setUsed([])
  }, [chat])

  useEffect(() => {
    if (chatOpen) setTimeout(() => inputRef.current?.focus(), 250)
  }, [chatOpen])

  useEffect(() => {
    const el = listRef.current
    if (el) el.scrollTop = el.scrollHeight
  })

  useEffect(() => {
    if (!chatOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setChatOpen(false); launcherRef.current?.focus() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [chatOpen, setChatOpen])

  function ask(text: string, intentId?: string) {
    const q = text.trim()
    if (!q || busy) return
    const intent = intentId ? chat.intents.find(i => i.id === intentId) ?? null : matchIntent(q, chat)
    const reply = intent ?? chat.fallback
    if (intent) setUsed(u => (u.includes(intent.id) ? u : [...u, intent.id]))

    setMessages(m => [...m, { id: nextId.current++, from: 'user', text: q }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setStreaming(true)
      setMessages(m => [...m, { id: nextId.current++, from: 'bot', text: reply.answer, action: reply.action, stream: true }])
    }, 550)
  }

  // Al acabar el streaming el mensaje pasa a texto normal, así no vuelve a avisar en cada render
  function finishStream(id: number) {
    setMessages(m => m.map(x => (x.id === id ? { ...x, stream: false } : x)))
    setStreaming(false)
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    ask(input)
  }

  const suggestions = chat.suggestions.filter(s => !used.includes(s.intent))

  return (
    <>
      {/* Lanzador: encima del dock en móvil, abajo a la derecha en escritorio */}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => setChatOpen(!chatOpen)}
        aria-expanded={chatOpen}
        aria-controls="chat-panel"
        aria-label={chatOpen ? chat.close : chat.open}
        className="glass fixed right-4 bottom-[calc(max(1rem,env(safe-area-inset-bottom))+4.25rem)] z-50 inline-flex h-12 min-w-12 cursor-pointer items-center justify-center gap-2 rounded-full px-3.5 text-sm font-medium transition-transform hover:-translate-y-0.5 lg:right-6 lg:bottom-6 lg:px-5"
      >
        <span className="relative">
          {chatOpen ? <X size={20} aria-hidden /> : <MessageCircle size={20} className="text-accent-2" aria-hidden />}
          {!chatOpen && <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-success" aria-hidden="true" />}
        </span>
        <span className="hidden lg:inline">{chat.open}</span>
      </button>

      <AnimatePresence>
        {chatOpen && (
          <motion.div
            id="chat-panel"
            role="dialog"
            aria-label={chat.title}
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98, transition: { duration: 0.18 } }}
            transition={{ duration: 0.3, ease }}
            style={{ transformOrigin: 'bottom right' }}
            className="glass glass-strong fixed right-4 bottom-[calc(max(1rem,env(safe-area-inset-bottom))+8rem)] z-50 flex h-[min(560px,calc(100svh-11rem))] w-[calc(100vw-2rem)] max-w-[400px] flex-col overflow-hidden rounded-3xl lg:right-6 lg:bottom-22"
          >
            <header className="flex items-center gap-3 border-b border-glass-border px-4 py-3.5">
              <span className="inline-flex size-9 items-center justify-center rounded-full bg-accent text-white shadow-[0_0_20px_-4px_var(--accent)]">
                <Bot size={18} aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-sm font-semibold">{chat.title}</p>
                <p className="text-xs text-muted">{chat.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={() => { setChatOpen(false); launcherRef.current?.focus() }}
                aria-label={chat.close}
                className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full text-muted transition-colors hover:bg-glass hover:text-fg"
              >
                <X size={18} aria-hidden />
              </button>
            </header>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4" aria-live="polite">
              {messages.map(m => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease }}
                  className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${m.from === 'user' ? 'rounded-br-md bg-accent text-white' : 'glass rounded-bl-md'}`}>
                    {m.stream ? <StreamText text={m.text} onDone={() => finishStream(m.id)} /> : m.text}
                    {/* El botón aparece cuando la respuesta ha terminado de escribirse */}
                    {m.action && !m.stream && (
                      <div><ActionButton action={m.action} onScroll={() => setChatOpen(false)} /></div>
                    )}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <div className="flex justify-start" aria-label={chat.typing}>
                  <div className="glass inline-flex gap-1 rounded-2xl rounded-bl-md px-4 py-3.5" aria-hidden="true">
                    {[0, 1, 2].map(i => (
                      <motion.span
                        key={i}
                        className="size-1.5 rounded-full bg-fg/60"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {suggestions.length > 0 && (
              <div className="flex gap-2 overflow-x-auto px-4 pb-3 [scrollbar-width:none]">
                {suggestions.map(s => (
                  <button
                    key={s.intent}
                    type="button"
                    disabled={busy}
                    onClick={() => ask(s.label, s.intent)}
                    className="glass shrink-0 cursor-pointer whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors hover:text-accent-2 disabled:opacity-50"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-glass-border p-3">
              <label htmlFor="chat-input" className="sr-only">{chat.placeholder}</label>
              <input
                id="chat-input"
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={chat.placeholder}
                maxLength={200}
                autoComplete="off"
                className="h-11 min-w-0 flex-1 rounded-full bg-fg/5 px-4 text-base text-fg placeholder:text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-2 sm:text-sm"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label={chat.send}
                className="inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-accent text-white transition-opacity disabled:opacity-40"
              >
                <SendHorizontal size={18} aria-hidden />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
