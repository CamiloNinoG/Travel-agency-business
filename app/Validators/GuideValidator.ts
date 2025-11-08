import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class GuideValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    // idUser: schema.number([
    //   rules.exists({ table: 'users', column: 'id' }),
    // ]),
  });

  public messages: CustomMessages = {
    "idUser.exists": "El usuario asignado como guía no existe",
  };
}
