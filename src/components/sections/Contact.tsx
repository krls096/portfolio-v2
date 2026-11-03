import { motion } from 'motion/react'
import { ArrowUpRight, Mail, MessageCircle } from 'lucide-react'
import { useContent } from '../../hooks/useContent'
import { GlassButton } from '../glass/GlassButton'
import { GlassPanel } from '../glass/GlassPanel'
import { reveal, sectionClass } from '../ui/motion'

const WHATSAPP = 'https://wa.me/34644226771'
const EMAIL = 'mailto:krls096mus@gmail.com'

export function Contact() {
  const { contact, footer } = useContent()
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
              <GlassButton href={EMAIL}><Mail size={18} aria-hidden /> {contact.email}</GlassButton>
              <GlassButton variant="ghost" href="https://www.linkedin.com/in/carlos-cantos-blasco-650023437/">LinkedIn <ArrowUpRight size={18} aria-hidden /></GlassButton>
              <GlassButton variant="ghost" href="https://github.com/krls096">GitHub <ArrowUpRight size={18} aria-hidden /></GlassButton>
            </div>
          </GlassPanel>
        </motion.div>
      </section>

      <footer className="px-4 pb-28 pt-4 text-center text-sm text-muted lg:pb-10">{footer}</footer>
    </>
  )
}
