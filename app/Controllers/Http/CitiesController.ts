import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import City from 'App/Models/City'
import CityValidator from 'App/Validators/CityValidator'
// import Ws from 'App/Services/Ws'

export default class CitiesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      const city = await City.findOrFail(params.id)
      await city.load('hotels')
      return city
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await City.query().paginate(page, perPage)
      } else {
        return await City.query()
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    const body = await request.validate(CityValidator)
    const city = await City.create(body)
    // Ws.io.emit('notifications', { message: 'Nueva ciudad registrada' })
    return city
  }

  public async update({ params, request }: HttpContextContract) {
    const city = await City.findOrFail(params.id)
    const payload = await request.validate(CityValidator)
    city.merge(payload)
    await city.save()
    return city
  }

  public async delete({ params, response }: HttpContextContract) {
    const city = await City.findOrFail(params.id)
    response.status(204)
    return await city.delete()
  }
}
