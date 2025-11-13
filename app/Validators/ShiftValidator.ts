// app/Validators/ShiftValidator.ts
import { schema, rules } from "@ioc:Adonis/Core/Validator";

export default class ShiftValidator {
  public schema = schema.create({
    driver_id: schema.number([
      rules.required(),
      rules.exists({ table: "drivers", column: "id" }),
    ]),

    id_vehicule: schema.number([
      rules.required(),
      rules.exists({ table: "vehicules", column: "id" }),
    ]),

    shift_start: schema.date(
      {
        format: "yyyy-MM-dd HH:mm:ss",
      },
      [
        rules.required(),
        rules.after("today"), // opcional
      ]
    ),

    shift_end: schema.date(
      {
        format: "yyyy-MM-dd HH:mm:ss",
      },
      [
        rules.required(),
        rules.afterField("shift_start"), 
      ]
    ),
  });

  public messages = {
    // driver_id
    "driver_id.required": "El ID del conductor es obligatorio.",
    "driver_id.exists": "El conductor seleccionado no existe.",

    // id_vehicule
    "id_vehicule.required": "El ID del vehículo es obligatorio.",
    "id_vehicule.exists": "El vehículo seleccionado no existe.",

    // shift_start
    "shift_start.required":
      "La fecha y hora de inicio del turno es obligatoria.",
    "shift_start.date.format":
      "La fecha de inicio debe tener el formato 'YYYY-MM-DD HH:mm:ss'.",
    "shift_start.after":
      "La fecha de inicio debe ser posterior a la fecha actual.",

    // shift_end
    "shift_end.required": "La fecha y hora de fin del turno es obligatoria.",
    "shift_end.date.format":
      "La fecha de fin debe tener el formato 'YYYY-MM-DD HH:mm:ss'.",
    "shift_end.afterField":
      "La fecha de fin debe ser posterior a la fecha de inicio.",
  };
}
