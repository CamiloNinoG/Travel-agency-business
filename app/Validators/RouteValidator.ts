import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class RouteValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id_origin: schema.number([
      rules.exists({ table: 'cities', column: 'id' }),
    ]),
    id_destination: schema.number([
      rules.exists({ table: 'cities', column: 'id' }),
    ]),
    duration: schema.number.optional([
      rules.range(1, 100000),
    ]),
  });

  public messages: CustomMessages = {
    "id_origin.exists": "El origen indicado no existe",
    "id_destination.exists": "El destino indicado no existe",
    "duration.range": "La duración debe estar entre 1 y 1000 unidades válidas",
  };
}
