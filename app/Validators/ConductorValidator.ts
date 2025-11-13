import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ConductorValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    idUser: schema.string({}, [
      rules.required(),
      rules.unique({ table: 'conductors', column: 'id_user' })
    ]),

    experiencia: schema.number([rules.range(0, Number.MAX_SAFE_INTEGER)])
  })

  public messages: CustomMessages = {
    "idUser.required": "El usuario asociado es obligatorio",
    "idUser.unique": "Este usuario ya tiene un cliente asociado"
  }
}
