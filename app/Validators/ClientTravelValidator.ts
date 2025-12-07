import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator"
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"

export default class ClientTravelValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id_travel: schema.number([
      rules.exists({ table: 'travels', column: 'id' }),
    ]),
    id_client: schema.number([
      rules.exists({ table: 'clients', column: 'id' }),
    ]),
  })

  public messages: CustomMessages = {
    "id_travel.required": "Debe especificar el viaje",
    "id_travel.exists": "El viaje seleccionado no existe",
    "id_client.required": "Debe especificar el cliente",
    "id_client.exists": "El cliente seleccionado no existe",
  }
}
