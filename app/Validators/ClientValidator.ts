import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ClientValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    idUser: schema.string([
      rules.unique({ table: 'clients', column: 'id_user' }),
    ]),

    phone: schema.number.optional([
      rules.unsigned(),
      rules.range(1000000, 9999999999), // por ejemplo, validación básica de número
    ]),

    city: schema.string.optional({ trim: true }),

    cc: schema.number.optional([
      rules.unsigned(),
      rules.unique({ table: 'clients', column: 'cc' }), // opcional, evita duplicados en documento
    ]),
  })

  public messages = {
    'idUser.unique': 'Este usuario ya tiene un cliente registrado.',
    'phone.range': 'El número de teléfono debe tener entre 7 y 10 dígitos.',
    'cc.unique': 'Ya existe un cliente con esta cédula.',
  }
}
