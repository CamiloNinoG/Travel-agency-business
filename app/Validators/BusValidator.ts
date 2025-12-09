import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator"
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"

export default class BusValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id_vehicule: schema.number([
      rules.exists({ table: 'vehicules', column: 'id' }),
      rules.unique({ table: 'buses', column: 'id_vehicule' }),
    ]),
    id_hotel: schema.number([
      rules.exists({ table: 'hotels', column: 'id' }),
    ]),
    plate: schema.string([
      rules.regex(/^[A-Z0-9-]{5,10}$/),
      rules.unique({ table: 'buses', column: 'plate' }),
    ]),
  })

  public messages: CustomMessages = {
    "id_vehicule.exists": "El vehículo asociado no existe",
    "id_vehicule.unique": "Este vehículo ya está asignado a un bus",
    "id_hotel.exists": "El hotel asociado no existe",
    "plate.regex": "La placa debe tener entre 5 y 10 caracteres alfanuméricos o guiones",
    "plate.unique": "Ya existe un bus con esa placa",
  }
}
