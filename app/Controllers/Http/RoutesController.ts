import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from 'App/Models/Route'
import RouteValidator from 'App/Validators/RouteValidator'

export default class RoutesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      const route = await Route.findOrFail(params.id);
      return route;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Route.query().paginate(page, perPage);
      } else {
        return await Route.query();
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    const data = await request.validate(RouteValidator)
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
