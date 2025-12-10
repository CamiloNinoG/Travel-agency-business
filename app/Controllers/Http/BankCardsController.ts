import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BankCard from 'App/Models/BankCard'
import BankCardValidator from 'App/Validators/BankCardValidator'
import BankCarUpdate from 'App/Validators/Cardupdate'

export default class BankCardsController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      const card = await BankCard.findOrFail(params.id)
      await card.load('client')
      return card
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await BankCard.query().paginate(page, perPage)
      } else {
        return await BankCard.query()
      }
    }
  }
  public async findByClient({ params, response }: HttpContextContract) {
  const { id_client } = params

  const cards = await BankCard
    .query()
    .where('id_client', id_client)
    .orderBy('default', 'desc') 

  return response.ok(cards)
}

  public async create({ request }: HttpContextContract) {
    const body = await request.validate(BankCardValidator)
    const card = await BankCard.create(body)
    return card
  }

  public async update({ params, request }: HttpContextContract) {
    const card = await BankCard.findOrFail(params.id)
    const payload = await request.validate(BankCarUpdate)
    card.merge(payload)
    await card.save()
    return card
  }

  public async delete({ params, response }: HttpContextContract) {
    const card = await BankCard.findOrFail(params.id)
    response.status(204)
    return await card.delete()
  }
}
