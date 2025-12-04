import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ItineraryRoomValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    idItinerary: schema.number([
      rules.exists({ table: 'transportation_itineraries', column: 'id' }), // o 'travels' si hace referencia a Travel
    ]),
    idRoom: schema.number([
      rules.exists({ table: 'rooms', column: 'id' }),
    ]),
  });

  public messages: CustomMessages = {
    "idItinerary.exists": "El itinerario indicado no existe",
    "idRoom.exists": "La habitación indicada no existe",
  };
}
