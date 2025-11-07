import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator"
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"

export default class AirplaneValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    idVehicule: schema.number([
      rules.exists({ table: 'vehicules', column: 'id' }),
    ]),
    idAirline: schema.number([
      rules.exists({ table: 'airlines', column: 'id' }),
    ]),
    code: schema.string([
      rules.regex(/^[A-Z0-9]{2,10}$/),
      rules.unique({ table: 'airplanes', column: 'code' }),
    ]),
  })

  public messages: CustomMessages = {
    "idVehicule.exists": "El vehículo asociado no existe",
    "idAirline.exists": "La aerolínea asociada no existe",
    "code.regex": "El código debe tener entre 2 y 10 caracteres alfanuméricos en mayúscula",
    "code.unique": "Ya existe un avión con ese código",
  }
}
