import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ItineraryRoomValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = this.createSchema();

  private createSchema() {
    const isCreating = this.ctx.request.method() === "POST";

    return schema.create({
      id_itinerary: isCreating
        ? schema.number([rules.exists({ table: 'transportation_itineraries', column: 'id' })])
        : schema.number.optional([rules.exists({ table: 'transportation_itineraries', column: 'id' })]),

      id_room: isCreating
        ? schema.number([rules.exists({ table: 'rooms', column: 'id' })])
        : schema.number.optional([rules.exists({ table: 'rooms', column: 'id' })]),
    });
  }

  public messages: CustomMessages = {
    "id_itinerary.exists": "El itinerario indicado no existe",
    "id_room.exists": "La habitación indicada no existe",
  };
}
