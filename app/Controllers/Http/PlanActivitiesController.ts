import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PlanActivity from 'App/Models/PlanActivity'
import PlanActivityValidator from 'App/Validators/PlanActivityValidator'

export default class PlanActivitiesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await PlanActivity.query()
        .where("id_plan", params.id)
        .preload("activity"); // Para traer la info real de la actividad
    } else {
      const page = request.input('page', 1)
      const perPage = request.input('per_page', 20)
      const pagination = await PlanActivity.query().paginate(page, perPage)
      return pagination.toJSON()
    }
  }

  public async create({ request }: HttpContextContract) {
    const data = await request.validate(PlanActivityValidator)
    return await PlanActivity.create(data)
  }

  public async update({ params, request }: HttpContextContract) {
    const planActivity = await PlanActivity.findOrFail(params.id)
    const data = await request.validate(PlanActivityValidator)
    planActivity.merge(data)
    await planActivity.save()
    return planActivity
  }

  public async delete({ params, response }: HttpContextContract) {
    const idPlan = params.id;

    await PlanActivity.query()
      .where("id_plan", idPlan)
      .delete();

    return response.status(204);
  }
}
