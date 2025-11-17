import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Conductor from 'App/Models/Conductor';
import EmailNotification from 'App/Services/EmailNotification';
import SecurityService from 'App/Services/SecurityService';
import ConductorValidator from 'App/Validators/ConductorValidator';

export default class ConductorsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            return await Conductor.find(params.id);
        }

        const data = request.all();
        if ("page" in data && "per_page" in data) {
            const page = request.input("page", 1);
            const perPage = request.input("per_page", 20);
            return await Conductor.query().paginate(page, perPage);
        }

        return await Conductor.query();
    }

    public async create({ request, response }: HttpContextContract) {
        const body = await request.validate(ConductorValidator);

        const user = await SecurityService.getUserById(body.idUser) as { name: string; email: string } | null
        if (!user) {
            return response.badRequest({ message: 'Usuario no encontrado en ms_seguridad' })
        }

        const existing = await Conductor.query().where('id_user', body.idUser).first()
        if (existing) {
            return response.badRequest({ message: 'Este usuario ya tiene un conductor asociado' })
        }

        const conductor = await Conductor.create({
            ...body, // experiencia, etc.
            idUser: body.idUser,
            nombre: user.name,
            email: user.email,
        })

        return response.created(conductor)
    }

    public async deleteByUserId({ params, response }: HttpContextContract) {
        const { userId } = params;

        const conductor = await Conductor.query().where("id_user", userId).first();

        if (!conductor) {
            return response
            .status(404)
            .json({ message: "Conductor no encontrado" });
        }

        await conductor.delete();
        return response.status(204);
    }

    public async sendAlert({ request, response }: HttpContextContract) {
    try {
        const payload = request.only(['message']) // solo necesitas el mensaje desde el body

        // 1️⃣ Traer todos los conductores
        const conductores = await Conductor.query().select('email', 'nombre')
        if (conductores.length === 0) {
            return response.status(404).json({ message: 'No hay conductores para notificar' })
        }

        // 2️⃣ Enviar notificación a cada conductor
        for (const c of conductores) {
        await EmailNotification.sendNotification({
            to: c.email,
            name: c.nombre,
            message: payload.message
        })
        }

        return response.ok({ status: 'success', message: 'Notificaciones enviadas a todos los conductores' })
    } catch (error) {
        console.error(error)
        return response.status(500).json({ status: 'error', details: error.message })
    }
    }


}
