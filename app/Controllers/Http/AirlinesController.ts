import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Airline from 'App/Models/Airline'
import AirlineValidator from 'App/Validators/AirlineValidator'

export default class AirlinesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Airline.findOrFail(params.id)
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Airline.query().paginate(page, perPage);
      } else {
        return await Airline.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    const data = await request.validate(AirlineValidator)
    return await Airline.create(data)
  }

  public async update({ params, request }: HttpContextContract) {
    const airline = await Airline.findOrFail(params.id)
    const data = await request.validate(AirlineValidator)
    airline.merge(data)
    await airline.save()
    return airline
  }

  public async delete({ params, response }: HttpContextContract) {
    const airline = await Airline.findOrFail(params.id)
    await airline.delete()
    return response.status(204)
  }
}
