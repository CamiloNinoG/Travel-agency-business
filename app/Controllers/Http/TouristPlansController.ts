import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TouristPlan from 'App/Models/TouristPlan'
import TouristPlanValidator from 'App/Validators/TouristPlanValidator'

export default class TouristPlansController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      const plan = await TouristPlan.findOrFail(params.id)
      return plan
    } else {
      const page = request.input('page', 1)
      const perPage = request.input('per_page', 20)
      return await TouristPlan.query().paginate(page, perPage)
    }
  }

  public async create({ request }: HttpContextContract) {
    const data = await request.validate(TouristPlanValidator)
    return await TouristPlan.create(data)
  }

  public async update({ params, request }: HttpContextContract) {
    const plan = await TouristPlan.findOrFail(params.id)
    const data = await request.validate(TouristPlanValidator)
    plan.merge(data)
    await plan.save()
    return plan
  }

  public async delete({ params, response }: HttpContextContract) {
    const plan = await TouristPlan.findOrFail(params.id)
    await plan.delete()
    return response.status(204)
  }
}
