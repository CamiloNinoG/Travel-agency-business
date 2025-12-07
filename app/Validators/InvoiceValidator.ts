import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class InvoiceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    // La columna en el modelo Invoice es 'cc' y se relaciona con el campo 'cc' del cliente.
    cc: schema.number([
      rules.required(),
      rules.exists({ table: "clients", column: "cc" }),
    ]),

    // Columna 'id_card'
    id_card: schema.number([
      rules.required(),
      rules.exists({ table: "bank_cards", column: "id" }),
    ]),

    // Columna 'id_installment'
    id_installment: schema.number([
      rules.required(),
      rules.exists({ table: "installments", column: "id" }),
    ]),

    // Columna 'invoice_number'
    invoice_number: schema.number([
      rules.required(),
      rules.unique({ table: "invoices", column: "invoice_number" }),
    ]),

    // Columna 'amount_total'. Agregué rules.required()
    amount_total: schema.number([
      rules.required(),
      rules.range(0.01, 10000000), // Rango mayor que 0
    ]),

    // Nota: No tienes una columna 'date' en tu modelo Invoice.
    // Si realmente la necesitas, debes agregarla al modelo. La he eliminado de la validación.
  });

  // ---

  public messages: CustomMessages = {
    // Mensajes para las reglas de required
    "cc.required": "El campo del documento del cliente (cc) es obligatorio.",
    "id_card.required": "El ID de la tarjeta es obligatorio.",
    "id_installment.required": "El ID de la cuota es obligatorio.",
    "invoice_number.required": "El número de factura es obligatorio.",
    "amount_total.required": "El monto total es obligatorio.",

    // Mensajes para las reglas de exists y unique
    "cc.exists": "El cliente con ese documento (cc) no existe.",
    "id_card.exists": "La tarjeta bancaria asociada no existe.",
    "id_installment.exists": "La cuota asociada no existe.",
    "invoice_number.unique": "El número de factura ya está en uso.",

    // Mensaje para el rango del monto
    "amount_total.range": "El monto total debe ser mayor que 0.",
  };
}