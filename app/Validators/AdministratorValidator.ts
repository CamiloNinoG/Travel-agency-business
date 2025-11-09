import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class AdministratorValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    idUser: schema.string([
      rules.unique({ table: 'administrators', column: 'id_user' }),
    ]),
  })

  public messages: CustomMessages = {
    "idUser.required": "El usuario asociado es obligatorio",
    "idUser.unique": "Este usuario ya tiene un cliente asociado",
  }
}
