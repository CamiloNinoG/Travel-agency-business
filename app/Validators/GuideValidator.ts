import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class GuideValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    idUser: schema.string([
      rules.unique({
        table: 'guides',
        column: 'id_user',
        whereNot: {
          id: this.ctx.request.param('id'), // excluye el registro actual en un update
        }
      }),
    ])
  })

  public messages: CustomMessages = {
    "idUser.required": "El usuario asociado es obligatorio",
    "idUser.unique": "Este usuario ya tiene un cliente asociado",
  }
}
