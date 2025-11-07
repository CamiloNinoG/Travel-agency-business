import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator"
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"

export default class ServiceTransportValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    idVehicule: schema.number([
      rules.exists({ table: 'vehicules', column: 'id' }),
    ]),
    idRoute: schema.number([
      rules.exists({ table: 'routes', column: 'id' }),
    ]),
    startDate: schema.date({ format: 'yyyy-MM-dd HH:mm:ss' }, [
      rules.after('today'),
    ]),
    endDate: schema.date({ format: 'yyyy-MM-dd HH:mm:ss' }, [
      rules.afterField('startDate'),
    ]),
    price: schema.number([rules.range(1, 10000000)]),
  })

  public messages: CustomMessages = {
    "idVehicule.exists": "El vehículo asociado no existe",
    "idRoute.exists": "La ruta asociada no existe",
    "startDate.after": "La fecha de inicio debe ser posterior al 2020",
    "endDate.afterField": "La fecha de fin debe ser posterior a la de inicio",
    "price.range": "El precio debe ser mayor a 0",
  }
}
