import { Analytics } from '@vercel/analytics/react'
import { ChatAgent } from './components/ai/ChatAgent'
import { CommandPalette } from './components/ai/CommandPalette'
import { AmbientBackground } from './components/background/AmbientBackground'
import { Controls } from './components/glass/Controls'
import { Dock } from './components/glass/Dock'
import { CaseStudy } from './components/sections/CaseStudy'
import { Contact } from './components/sections/Contact'
import { Experience } from './components/sections/Experience'
import { Hero } from './components/sections/Hero'
import { Kpis } from './components/sections/Kpis'
import { Method } from './components/sections/Method'
import { Projects } from './components/sections/Projects'
import { Services } from './components/sections/Services'
import { Stack } from './components/sections/Stack'

export default function App() {
  return (
    <>
      <AmbientBackground />
      <Dock />

      <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <a href="#inicio" className="glass inline-flex h-11 items-center rounded-full px-4 font-display font-semibold tracking-tight">
            Carlos<span className="text-accent-2">.</span>
          </a>
          <Controls />
        </div>
      </header>

      <main>
        <Hero />
        <Kpis />
        <Services />
        <CaseStudy />
        <Projects />
        <Method />
        <Stack />
        <Experience />
        <Contact />
      </main>

      <ChatAgent />
      <CommandPalette />
      <Analytics />
    </>
  )
}
