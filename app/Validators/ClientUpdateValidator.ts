import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ClientUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    idUser: schema.string.optional([
      rules.unique({ table: 'clients', column: 'id_user', whereNot: { id: this.ctx.params.id } }),
    ]),

    phone: schema.string.optional([
      rules.regex(/^[0-9]{10}$/),
    ]),

    city: schema.string.optional({ trim: true }),

    cc: schema.string.optional([
      rules.unique({ table: 'clients', column: 'cc', whereNot: { id: this.ctx.params.id } }),
      rules.regex(/^[0-9]{6,10}$/),
    ]),
  })

  public messages = {
    'phone.regex': 'El teléfono debe tener 10 dígitos.',
    'cc.unique': 'Ya existe un cliente con esta cédula.',
    'cc.regex': 'La cédula debe tener entre 6 y 10 dígitos.',
  }
}
