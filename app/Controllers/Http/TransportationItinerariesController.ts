import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TransportationItinerary from 'App/Models/TransportationItinerary'
import TransportationItineraryValidator from 'App/Validators/TransportationItineraryValidator'

export default class TransportationItinerariesController {
  public async find({ request, params }: HttpContextContract) {
    // Si viene un ID -> devolver solo ese registro
    if (params.id) {
      return await TransportationItinerary.findOrFail(params.id)
    }
  
    // Si vienen parámetros de paginación -> devolver con meta/data
    const data = request.all()
    if ('page' in data && 'per_page' in data) {
      const page = request.input('page', 1)
      const perPage = request.input('per_page', 20)
      return await TransportationItinerary.query().paginate(page, perPage)
    }
  
    // Si no hay paginación -> devolver todos los registros
    return await TransportationItinerary.query()
  }

  public async create({ request }: HttpContextContract) {
    const data = await request.validate(TransportationItineraryValidator)
    return await TransportationItinerary.create(data)
  }

  public async update({ params, request }: HttpContextContract) {
    const itinerary = await TransportationItinerary.findOrFail(params.id)
    const data = await request.validate(TransportationItineraryValidator)
    itinerary.merge(data)
    await itinerary.save()
    return itinerary
  }

  public async delete({ params, response }: HttpContextContract) {
    const itinerary = await TransportationItinerary.findOrFail(params.id)
    await itinerary.delete()
    return response.status(204)
  }
}
