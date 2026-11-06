// Datos de contacto compartidos por la sección de contacto y la paleta
export const EMAIL = 'contacto@ponentlabs.com'
export const WHATSAPP = 'https://wa.me/34644226771'

// "mailto:" depende de que el visitante tenga un programa de correo configurado; si no lo tiene,
// el navegador no hace nada. Abrimos directamente la ventana de redactar de Gmail, con el destinatario puesto.
export function gmailCompose(subject: string) {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${encodeURIComponent(subject)}`
}

// Copia al portapapeles. Si el navegador no deja usar la API moderna (permisos, http, iframes),
// prueba con el método clásico; devuelve false si no ha podido copiar.
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const area = document.createElement('textarea')
    area.value = text
    area.setAttribute('readonly', '')
    area.style.cssText = 'position:fixed;opacity:0;pointer-events:none'
    document.body.appendChild(area)
    area.select()
    let ok = false
    try { ok = document.execCommand('copy') } catch { ok = false }
    area.remove()
    return ok
  }
}
