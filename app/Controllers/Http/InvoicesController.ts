import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Invoice from 'App/Models/Invoice'
import InvoiceValidator from 'App/Validators/InvoiceValidator'

export default class InvoicesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      const invoice = await Invoice.findOrFail(params.id)
      await invoice.load('client')
      await invoice.load('card')
      await invoice.load('installment')
      return invoice
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Invoice.query().paginate(page, perPage)
      } else {
        return await Invoice.query()
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    const body = await request.validate(InvoiceValidator)
    const invoice = await Invoice.create(body)
    return invoice
  }

  public async update({ params, request }: HttpContextContract) {
    const invoice = await Invoice.findOrFail(params.id)
    const payload = await request.validate(InvoiceValidator)
    invoice.merge(payload)
    await invoice.save()
    return invoice
  }

  public async delete({ params, response }: HttpContextContract) {
    const invoice = await Invoice.findOrFail(params.id)
    response.status(204)
    return await invoice.delete()
  }
}
