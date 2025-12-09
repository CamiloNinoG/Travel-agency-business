import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class HotelValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = this.createSchema();

  private createSchema() {
    const isCreating = this.ctx.request.method() === "POST";

    return schema.create({
      id_city: isCreating
        ? schema.number([rules.exists({ table: 'cities', column: 'id' })])
        : schema.number.optional([rules.exists({ table: 'cities', column: 'id' })]),

      id_admin: isCreating
        ? schema.number([rules.exists({ table: 'administrators', column: 'id' })])
        : schema.number.optional([rules.exists({ table: 'administrators', column: 'id' })]),

      name: isCreating
        ? schema.string([rules.minLength(3), rules.maxLength(255)])
        : schema.string.optional([rules.minLength(3), rules.maxLength(255)]),

      capacity: isCreating
        ? schema.number([rules.range(1, 5000)])
        : schema.number.optional([rules.range(1, 5000)]),

      address: isCreating
        ? schema.string([rules.minLength(5), rules.maxLength(255)])
        : schema.string.optional([rules.minLength(5), rules.maxLength(255)]),
    });
  }

  public messages: CustomMessages = {
    "id_city.exists": "La ciudad indicada no existe",
    "id_admin.exists": "El administrador indicado no existe",
    "name.minLength": "El nombre del hotel debe tener al menos 3 caracteres",
    "capacity.range": "La capacidad debe ser un número positivo",
    "address.required": "La dirección del hotel es obligatoria",
    "address.minLength": "La dirección debe tener al menos 5 caracteres",
    "address.maxLength": "La dirección no puede exceder 255 caracteres",
  };
}
