import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Guide from 'App/Models/Guide'
import GuideValidator from 'App/Valiators/GuideValidator'
import Ws from 'App/Services/Ws'

export default class GuidesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Guide.findOrFail(params.id)
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Guide.query().paginate(page, perPage)
      } else {
        return await Guide.query()
      }
    }
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
    response.status(204)
    return await guide.delete()
  }
}
