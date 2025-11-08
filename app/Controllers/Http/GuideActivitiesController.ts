import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GuideActivity from 'App/Models/GuideActivity'
import GuideActivityValidator from 'App/Validators/GuideActivityValidator'

export default class GuideActivitiesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await GuideActivity.findOrFail(params.id)
    } else {
      const page = request.input('page', 1)
      const perPage = request.input('per_page', 20)
      return await GuideActivity.query().paginate(page, perPage)
    }
  }

  public async create({ request }: HttpContextContract) {
    const data = await request.validate(GuideActivityValidator)
    return await GuideActivity.create(data)
  }

  public async update({ params, request }: HttpContextContract) {
    const guideActivity = await GuideActivity.findOrFail(params.id)
    const data = await request.validate(GuideActivityValidator)
    guideActivity.merge(data)
    await guideActivity.save()
    return guideActivity
  }

  public async delete({ params, response }: HttpContextContract) {
    const guideActivity = await GuideActivity.findOrFail(params.id)
    await guideActivity.delete()
    return response.status(204)
  }
}
