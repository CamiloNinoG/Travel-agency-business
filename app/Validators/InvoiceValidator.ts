import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator"
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"

export default class InvoiceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    cc: schema.number([
      rules.exists({ table: 'clients', column: 'cc' }), // o 'id' si en Client tienes id
    ]),
    idCard: schema.number([
      rules.exists({ table: 'bank_cards', column: 'id' }),
    ]),
    idInstallment: schema.number([
      rules.exists({ table: 'installments', column: 'id' }),
    ]),
    invoiceNumber: schema.number([
      rules.unique({ table: 'invoices', column: 'invoice_number' }),
    ]),
    amountTotal: schema.number([rules.range(1, 10000000)]),
    expiration: schema.date({ format: 'yyyy-MM-dd' }),
  });


  public messages: CustomMessages = {
    "idClient.exists": "El cliente especificado no existe",
    "idCard.exists": "La tarjeta asociada no existe",
    "idInstallment.exists": "La cuota asociada no existe",
    "invoiceNumber.unique": "El número de factura ya está en uso",
    "amountTotal.range": "El monto total debe ser mayor que 0",
  }
}
