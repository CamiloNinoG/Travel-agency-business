import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class GuideActivityValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id_guide: schema.number([
      rules.exists({ table: 'guides', column: 'id' }),
    ]),
    id_activity: schema.number([
      rules.exists({ table: 'activities', column: 'id' }),
    ]),
  });

  public messages: CustomMessages = {
    "id_guide.exists": "El guía indicado no existe",
    "id_activity.exists": "La actividad indicada no existe",
  };
}
