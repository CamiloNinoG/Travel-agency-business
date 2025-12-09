import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class AirlineValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = this.createSchema();

  private createSchema() {
    const isCreating = this.ctx.request.method() === "POST";
    const currentId = this.ctx.params.id; // id del registro si es PUT/PATCH

    return schema.create({
      name: isCreating
        ? schema.string([
            rules.minLength(2),
            rules.maxLength(255),
            rules.unique({ table: 'airlines', column: 'name' }),
          ])
        : schema.string.optional([
            rules.minLength(2),
            rules.maxLength(255),
            // Ignora el registro actual para la validación de unique
            rules.unique({ table: 'airlines', column: 'name', whereNot: { id: currentId } }),
          ]),
    });
  }

  public messages: CustomMessages = {
    "name.required": "El nombre de la aerolínea es obligatorio",
    "name.unique": "Ya existe una aerolínea con ese nombre",
    "name.minLength": "El nombre debe tener al menos 2 caracteres",
    "name.maxLength": "El nombre no puede exceder 255 caracteres",
  };
}
