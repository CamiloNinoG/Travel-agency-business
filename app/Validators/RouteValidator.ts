import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class RouteValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    idOrigin: schema.number([
      rules.exists({ table: 'cities', column: 'id' }), // o 'locations' según tu tabla real
    ]),
    idDestination: schema.number([
      rules.exists({ table: 'cities', column: 'id' }), // o 'locations'
    ]),
    duration: schema.number([
      rules.range(1, 1000), // duración en minutos o kilómetros según tu caso
    ]),
  });

  public messages: CustomMessages = {
    "idOrigin.exists": "El origen indicado no existe",
    "idDestination.exists": "El destino indicado no existe",
    "duration.range": "La duración debe estar entre 1 y 1000 unidades válidas",
  };
}
