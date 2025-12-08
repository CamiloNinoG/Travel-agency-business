import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Room from 'App/Models/Room'
import RoomValidator from 'App/Validators/RoomValidator'
import Ws from 'App/Services/Ws'

export default class RoomsController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      const room = await Room.findOrFail(params.id)
      await room.load('hotel')
      return room
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Room.query().paginate(page, perPage)
      } else {
        return await Room.query()
      }
    }
  }

  public async findByHotel({ params }: HttpContextContract) {
    const hotelId = params.hotelId;
    const rooms = await Room
      .query()
      .where("id_hotel", hotelId)

    return rooms;
  }

  public async create({ request }: HttpContextContract) {
    const body = await request.validate(RoomValidator)
    const room = await Room.create(body)
    Ws.io.emit('notifications', { message: 'Nueva habitación registrada' })
    return room
  }

  public async update({ params, request }: HttpContextContract) {
    const room = await Room.findOrFail(params.id)
    const payload = await request.validate(RoomValidator)
    room.merge(payload)
    await room.save()
    return room
  }

  public async delete({ params, response }: HttpContextContract) {
    const room = await Room.findOrFail(params.id)
    response.status(204)
    return await room.delete()
  }
}
