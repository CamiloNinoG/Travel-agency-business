import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'
import admin from 'firebase-admin'

// Inicializa Firebase Admin una sola vez
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: Env.get('FIREBASE_PROJECT_ID'),
      clientEmail: Env.get('FIREBASE_CLIENT_EMAIL'),
      privateKey: Env.get('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n'),
    }),
  })
}

export default class Security {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    const theRequest = request.toJSON()
    const authHeader = theRequest.headers.authorization

    if (!authHeader) {
      return response.status(401).json({ message: 'No authorization header provided' })
    }

    try {
      // Detecta si es un token de Firebase o uno personalizado
      let token = authHeader.replace(/^Bearer |^OAuth /, '')
      let isFirebaseToken = authHeader.startsWith('OAuth')
      let isCustomToken = authHeader.startsWith('Bearer')

      if (isCustomToken) {
        // ===============================
        // 🔹 TOKEN PERSONALIZADO (ms-security)
        // ===============================
        const thePermission = {
          url: theRequest.url,
          method: theRequest.method,
        }

        const result = await axios.post(
          `${Env.get('MS_SECURITY')}/api/public/security/permissions-validation`,
          thePermission,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (result.data === true) {
          await next()
        } else {
          return response.status(401).json({ message: 'Unauthorized by ms-security' })
        }
      } else if (isFirebaseToken) {
        // ===============================
        // 🔹 TOKEN FIREBASE (OAuth)
        // ===============================
        const decoded = await admin.auth().verifyIdToken(token)
        console.log('✅ Firebase token válido para UID:', decoded.uid)

        // Aquí puedes validar roles, claims personalizados, o continuar
        await next()
      } else {
        return response.status(401).json({ message: 'Invalid token format' })
      }
    } catch (error) {
      console.error('❌ Error en Security middleware:', error)
      return response.status(401).json({ message: 'Invalid or expired token' })
    }
  }
}
