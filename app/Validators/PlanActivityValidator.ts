import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class PlanActivityValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    idActivity: schema.number([
      rules.exists({ table: 'activities', column: 'id' }),
    ]),
    idPlan: schema.number([
      rules.exists({ table: 'tourist_plans', column: 'id' }),
    ]),
  });

  public messages: CustomMessages = {
    "idActivity.exists": "La actividad indicada no existe",
    "idPlan.exists": "El plan turístico indicado no existe",
  };
}
