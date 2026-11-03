import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'motion/react'
import App from './App'
import { PreferencesProvider } from './hooks/usePreferences'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Respeta "reducir movimiento" del sistema en todas las animaciones de Motion */}
    <MotionConfig reducedMotion="user">
      <PreferencesProvider>
        <App />
      </PreferencesProvider>
    </MotionConfig>
  </StrictMode>,
)
