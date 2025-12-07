import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ServiceTransport from 'App/Models/ServiceTransport'
import ServiceTransportValidator from 'App/Validators/ServiceTransportValidator'
import DistanceService from 'App/Services/LocationService'
import Route from 'App/Models/Route'
import City from 'App/Models/City'

export default class ServiceTransportsController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      const service = await ServiceTransport.findOrFail(params.id)
      await service.load('vehicule')
      return service
    } else {
      const page = request.input('page', 1)
      const perPage = request.input('per_page', 20)
      return await ServiceTransport.query().paginate(page, perPage)
    }
  }

  public async create({ request }: HttpContextContract) {
    const data = await request.validate(ServiceTransportValidator)

    if (!data.price) {
      const routeInfo = await Route.findOrFail(data.id_route)

      const idOrigin = routeInfo.idOrigin
      const idDestination = routeInfo.idDestination

      const originCity = await City.findOrFail(idOrigin)
      const destinationCity = await City.findOrFail(idDestination)

      const originName = `${originCity.name}, ${originCity.ubication}`
      const destinationName = `${destinationCity.name}, ${destinationCity.ubication}`

      const originCoords = await DistanceService.getCoordinates(originName)
      const destinationCoords = await DistanceService.getCoordinates(destinationName)

      const distanceData = await DistanceService.getDistance(originCoords, destinationCoords)

      data.price = distanceData.distanceKm
    }

    if (!data.end_date){
      data.end_date = data.start_date.plus({ days: 1 })
    }
    return await ServiceTransport.create(data)
  }

  public async findByRoute({ params, response }: HttpContextContract) {
    const routeId = params.routeId;

    const service = await ServiceTransport
      .query()
      .where("id_route", routeId)
      .preload("vehicule")
      .first();

    if (!service) {
      return response.status(404).json({
        message: "No existe un servicio de transporte para esta ruta",
      });
    }

    return service;
  }

  public async update({ params, request }: HttpContextContract) {
    const service = await ServiceTransport.findOrFail(params.id)
    const data = await request.validate(ServiceTransportValidator)
    service.merge(data)
    await service.save()
    return service
  }

  public async delete({ params, response }: HttpContextContract) {
    const service = await ServiceTransport.findOrFail(params.id)
    await service.delete()
    return response.status(204)
  }
}
