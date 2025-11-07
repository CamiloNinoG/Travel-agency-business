import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator"
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"

export default class InstallmentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    idTravel: schema.number([
      rules.exists({ table: 'travels', column: 'id_travel' }),
    ]),
    amount: schema.number([rules.range(1, 10000000)]),
    status: schema.string([rules.minLength(3), rules.maxLength(50)]),
  })

  public messages: CustomMessages = {
    "idTravel.exists": "El viaje asociado no existe",
    "amount.range": "El monto debe ser mayor que 0",
    "status.required": "Debe indicar el estado del pago",
    "date.afterOrEqual": "La fecha del pago no puede ser anterior al 2020",
  }
}
