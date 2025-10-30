import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class MovieValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([
      rules.minLength(3),
      rules.maxLength(255),
      rules.unique({ table: 'movies', column: 'name' }),
    ]),
    duration: schema.number([rules.range(1, 500)]),
    year: schema.number([rules.range(1888, new Date().getFullYear() + 1)]), // 👈 valida año válido
  })

  public messages: CustomMessages = {
    "name.required": "El nombre de la película es obligatorio",
    "name.unique": "Ya existe una película con ese nombre",
    "duration.range": "La duración debe estar entre 1 y 500 minutos",
    "year.date.format":
      "El campo año debe tener el formato yyyy-MM-dd HH:mm:ss",
  };
}
