import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ClientTravel from 'App/Models/ClientTravel'
import ClientTravelValidator from 'App/Validators/ClientTravelValidator'

export default class ClientTravelsController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      const clientTravel = await ClientTravel.findOrFail(params.id)
      await clientTravel.load('client')
      await clientTravel.load('travel')
      return clientTravel
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await ClientTravel.query().paginate(page, perPage)
      } else {
        return await ClientTravel.query()
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    const body = await request.validate(ClientTravelValidator)
    const clientTravel = await ClientTravel.create(body)
    return clientTravel
  }

  public async update({ params, request }: HttpContextContract) {
    const clientTravel = await ClientTravel.findOrFail(params.id)
    const payload = await request.validate(ClientTravelValidator)
    clientTravel.merge(payload)
    await clientTravel.save()
    return clientTravel
  }

  public async delete({ params, response }: HttpContextContract) {
    const clientTravel = await ClientTravel.findOrFail(params.id)
    response.status(204)
    return await clientTravel.delete()
  }
}
