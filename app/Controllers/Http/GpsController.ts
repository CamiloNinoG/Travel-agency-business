import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Gps from 'App/Models/Gp'
import GpsValidator from 'App/Validators/GpValidator'

export default class GpsController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      const gps = await Gps.findOrFail(params.id)
      await gps.load('vehicule')
      return gps
    } else {
      const page = request.input('page', 1)
      const perPage = request.input('per_page', 20)
      const pagination = await Gps.query().paginate(page, perPage)
      return pagination.toJSON().data
    }
  }

  public async create({ request }: HttpContextContract) {
    const data = await request.validate(GpsValidator)
    return await Gps.create(data)
  }

  public async update({ params, request }: HttpContextContract) {
    const gps = await Gps.findOrFail(params.id)
    const data = await request.validate(GpsValidator)
    gps.merge(data)
    await gps.save()
    return gps
  }

  public async delete({ params, response }: HttpContextContract) {
    const gps = await Gps.findOrFail(params.id)
    await gps.delete()
    return response.status(204)
  }
}
