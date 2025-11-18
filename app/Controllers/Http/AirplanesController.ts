import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Airplane from 'App/Models/Airplane'
import AirplaneValidator from 'App/Validators/AirplaneValidator'

export default class AirplanesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      const airplane = await Airplane.findOrFail(params.id)
      await airplane.load('vehicule')
      await airplane.load('airline')
      return airplane
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Airplane.query().paginate(page, perPage);
      } else {
        return await Airplane.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    const data = await request.validate(AirplaneValidator)
    return await Airplane.create(data)
  }

  public async update({ params, request }: HttpContextContract) {
    const airplane = await Airplane.findOrFail(params.id)
    const data = await request.validate(AirplaneValidator)
    airplane.merge(data)
    await airplane.save()
    return airplane
  }

  public async delete({ params, response }: HttpContextContract) {
    const airplane = await Airplane.findOrFail(params.id)
    await airplane.delete()
    return response.status(204)
  }
}
