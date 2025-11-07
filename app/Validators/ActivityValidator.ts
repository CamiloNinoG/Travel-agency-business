import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ActivityValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    priceActivity: schema.number([
      rules.range(0, 1000000),
    ]),
    name: schema.string([
      rules.minLength(3),
      rules.maxLength(255),
    ]),
    description: schema.string.optional([
      rules.maxLength(1000),
    ]),
  });

  public messages: CustomMessages = {
    "priceActivity.range": "El precio debe ser un valor positivo",
    "name.minLength": "El nombre debe tener al menos 3 caracteres",
  };
}
