import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class RoomValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id_hotel: schema.number([
      rules.exists({ table: 'hotels', column: 'id' }),
    ]),
    
    price_room: schema.number([
      rules.range(1, 1000000),
    ]),
    type: schema.string([
      rules.minLength(3),
      rules.maxLength(100),
    ]),
  });

  public messages: CustomMessages = {
    "idHotel.exists": "El hotel indicado no existe",
    "price_room.range": "El precio de la habitación debe ser mayor que 0",
    "type.minLength": "El tipo de habitación debe tener al menos 3 caracteres",
  };
}
