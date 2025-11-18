import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator"
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"

export default class BusValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    idVehicule: schema.number.optional([
      rules.exists({ table: "buses", column: "idVehicule" }),

      rules.unique({
        table: "buses",
        column: "id_vehicule",
        whereNot: { id_bus: this.ctx.params.id }, // 👈 AJUSTADO
      }),
    ]),

    idHotel: schema.number.optional([
      rules.exists({ table: "hotels", column: "id" }),
    ]),

    plate: schema.string.optional([
      rules.regex(/^[A-Z0-9-]{5,10}$/),

      rules.unique({
        table: "buses",
        column: "plate",
        whereNot: { id_vehicule: this.ctx.params.id }, // 👈 PK correcto
      }),
    ]),
  })

  public messages: CustomMessages = {
    "idVehicule.exists": "El vehículo asociado no existe",
    "idVehicule.unique": "Este vehículo ya está asignado a un bus",
    "idHotel.exists": "El hotel asociado no existe",
    "plate.regex": "La placa debe tener entre 5 y 10 caracteres alfanuméricos o guiones",
    "plate.unique": "Ya existe un bus con esa placa",
  }
}
