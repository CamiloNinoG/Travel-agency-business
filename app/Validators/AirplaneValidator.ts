import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator"
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"

export default class AirplaneValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id_vehicule: schema.number([
      rules.exists({ table: 'vehicules', column: 'id' }),
    ]),
    id_airline: schema.number([
      rules.exists({ table: 'airlines', column: 'id' }),
    ]),
    code: schema.string([
      rules.regex(/^[A-Z0-9]{2,10}$/),
      rules.unique({ table: 'airplanes', column: 'code' }),
    ]),
  })

  public messages: CustomMessages = {
    "id_vehicule.exists": "El vehículo asociado no existe",
    "id_airline.exists": "La aerolínea asociada no existe",
    "code.regex": "El código debe tener entre 2 y 10 caracteres alfanuméricos en mayúscula",
    "code.unique": "Ya existe un avión con ese código",
  }
}
