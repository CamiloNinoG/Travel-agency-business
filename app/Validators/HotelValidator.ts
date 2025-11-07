import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class HotelValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    idCity: schema.number([
      rules.exists({ table: 'cities', column: 'idCity' }),
    ]),
    idAdmin: schema.number([
      rules.exists({ table: 'administrators', column: 'id' }),
    ]),
    name: schema.string([
      rules.minLength(3),
      rules.maxLength(255),
    ]),
    capacity: schema.number([
      rules.range(1, 5000),
    ]),
  });

  public messages: CustomMessages = {
    "idCity.exists": "La ciudad indicada no existe",
    "idAdmin.exists": "El administrador indicado no existe",
    "name.minLength": "El nombre del hotel debe tener al menos 3 caracteres",
    "capacity.range": "La capacidad debe ser un número positivo",
  };
}
