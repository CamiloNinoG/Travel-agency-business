import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ClientUpdate {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id_user: schema.string([
      rules.unique({
        table: 'clients',
        column: 'id_user',
        whereNot: { id: this.ctx.params.id }, // ⬅ ignorar el cliente actual
      }),
    ]),

    phone: schema.string.optional([
      rules.regex(/^[0-9]{10}$/),
    ]),

    city: schema.string.optional({ trim: true }),

    cc: schema.string.optional([
      rules.unique({
        table: 'clients',
        column: 'cc',
        whereNot: { id: this.ctx.params.id }, // ⬅ ignorar el cliente actual
      }),
      rules.regex(/^[0-9]{6,10}$/),
    ]),
  })

  public messages = {
    'id_user.unique': 'Este usuario ya tiene un cliente registrado.',
    'phone.regex': 'El número de teléfono debe tener exactamente 10 dígitos numéricos.',
    'cc.unique': 'Ya existe un cliente con esta cédula.',
    'cc.regex': 'La cédula debe contener solo dígitos y tener entre 6 y 10 caracteres.',
  }
}
