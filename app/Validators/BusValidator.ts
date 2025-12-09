import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class BusValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = this.createSchema();

  private createSchema() {
    const isCreating = this.ctx.request.method() === "POST";
    const currentId = this.ctx.params.id; // id del bus si es PUT/PATCH

    return schema.create({
      id_vehicule: isCreating
        ? schema.number([
            rules.exists({ table: 'vehicules', column: 'id' }),
            rules.unique({ table: 'buses', column: 'id_vehicule' }),
          ])
        : schema.number.optional([
            rules.exists({ table: 'vehicules', column: 'id' }),
            rules.unique({ table: 'buses', column: 'id_vehicule', whereNot: { id: currentId } }),
          ]),

      idHotel: isCreating
        ? schema.number([rules.exists({ table: 'hotels', column: 'id' })])
        : schema.number.optional([rules.exists({ table: 'hotels', column: 'id' })]),

      plate: isCreating
        ? schema.string([
            rules.regex(/^[A-Z0-9-]{5,10}$/),
            rules.unique({ table: 'buses', column: 'plate' }),
          ])
        : schema.string.optional([
            rules.regex(/^[A-Z0-9-]{5,10}$/),
            rules.unique({ table: 'buses', column: 'plate', whereNot: { id: currentId } }),
          ]),
    });
  }

  public messages: CustomMessages = {
    "id_vehicule.exists": "El vehículo asociado no existe",
    "id_vehicule.unique": "Este vehículo ya está asignado a un bus",
    "idHotel.exists": "El hotel asociado no existe",
    "plate.regex": "La placa debe tener entre 5 y 10 caracteres alfanuméricos o guiones",
    "plate.unique": "Ya existe un bus con esa placa",
  };
}
