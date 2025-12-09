import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class VehiculeValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = this.createSchema();

  private createSchema() {
    const isCreating = this.ctx.request.method() === "POST";

    return schema.create({
      capacity: isCreating
        ? schema.number([rules.range(1, 500)])
        : schema.number.optional([rules.range(1, 500)]),

      status: isCreating
        ? schema.string([rules.minLength(3), rules.maxLength(100)])
        : schema.string.optional([rules.minLength(3), rules.maxLength(100)]),
    });
  }

  public messages: CustomMessages = {
    "capacity.required": "La capacidad del vehículo es obligatoria",
    "capacity.range": "La capacidad debe estar entre 1 y 500 pasajeros",
    "status.required": "El estado del vehículo es obligatorio",
    "status.minLength": "El estado del vehículo debe tener al menos 3 caracteres",
    "status.maxLength": "El estado del vehículo no puede exceder 100 caracteres",
  };
}
