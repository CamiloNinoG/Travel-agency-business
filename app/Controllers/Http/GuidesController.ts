import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Guide from 'App/Models/Guide'
import GuideValidator from 'App/Validators/GuideValidator'
import Ws from 'App/Services/Ws'

export default class GuidesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Guide.findOrFail(params.id)
    }

    const data = request.all()
    if ('page' in data && 'per_page' in data) {
      const page = request.input('page', 1)
      const perPage = request.input('per_page', 20)
      return await Guide.query().paginate(page, perPage)
    }

    return await Guide.query()
  }

  public async create({ request }: HttpContextContract) {
    const body = await request.validate(GuideValidator)
    const guide = await Guide.create(body)
    Ws.io.emit('notifications', { message: 'Nuevo guía creado' })
    return guide
  }

  public async update({ params, request }: HttpContextContract) {
    const guide = await Guide.findOrFail(params.id)
    const payload = await request.validate(GuideValidator)
    guide.merge(payload)
    await guide.save()
    return guide
  }

  public async delete({ params, response }: HttpContextContract) {
    const guide = await Guide.findOrFail(params.id)
    await guide.delete()
    return response.status(204)
  }

  public async deleteByUserId({ params, response }: HttpContextContract) {
      const { userId } = params;
  
      const admin = await Guide.query().where("id_user", userId).first();
  
      if (!admin) {
        return response
          .status(404)
          .json({ message: "guia no encontrado" });
      }
  
      await admin.delete();
      return response.status(204);
    }
}
