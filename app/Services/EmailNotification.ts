import Env from '@ioc:Adonis/Core/Env'

export default class EmailNotification {
public static async sendNotification(payload: Record<string, any>) {
    try {
      const baseUrl = Env.get('MS_NOTIFICATION')
      const url = `${baseUrl}/alert-notification` 

      console.log("url", url)

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        console.error(`❌ Error enviando notificación: ${res.status} ${res.statusText}`)
        return false
      }

      console.log(`📧 Notificación enviada correctamente a ${payload.to || 'destinatarios'}`)
      return true

    } catch (error: any) {
      console.error(`❌ Error enviando notificación: ${error.message}`)
      return false
    }
  }
}