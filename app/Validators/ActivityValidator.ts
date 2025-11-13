import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ActivityValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    price_activity: schema.number([rules.range(0, 1000000)]),
    name: schema.string([rules.minLength(3), rules.maxLength(255)]),
    description: schema.string.optional([rules.maxLength(1000)]),
    id_city: schema.number([
      rules.exists({ table: "cities", column: "id" })
    ])
  });

  public messages: CustomMessages = {
    "price_activity.range": "El precio debe ser un valor positivo",
    "name.minLength": "El nombre debe tener al menos 3 caracteres",
    "id_City.exists": "La ciudad indicada no existe"
  };
}
