import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator"
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"

export default class InvoiceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id_client: schema.number([
      rules.exists({ table: 'clients', column: 'id' }),
    ]),
    id_card: schema.number([
      rules.exists({ table: 'bank_cards', column: 'id' }),
    ]),
    id_installment: schema.number([
      rules.exists({ table: 'installments', column: 'id' }),
    ]),
    invoice_number: schema.number([
      rules.unique({ table: 'invoices', column: 'invoice_number' }),
    ]),
    amount_total: schema.number([rules.range(1, 10000000)]),
    date: schema.date({ format: 'yyyy-MM-dd' }),
  })

  public messages: CustomMessages = {
    "id_client.exists": "El cliente especificado no existe",
    "id_card.exists": "La tarjeta asociada no existe",
    "id_installment.exists": "La cuota asociada no existe",
    "invoice_number.unique": "El número de factura ya está en uso",
    "amount_total.range": "El monto total debe ser mayor que 0",
  }
}
