import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ItineraryRoomValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = this.createSchema();

  private createSchema() {
    const isCreating = this.ctx.request.method() === "POST";

    return schema.create({
      idItinerary: isCreating
        ? schema.number([rules.exists({ table: 'transportation_itineraries', column: 'id' })])
        : schema.number.optional([rules.exists({ table: 'transportation_itineraries', column: 'id' })]),

      idRoom: isCreating
        ? schema.number([rules.exists({ table: 'rooms', column: 'id' })])
        : schema.number.optional([rules.exists({ table: 'rooms', column: 'id' })]),
    });
  }

  public messages: CustomMessages = {
    "idItinerary.exists": "El itinerario indicado no existe",
    "idRoom.exists": "La habitación indicada no existe",
  };
}
