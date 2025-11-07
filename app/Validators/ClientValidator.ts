import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator"
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"

export default class ClientValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    idUser: schema.number([
      rules.exists({ table: 'users', column: 'id' }),
      rules.unique({ table: 'clients', column: 'id_user' }),
    ]),
  })

  public messages: CustomMessages = {
    "idUser.required": "El usuario asociado es obligatorio",
    "idUser.exists": "El usuario especificado no existe",
    "idUser.unique": "Este usuario ya tiene un cliente asociado",
  }
}
