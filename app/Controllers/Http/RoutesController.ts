import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from 'App/Models/Route'
import City from 'App/Models/City'
import RouteValidator from 'App/Validators/RouteValidator'
import DistanceService from 'App/Services/LocationService'

export default class RoutesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      const route = await Route.findOrFail(params.id)
      return route
    } else {
      const page = request.input('page', 1)
      const perPage = request.input('per_page', 20)
      const pagination = await Route.query().paginate(page, perPage)
      return pagination.toJSON().data
    }
  }

  public async create({ request }: HttpContextContract) {
    const data = await request.validate(RouteValidator)

    if (!data.duration){
      const originCity = await City.findOrFail(data.id_origin)
      const destinationCity = await City.findOrFail(data.id_destination)
      
      const originName = `${originCity.name}, ${originCity.ubication}`
      const destinationName = `${destinationCity.name}, ${destinationCity.ubication}`

      const originCoords = await DistanceService.getCoordinates(originName)
      const destinationCoords = await DistanceService.getCoordinates(destinationName)

      const routeInfo = await DistanceService.getDistance(originCoords, destinationCoords)

      if (routeInfo.durationMinutes < 60) {
        data.duration = Math.round(routeInfo.durationMinutes)
      } else {
        data.duration = routeInfo.durationMinutes / 60
      }
    }
    
    return await Route.create(data)
  }

  public async update({ params, request }: HttpContextContract) {
    const route = await Route.findOrFail(params.id)
    const data = await request.validate(RouteValidator)
    route.merge(data)
    await route.save()
    return route
  }

  public async delete({ params, response }: HttpContextContract) {
    const route = await Route.findOrFail(params.id)
    await route.delete()
    return response.status(204)
  }
}
