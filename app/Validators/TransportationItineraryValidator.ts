import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class TransportationItineraryValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    idService: schema.number.optional(), // puede ser FK a tabla de servicios
    idTravel: schema.number([
      rules.exists({ table: 'travels', column: 'id' }),
    ]),
    idRoute: schema.number([
      rules.exists({ table: 'routes', column: 'id' }),
    ]),
    Order: schema.number([
      rules.range(1, 100),
    ]),
  });

  public messages: CustomMessages = {
    "idTravel.exists": "El viaje indicado no existe",
    "idRoute.exists": "La ruta indicada no existe",
    "Order.range": "El orden debe ser un número entre 1 y 100",
  };
}
