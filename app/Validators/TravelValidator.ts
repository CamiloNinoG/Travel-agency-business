import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator"
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"

export default class TravelValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    destination: schema.string([rules.minLength(3), rules.maxLength(255)]),
    origen: schema.string([rules.minLength(3), rules.maxLength(255)]),
    totalPrice: schema.number([rules.range(1, 10000000)]),
  })

  public messages: CustomMessages = {
    "destination.required": "El destino es obligatorio",
    "origen.required": "El origen es obligatorio",
    "totalPrice.range": "El precio total debe ser mayor que 0",
  }
}
