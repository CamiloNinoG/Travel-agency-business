import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class HotelValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id_city: schema.number([
      rules.exists({ table: 'cities', column: 'id' }),
    ]),

    id_admin: schema.number([
      rules.exists({ table: 'administrators', column: 'id' }),
    ]),

    name: schema.string([
      rules.minLength(3),
      rules.maxLength(255),
    ]),

    capacity: schema.number([
      rules.range(1, 5000),
    ]),

    // 👇 Este campo es obligatorio porque la BD no permite NULL
    address: schema.string([
      rules.minLength(5),
      rules.maxLength(255),
    ]),
  });

  public messages: CustomMessages = {
    "id_city.exists": "La ciudad indicada no existe",
    "id_admin.exists": "El administrador indicado no existe",
    "name.minLength": "El nombre del hotel debe tener al menos 3 caracteres",
    "capacity.range": "La capacidad debe ser un número positivo",
    "address.required": "La dirección del hotel es obligatoria",
    "address.minLength": "La dirección debe tener al menos 5 caracteres",
  };
}
