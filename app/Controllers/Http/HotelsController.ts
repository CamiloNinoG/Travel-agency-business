import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hotel from 'App/Models/Hotel'
import HotelValidator from 'App/Validators/HotelValidator'
import Ws from 'App/Services/Ws'
import HotelUpdateValidator from 'App/Validators/HotelUpdateValidator'

export default class HotelsController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      const hotel = await Hotel.findOrFail(params.id)
      await hotel.load('rooms')
      return hotel
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Hotel.query().paginate(page, perPage)
      } else {
        return await Hotel.query().preload('rooms')
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    const body = await request.validate(HotelValidator)
    const hotel = await Hotel.create(body)
    Ws.io.emit('notifications', { message: 'Nuevo hotel registrado' })
    return hotel
  }

  public async update({ params, request }: HttpContextContract) {
    const hotel = await Hotel.findOrFail(params.id)
    const payload = await request.validate(HotelUpdateValidator)
    hotel.merge(payload)
    await hotel.save()
    return hotel
  }

  public async delete({ params, response }: HttpContextContract) {
    const hotel = await Hotel.findOrFail(params.id)
    response.status(204)
    return await hotel.delete()
  }
}
