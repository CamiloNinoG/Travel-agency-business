import Env from '@ioc:Adonis/Core/Env'

export default class SecurityService {
    public static async getUserById(id: string) {
        const baseUrl = Env.get('MS_NOTIFICATION')
        const res = await fetch(`${baseUrl}/api/users/${id}`)
        if (res.status !== 200) {
            return null
        }

        const text = await res.text()

        if (!text) {
            return null
        }
        
        return JSON.parse(text) as { name: string; email: string }
    }
}
