import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Activity from 'App/Models/Activity'
import ActivityValidator from 'App/Validators/ActivityValidator'

export default class ActivitiesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      const activity = await Activity.findOrFail(params.id)
      await activity.load('guideActivities')
      await activity.load('planActivities')
      return activity
    } else {
      const page = request.input('page', 1)
      const perPage = request.input('per_page', 20)
      return await Activity.query().paginate(page, perPage)
    }
  }

  public async create({ request }: HttpContextContract) {
    const data = await request.validate(ActivityValidator)
    return await Activity.create(data)
  }

  public async update({ params, request }: HttpContextContract) {
    const activity = await Activity.findOrFail(params.id)
    const data = await request.validate(ActivityValidator)
    activity.merge(data)
    await activity.save()
    return activity
  }

  public async delete({ params, response }: HttpContextContract) {
    const activity = await Activity.findOrFail(params.id)
    await activity.delete()
    return response.status(204)
  }
}
