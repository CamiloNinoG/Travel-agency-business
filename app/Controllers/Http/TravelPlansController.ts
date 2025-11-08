import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TravelPlan from 'App/Models/TravelPlan'
import TravelPlanValidator from 'App/Validators/TravelPlanValidator'

export default class TravelPlansController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await TravelPlan.findOrFail(params.id)
    } else {
      const page = request.input('page', 1)
      const perPage = request.input('per_page', 20)
      return await TravelPlan.query().paginate(page, perPage)
    }
  }

  public async create({ request }: HttpContextContract) {
    const data = await request.validate(TravelPlanValidator)
    return await TravelPlan.create(data)
  }

  public async update({ params, request }: HttpContextContract) {
    const travelPlan = await TravelPlan.findOrFail(params.id)
    const data = await request.validate(TravelPlanValidator)
    travelPlan.merge(data)
    await travelPlan.save()
    return travelPlan
  }

  public async delete({ params, response }: HttpContextContract) {
    const travelPlan = await TravelPlan.findOrFail(params.id)
    await travelPlan.delete()
    return response.status(204)
  }
}
