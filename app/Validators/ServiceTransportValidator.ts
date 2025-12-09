import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ServiceTransportValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = this.createSchema();

  private createSchema() {
    const isCreating = this.ctx.request.method() === "POST";

    return schema.create({
      id_vehicule: isCreating
        ? schema.number([rules.exists({ table: "vehicules", column: "id" })])
        : schema.number.optional([rules.exists({ table: "vehicules", column: "id" })]),

      id_route: isCreating
        ? schema.number([rules.exists({ table: "routes", column: "id" })])
        : schema.number.optional([rules.exists({ table: "routes", column: "id" })]),

      start_date: isCreating
        ? schema.date({ format: "yyyy-MM-dd HH:mm:ss" }, [rules.after("today")])
        : schema.date.optional({ format: "yyyy-MM-dd HH:mm:ss" }, [rules.after("today")]),

      end_date: isCreating
        ? schema.date.optional({ format: "yyyy-MM-dd HH:mm:ss" }, [
            rules.afterField("start_date"),
          ])
        : schema.date.optional({ format: "yyyy-MM-dd HH:mm:ss" }, [
            rules.afterField("start_date"),
          ]),

      price: isCreating
        ? schema.number.optional([rules.range(1, 10000000)])
        : schema.number.optional([rules.range(1, 10000000)]),
    });
  }

  public messages: CustomMessages = {
    "id_vehicule.exists": "El vehículo asociado no existe",
    "id_route.exists": "La ruta asociada no existe",
    "start_date.after": "La fecha/hora de inicio debe ser posterior al momento actual",
    "end_date.afterField": "La fecha/hora de fin debe ser posterior a la de inicio",
    "price.range": "El precio debe estar entre 1 y 10,000,000",
    "*.required": "El campo {{ field }} es obligatorio",
  };
}
