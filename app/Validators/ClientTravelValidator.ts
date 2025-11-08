import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator"
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"

export default class ClientTravelValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    idTravel: schema.number([
      rules.exists({ table: 'travels', column: 'id' }),
    ]),
    idClient: schema.number([
      rules.exists({ table: 'clients', column: 'id' }),
    ]),
  })

  public messages: CustomMessages = {
    "idTravel.required": "Debe especificar el viaje",
    "idTravel.exists": "El viaje seleccionado no existe",
    "idClient.required": "Debe especificar el cliente",
    "idClient.exists": "El cliente seleccionado no existe",
  }
}
