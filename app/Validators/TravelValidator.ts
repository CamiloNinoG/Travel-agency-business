import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator"
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"

export default class TravelValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    destination: schema.string([rules.minLength(3), rules.maxLength(255)]),
    origin: schema.string([rules.minLength(3), rules.maxLength(255)]),
    total_price: schema.number.optional([rules.range(1, 10000000)]),
  })

  public messages: CustomMessages = {
    "destination.required": "El destino es obligatorio",
    "origin.required": "El origen es obligatorio",
    "total_price.range": "El precio total debe ser mayor que 0",
  }
}
