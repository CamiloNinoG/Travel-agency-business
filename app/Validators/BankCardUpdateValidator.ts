import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateBankCardValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    idClient: schema.number.optional([
      rules.exists({ table: 'clients', column: 'id' }),
    ]),
    type: schema.string.optional([
      rules.minLength(3),
      rules.maxLength(50),
    ]),
    card_name: schema.string.optional([
      rules.minLength(3),
      rules.maxLength(100),
    ]),
    bank: schema.string.optional([
      rules.minLength(3),
      rules.maxLength(100),
    ]),
    card_number: schema.number.optional([
      rules.range(1000000000000000, 9999999999999999), // 16 dígitos
      rules.unique({
        table: 'bank_cards',
        column: 'card_number',
        whereNot: { id: this.ctx.params.id }, // 👈 Ignora el registro actual
      }),
    ]),
    ccv: schema.string.optional([
      rules.regex(/^\d{3,4}$/),
    ]),
    expiration: schema.date.optional({ format: 'yyyy-MM-dd' }, [
      rules.after('today'),
    ]),
    default: schema.boolean.optional(),
  })

  public messages: CustomMessages = {
    "idClient.exists": "El cliente asociado no existe",
    "cardNumber.range": "El número de tarjeta debe tener 16 dígitos",
    "cardNumber.unique": "Esta tarjeta ya está registrada",
    "CCV.regex": "El código CCV debe tener 3 o 4 dígitos numéricos",
    "expiration.after": "La fecha de expiración debe ser posterior a hoy",
  }
}
