import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class TransportationItineraryValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = this.createSchema();

  private createSchema() {
    const isCreating = this.ctx.request.method() === "POST";

    return schema.create({
      id_service: isCreating
        ? schema.number.optional([rules.exists({ table: 'service_transports', column: 'id' })])
        : schema.number.optional([rules.exists({ table: 'service_transports', column: 'id' })]),

      id_travel: isCreating
        ? schema.number([rules.exists({ table: 'travels', column: 'id' })])
        : schema.number.optional([rules.exists({ table: 'travels', column: 'id' })]),

      id_route: isCreating
        ? schema.number([rules.exists({ table: 'routes', column: 'id' })])
        : schema.number.optional([rules.exists({ table: 'routes', column: 'id' })]),

      order: isCreating
        ? schema.number([rules.range(1, 100)])
        : schema.number.optional([rules.range(1, 100)]),
    });
  }

  public messages: CustomMessages = {
    "id_service.exists": "El servicio indicado no existe",
    "id_travel.exists": "El viaje indicado no existe",
    "id_route.exists": "La ruta indicada no existe",
    "order.range": "El orden debe ser un número entre 1 y 100",
    "*.required": "El campo {{ field }} es obligatorio",
  };
}
