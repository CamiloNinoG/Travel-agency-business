import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator"
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"

export default class AirlineValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([
      rules.minLength(2),
      rules.maxLength(255),
      rules.unique({ table: 'airlines', column: 'name' }),
    ]),
  })

  public messages: CustomMessages = {
    "name.required": "El nombre de la aerolínea es obligatorio",
    "name.unique": "Ya existe una aerolínea con ese nombre",
  }
}
