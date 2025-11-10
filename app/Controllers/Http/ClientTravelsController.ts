import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ClientTravel from 'App/Models/ClientTravel'
import ClientTravelValidator from 'App/Validators/ClientTravelValidator'
import Client from 'App/Models/Client'
import Travel from 'App/Models/Travel'

export default class ClientTravelsController {
  // GET /client-travels o /client-travels/:id
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

  // POST /client-travels
  public async create({ request }: HttpContextContract) {
    const body = await request.validate(ClientTravelValidator)
    const clientTravel = await ClientTravel.create(body)
    return clientTravel
  }

  // PUT /client-travels/:id
  public async update({ params, request }: HttpContextContract) {
    const clientTravel = await ClientTravel.findOrFail(params.id)
    const payload = await request.validate(ClientTravelValidator)
    clientTravel.merge(payload)
    await clientTravel.save()
    return clientTravel
  }

  // DELETE /client-travels/:id
  public async delete({ params, response }: HttpContextContract) {
    const clientTravel = await ClientTravel.findOrFail(params.id)
    await clientTravel.delete()
    return response.status(204)
  }

  // GET /client-travels/client/:id/travels
  public async getTravelsByClient({ params }: HttpContextContract) {
    const clientId = params.id

    const travels = await Travel.query().whereHas('clientTravels', (query) => {
      query.where('id_client', clientId)
    })

    return travels
  }

  // GET /client-travels/travel/:id/clients
  public async getClientsByTravel({ params }: HttpContextContract) {
    const travelId = params.id

    const clients = await Client.query().whereHas('travels', (query) => {
      query.where('id_travel', travelId)
    })

    return clients
  }
}
