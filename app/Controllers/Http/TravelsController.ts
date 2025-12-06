import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Travel from 'App/Models/Travel'
import TravelValidator from 'App/Validators/TravelValidator'
import DistanceService from 'App/Services/LocationService'

export default class TravelsController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      const travel = await Travel.findOrFail(params.id)
      return travel
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Travel.query().paginate(page, perPage)
      } else {
        return await Travel.query()
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    const body = await request.validate(TravelValidator)

    // const origin = await DistanceService.getCoordinates(
    //   body.origin,
    //   )

    // const destination = await DistanceService.getCoordinates(
    //   body.destination
    // )

    // const travelInfo = await DistanceService.getDistance(origin, destination)

    // body.total_price = travelInfo.distanceKm

    const travel = await Travel.create(body)
    return travel
  }

  public async update({ params, request }: HttpContextContract) {
    const travel = await Travel.findOrFail(params.id)
    const payload = await request.validate(TravelValidator)
    travel.merge(payload)
    await travel.save()
    return travel
  }

  public async delete({ params, response }: HttpContextContract) {
    const travel = await Travel.findOrFail(params.id)
    response.status(204)
    return await travel.delete()
  }

  public async
}
