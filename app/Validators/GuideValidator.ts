import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class GuideValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id_user: schema.string([
      rules.unique({ table: 'guides', column: 'id_user' }),
    ]),
  })

  public messages: CustomMessages = {
    "id_user.required": "El usuario asociado es obligatorio",
    "id_user.unique": "Este usuario ya tiene un cliente asociado",
  }
}
