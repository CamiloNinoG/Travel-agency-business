import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator"
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"

export default class BankCardValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id_client: schema.number([
      rules.exists({ table: 'clients', column: 'id' }),
    ]),
    type: schema.string([rules.minLength(3), rules.maxLength(50)]),
    card_name: schema.string([rules.minLength(3), rules.maxLength(100)]),
    bank: schema.string([rules.minLength(3), rules.maxLength(100)]),
    card_number: schema.number([
      rules.range(100000, 999999), // 16 dígitos
      rules.unique({ table: 'bank_cards', column: 'card_number' }),
    ]),
    ccv: schema.string([rules.regex(/^\d{3,4}$/)]),
    expiration: schema.date({ format: 'yyyy-MM-dd' }, [
      rules.after('today'),
    ]),
    default: schema.boolean(),
  })

  public messages: CustomMessages = {
    "idClient.exists": "El cliente asociado no existe",
    "cardNumber.range": "El número de tarjeta debe tener 16 dígitos",
    "cardNumber.unique": "Esta tarjeta ya está registrada",
    "CCV.regex": "El código CCV debe tener 3 o 4 dígitos numéricos",
    "expiration.after": "La fecha de expiración debe ser posterior a hoy",
  }
}
