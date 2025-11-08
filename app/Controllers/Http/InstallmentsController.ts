import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Installment from 'App/Models/Installment'
import InstallmentValidator from 'App/Validators/InstallmentValidator'

export default class InstallmentsController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      const installment = await Installment.findOrFail(params.id)
      await installment.load('travel')
      return installment
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Installment.query().paginate(page, perPage)
      } else {
        return await Installment.query()
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    const body = await request.validate(InstallmentValidator)
    const installment = await Installment.create(body)
    return installment
  }

  public async update({ params, request }: HttpContextContract) {
    const installment = await Installment.findOrFail(params.id)
    const payload = await request.validate(InstallmentValidator)
    installment.merge(payload)
    await installment.save()
    return installment
  }

  public async delete({ params, response }: HttpContextContract) {
    const installment = await Installment.findOrFail(params.id)
    response.status(204)
    return await installment.delete()
  }
}
