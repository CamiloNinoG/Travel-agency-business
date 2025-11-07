import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator"
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"

export default class GPSValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    idVehicule: schema.number([
      rules.exists({ table: 'vehicules', column: 'id' }),
    ]),
    latitud: schema.string([
      rules.regex(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)/), // validación básica de latitud
    ]),
    longitude: schema.string([
      rules.regex(/^[-+]?((1[0-7]\d)|(\d{1,2}))(\.\d+)?|180(\.0+)?/), // validación básica de longitud
    ]),
  })

  public messages: CustomMessages = {
    "idVehicule.exists": "El vehículo asociado no existe",
    "latitud.regex": "La latitud debe estar en formato válido (-90 a 90)",
    "longitude.regex": "La longitud debe estar en formato válido (-180 a 180)",
  }
}
