import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ItineraryRoom from 'App/Models/ItineraryRoom'
import ItineraryRoomValidator from 'App/Validators/ItineraryRoomValidator'

export default class ItineraryRoomsController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await ItineraryRoom.findOrFail(params.id)
    } else {
      const page = request.input('page', 1)
      const perPage = request.input('per_page', 20)
      return await ItineraryRoom.query().paginate(page, perPage)
    }
  }

  public async create({ request }: HttpContextContract) {
    const data = await request.validate(ItineraryRoomValidator)
    return await ItineraryRoom.create(data)
  }

  public async update({ params, request }: HttpContextContract) {
    const itineraryRoom = await ItineraryRoom.findOrFail(params.id)
    const data = await request.validate(ItineraryRoomValidator)
    itineraryRoom.merge(data)
    await itineraryRoom.save()
    return itineraryRoom
  }

  public async delete({ params, response }: HttpContextContract) {
    const itineraryRoom = await ItineraryRoom.findOrFail(params.id)
    await itineraryRoom.delete()
    return response.status(204)
  }
}
