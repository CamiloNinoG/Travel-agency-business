import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator"
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"

export default class VehiculeValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    capacity: schema.number([rules.range(1, 500)]),
    status: schema.string([rules.minLength(3), rules.maxLength(100)]),
  })

  public messages: CustomMessages = {
    "capacity.required": "La capacidad del vehículo es obligatoria",
    "capacity.range": "La capacidad debe estar entre 1 y 500 pasajeros",
    "status.required": "El estado del vehículo es obligatorio",
  }
}
