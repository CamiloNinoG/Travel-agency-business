import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator"
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"

export default class BankCardUpdate {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id_client: schema.number.optional([
      rules.exists({ table: 'clients', column: 'id' }),
    ]),
    type: schema.string.optional([rules.minLength(3), rules.maxLength(50)]),
    card_name: schema.string.optional([rules.minLength(3), rules.maxLength(100)]),
    bank: schema.string.optional([rules.minLength(3), rules.maxLength(100)]),
    card_number: schema.number.optional([
      rules.range(100000, 999999),
      rules.unique({
        table: 'bank_cards',
        column: 'card_number',
        whereNot: { id: this.ctx.params.id }, // 🟢 IGNORAR EL MISMO ID
      }),
    ]),
    ccv: schema.string.optional([rules.regex(/^\d{3,4}$/)]),
    expiration: schema.date.optional({ format: 'yyyy-MM-dd' }, [
      rules.after('today'),
    ]),
    default: schema.boolean.optional(),
    balance: schema.number.optional([rules.unsigned()]),
  })

  public messages: CustomMessages = {
    "id_client.exists": "El cliente asociado no existe",
    "card_number.range": "El número de tarjeta debe tener 6 dígitos",
    "card_number.unique": "Esta tarjeta ya está registrada",
    "ccv.regex": "El código CCV debe tener 3 o 4 dígitos numéricos",
    "expiration.after": "La fecha de expiración debe ser posterior a hoy",
    "balance.unsigned": "El saldo no puede ser negativo",
  }
}
