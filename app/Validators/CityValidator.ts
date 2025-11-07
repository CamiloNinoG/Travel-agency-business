import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CityValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([
      rules.minLength(2),
      rules.maxLength(255),
      rules.unique({ table: 'cities', column: 'name' }),
    ]),
    Ubication: schema.string([
      rules.minLength(3),
      rules.maxLength(255),
    ]),
  });

  public messages: CustomMessages = {
    "name.required": "El nombre de la ciudad es obligatorio",
    "name.unique": "Ya existe una ciudad con ese nombre",
    "Ubication.required": "La ubicación es obligatoria",
  };
}
