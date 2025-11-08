import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ServiceTransport from 'App/Models/ServiceTransport'
import ServiceTransportValidator from 'App/Validators/ServiceTransportValidator'

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
    return await ServiceTransport.create(data)
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
