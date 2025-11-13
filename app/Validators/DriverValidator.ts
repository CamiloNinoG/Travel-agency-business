// app/Validators/DriverValidator.ts
import { schema, rules } from "@ioc:Adonis/Core/Validator";

export default class DriverValidator {
  public schema = schema.create({
    id_user: schema.string({}, [
      rules.required(),
      rules.regex(/^[a-fA-F0-9]{24}$/),
      rules.unique({ table: "drivers", column: "id_user" }),
    ]),
    experience: schema.string.optional({}, [
      rules.minLength(2),
      rules.maxLength(100),
      rules.regex(/^[a-zA-Z0-9 ,.\-()°áéíóúÁÉÍÓÚñÑ]+$/), // texto seguro
    ]),
  });

public messages = {
  // id_user
  "id_user.required": "El campo 'id_user' es obligatorio.",
  "id_user.regex": "El 'id_user' debe ser un MongoID válido (24 caracteres hexadecimales).",
  "id_user.unique": "Ya existe un conductor con este 'id_user'.",

  // experience
  "experience.minLength": "La experiencia debe tener al menos 2 caracteres.",
  "experience.maxLength": "La experiencia no puede superar los 100 caracteres.",
  "experience.regex": "La experiencia contiene caracteres no permitidos.",
};

}
