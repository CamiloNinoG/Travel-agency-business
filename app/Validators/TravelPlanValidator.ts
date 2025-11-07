import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class TravelPlanValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    idTravel: schema.number([
      rules.exists({ table: 'travels', column: 'id' }),
    ]),
    idPlan: schema.number([
      rules.exists({ table: 'tourist_plans', column: 'id' }),
    ]),
  });

  public messages: CustomMessages = {
    "idTravel.exists": "El viaje indicado no existe",
    "idPlan.exists": "El plan turístico indicado no existe",
  };
}
