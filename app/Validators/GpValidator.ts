import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class GPSValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = this.createSchema();

  private createSchema() {
    const isCreating = this.ctx.request.method() === "POST";

    return schema.create({
      id_vehicule: isCreating
        ? schema.number([rules.exists({ table: 'vehicules', column: 'id' })])
        : schema.number.optional([rules.exists({ table: 'vehicules', column: 'id' })]),

      latitud: isCreating
        ? schema.string([rules.regex(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)/)])
        : schema.string.optional([rules.regex(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)/)]),

      longitude: isCreating
        ? schema.string([rules.regex(/^[-+]?((1[0-7]\d)|(\d{1,2}))(\.\d+)?|180(\.0+)?/)])
        : schema.string.optional([rules.regex(/^[-+]?((1[0-7]\d)|(\d{1,2}))(\.\d+)?|180(\.0+)?/)]),
    });
  }

  public messages: CustomMessages = {
    "id_vehicule.exists": "El vehículo asociado no existe",
    "latitud.regex": "La latitud debe estar en formato válido (-90 a 90)",
    "longitude.regex": "La longitud debe estar en formato válido (-180 a 180)",
  };
}
