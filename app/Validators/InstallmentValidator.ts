import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class InstallmentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id_travel: schema.number.optional([
      rules.exists({ table: "travels", column: "id" }),
    ]),
    amount: schema.number.optional([rules.range(1, 10000000)]),
    status: schema.string.optional([rules.minLength(3), rules.maxLength(50)]),
    createAt: schema.date.optional({ format: "yyyy-MM-dd" }, [
      // rules.required(), // Asegura que el campo sea obligatorio
      // rules.afterField("today"),
    ]),
  });

  public messages: CustomMessages = {
    "id_travel.exists": "El viaje asociado no existe",
    "amount.range": "El monto debe ser mayor que 0",
    "status.required": "Debe indicar el estado del pago",
    "createAt.required": "La fecha de la cuota es obligatoria.",
    "createAt.format": "La fecha de la cuota debe tener el formato YYYY-MM-DD.",
  };
}
