import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ActivityValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    price_activity: schema.number([rules.range(0, 1000000)]),
    
    // Nombre único por ciudad
    name: schema.string([
      rules.minLength(3),
      rules.maxLength(255),
      rules.unique({
        table: "activities",
        column: "name",
        where: { id_city: this.ctx.request.input("id_city") }
      })
    ]),

    // Descripción única por ciudad (opcional o required según tu lógica)
    description: schema.string.optional([
      rules.maxLength(1000),
      rules.unique({
        table: "activities",
        column: "description",
        where: { id_city: this.ctx.request.input("id_city") }
      })
    ]),

    id_city: schema.number([
      rules.exists({ table: "cities", column: "id" })
    ])
  });

  public messages: CustomMessages = {
    "price_activity.range": "El precio debe ser un valor positivo",
    "name.minLength": "El nombre debe tener al menos 3 caracteres",
    "id_city.exists": "La ciudad indicada no existe",
    "name.unique": "Ya existe una actividad con este nombre en la ciudad seleccionada",
    "description.unique": "Ya existe una actividad con esta descripción en la ciudad seleccionada"
  };
}
