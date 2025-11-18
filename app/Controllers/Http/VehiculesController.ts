import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Vehicule from 'App/Models/Vehicule'
import VehiculeValidator from 'App/Validators/VehiculeValidator'

export default class VehiculesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      const vehicule = await Vehicule.findOrFail(params.id)
      // await vehicule.load('buses')
      return vehicule
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Vehicule.query().paginate(page, perPage)
      } else {
        return await Vehicule.query()
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    const data = await request.validate(VehiculeValidator)
    return await Vehicule.create(data)
  }

  public async update({ params, request }: HttpContextContract) {
    const vehicule = await Vehicule.findOrFail(params.id)
    const data = await request.validate(VehiculeValidator)
    vehicule.merge(data)
    await vehicule.save()
    return vehicule
  }

  public async delete({ params, response }: HttpContextContract) {
    const vehicule = await Vehicule.findOrFail(params.id)
    await vehicule.delete()
    return response.status(204)
  }
}
