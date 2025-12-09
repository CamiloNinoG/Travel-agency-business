import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class RoomValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = this.createSchema();

  private createSchema() {
    const isCreating = this.ctx.request.method() === "POST";

    return schema.create({
      id_hotel: isCreating
        ? schema.number([rules.exists({ table: 'hotels', column: 'id' })])
        : schema.number.optional([rules.exists({ table: 'hotels', column: 'id' })]),

      price_room: isCreating
        ? schema.number([rules.range(1, 1000000)])
        : schema.number.optional([rules.range(1, 1000000)]),

      type: isCreating
        ? schema.string([rules.minLength(3), rules.maxLength(100)])
        : schema.string.optional([rules.minLength(3), rules.maxLength(100)]),
    });
  }

  public messages: CustomMessages = {
    "id_hotel.exists": "El hotel indicado no existe",
    "price_room.range": "El precio de la habitación debe ser mayor que 0",
    "type.minLength": "El tipo de habitación debe tener al menos 3 caracteres",
    "type.maxLength": "El tipo de habitación no puede exceder 100 caracteres",
  };
}
