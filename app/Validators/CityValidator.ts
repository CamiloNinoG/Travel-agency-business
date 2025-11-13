import { schema, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CityValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    name: schema.string({}, [rules.maxLength(100), rules.trim()]),
    ubication: schema.string({}, [rules.maxLength(150), rules.trim()]),
  });

  public messages = {
    "name.required": "El nombre de la ciudad es obligatorio.",
    "name.maxLength":
      "El nombre de la ciudad no puede superar los 100 caracteres.",
    "ubication.required": "La ubicación de la ciudad es obligatoria.",
    "ubication.maxLength": "La ubicación no puede superar los 150 caracteres.",
  };
}
