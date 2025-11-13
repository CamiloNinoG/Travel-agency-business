import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class TouristPlanValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([
      rules.minLength(3),
      rules.maxLength(255),
    ]),
    type: schema.string([
      rules.minLength(3),
      rules.maxLength(100),
    ]),
    id_city: schema.number([
      rules.exists({ table: 'cities', column: 'id' }),
    ]),
    total: schema.number([rules.range(1, 1000000)])
  });

  public messages: CustomMessages = {
    "id_city.exists": "La ciudad indicada no existe",
    "name.minLength": "El nombre del plan debe tener al menos 3 caracteres",
  };
}
