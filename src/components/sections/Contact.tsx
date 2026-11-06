import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight, Check, Copy, Mail, MessageCircle } from 'lucide-react'
import { useContent } from '../../hooks/useContent'
import { usePreferences } from '../../hooks/usePreferences'
import { EMAIL, WHATSAPP, copyText, gmailCompose } from '../../lib/contact'
import { GlassButton } from '../glass/GlassButton'
import { GlassPanel } from '../glass/GlassPanel'
import { reveal, sectionClass } from '../ui/motion'

export function Contact() {
  const { contact, footer } = useContent()
  const { t } = usePreferences()
  const [copied, setCopied] = useState(false)
  const [showEmail, setShowEmail] = useState(false)

  // Para quien no use Gmail: copia la dirección y avisa un par de segundos.
  // Si el navegador no deja copiar, la enseña en pantalla para copiarla a mano.
  async function copyEmail() {
    if (await copyText(EMAIL)) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } else {
      setShowEmail(true)
    }
  }

  return (
    <>
      <section id="contacto" className={sectionClass}>
        <motion.div {...reveal()}>
          <GlassPanel className="relative overflow-hidden px-6 py-14 text-center md:py-20">
            <div className="pointer-events-none absolute -top-24 left-1/2 size-72 -translate-x-1/2 rounded-full bg-accent/30 blur-3xl" aria-hidden="true" />
            <h2 className="relative mx-auto max-w-3xl font-display text-4xl font-bold tracking-[-0.04em] md:text-6xl">{contact.title}</h2>
            <p className="relative mx-auto mt-5 max-w-xl text-lg text-muted">{contact.body}</p>
            <div className="relative mt-9 flex flex-wrap justify-center gap-3">
              <GlassButton variant="primary" href={WHATSAPP}><MessageCircle size={18} aria-hidden /> {contact.whatsapp}</GlassButton>
              <div className="inline-flex items-center gap-1.5">
                <GlassButton href={gmailCompose(t('action.emailSubject'))} title={EMAIL}><Mail size={18} aria-hidden /> {contact.email}</GlassButton>
                <GlassButton onClick={copyEmail} className="w-12 !px-0" aria-label={copied ? t('action.copied') : t('action.email')} title={copied ? t('action.copied') : t('action.email')}>
                  {copied ? <Check size={18} className="text-success" aria-hidden /> : <Copy size={18} aria-hidden />}
                </GlassButton>
                <span className="sr-only" aria-live="polite">{copied ? t('action.copied') : ''}</span>
              </div>
              <GlassButton variant="ghost" href="https://www.linkedin.com/in/carlos-cantos-blasco-650023437/">LinkedIn <ArrowUpRight size={18} aria-hidden /></GlassButton>
              <GlassButton variant="ghost" href="https://github.com/krls096">GitHub <ArrowUpRight size={18} aria-hidden /></GlassButton>
            </div>
            {showEmail && <p className="relative mt-5 select-all font-mono text-sm text-fg">{EMAIL}</p>}
          </GlassPanel>
        </motion.div>
      </section>

      <footer className="px-4 pb-28 pt-4 text-center text-sm text-muted lg:pb-10">{footer}</footer>
    </>
  )
}
