import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client'
import ClientValidator from 'App/Validators/ClientValidator'

export default class ClientsController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Client.query().paginate(page, perPage)
      } else {
        return await Client.query()
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    const body = await request.validate(ClientValidator)
    // const client = await Client.create(body)
    // return client
  }

  public async update({ params, request }: HttpContextContract) {
    const client = await Client.findOrFail(params.id)
    const payload = await request.validate(ClientValidator)
    await client.save()
    return client
  }

  public async delete({ params, response }: HttpContextContract) {
    const client = await Client.findOrFail(params.id)
    response.status(204)
    return await client.delete()
  }
}
