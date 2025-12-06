import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class TravelPlanValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id_travel: schema.number([
      rules.exists({ table: 'travels', column: 'id' }),
    ]),
    id_plan: schema.number([
      rules.exists({ table: 'tourist_plans', column: 'id' }),
    ]),
  });

  public messages: CustomMessages = {
    "id_travel.exists": "El viaje indicado no existe",
    "id_plan.exists": "El plan turístico indicado no existe",
  };
}
