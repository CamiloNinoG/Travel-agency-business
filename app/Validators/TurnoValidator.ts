import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TurnoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id_conductor: schema.number([
      rules.exists({table: 'conductors', column: 'id'})
    ]),

    id_vehicule: schema.number([
      rules.exists({table: 'vehicules', column: 'id'})
    ]),

    fecha_inicio: schema.date({}, [
      rules.after('today'),
    ]),

    fecha_fin: schema.date({}, [
      rules.after('today'), 
    ]),
  })

  public messages: CustomMessages = {
    "id_conductors.exists":"El conductor no existe",
    "id_vehicule.exists":"El vehiculo no existe",
    "fecha_inicio.after": "La fecha de inicio debe ser posterior a la fecha actual",
    "fecha_fin.after": "La fecha de fin debe ser posterior a la fecha de inicio",
  }
}
