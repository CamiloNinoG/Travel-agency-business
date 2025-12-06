import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class PlanActivityValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id_activity: schema.number([
      rules.exists({ table: 'activities', column: 'id' }),
    ]),
    id_plan: schema.number([
      rules.exists({ table: 'tourist_plans', column: 'id' }),
    ]),
  });

  public messages: CustomMessages = {
    "id_activity.exists": "La actividad indicada no existe",
    "id_plan.exists": "El plan turístico indicado no existe",
  };
}
