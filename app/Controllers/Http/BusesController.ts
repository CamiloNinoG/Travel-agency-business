import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Bus from 'App/Models/Bus'
import BusValidator from 'App/Validators/BusValidator'

export default class BusesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      const bus = await Bus.findOrFail(params.id)
      await bus.load('vehicule')
      return bus
    } else {
      const page = request.input('page', 1)
      const perPage = request.input('per_page', 20)

      const pagination = await Bus.query().paginate(page, perPage)
      return pagination.toJSON().data
    }
  }

  public async findByHotel({ params }: HttpContextContract) {
    const buses = await Bus.query().where('hotel_id', params.hotelId)
    return buses
  }

  public async create({ request }: HttpContextContract) {
    const data = await request.validate(BusValidator)
    return await Bus.create(data)
  }

  public async update({ params, request }: HttpContextContract) {
    const bus = await Bus.findOrFail(params.id)
    const data = await request.validate(BusValidator)
    bus.merge(data)
    await bus.save()
    return bus
  }

  public async delete({ params, response }: HttpContextContract) {
    const bus = await Bus.findOrFail(params.id)
    await bus.delete()
    return response.status(204)
  }
}
