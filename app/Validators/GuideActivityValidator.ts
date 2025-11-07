import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class GuideActivityValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    idGuide: schema.number([
      rules.exists({ table: 'guides', column: 'id' }),
    ]),
    idActivity: schema.number([
      rules.exists({ table: 'activities', column: 'id' }),
    ]),
  });

  public messages: CustomMessages = {
    "idGuide.exists": "El guía indicado no existe",
    "idActivity.exists": "La actividad indicada no existe",
  };
}
