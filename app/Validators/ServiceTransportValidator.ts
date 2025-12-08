import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ServiceTransportValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id_vehicule: schema.number([
      rules.exists({ table: "vehicules", column: "id" }),
    ]),
    id_route: schema.number([rules.exists({ table: "routes", column: "id" })]),
    start_date: schema.date({ format: "yyyy-MM-dd HH:mm:ss" }, [
      rules.after("today"), 
    ]),
    
    end_date: schema.date.optional({ format: "yyyy-MM-dd HH:mm:ss" }, [
      rules.afterField("start_date"), 
    ]),
    
    price: schema.number.optional([rules.range(1, 10000000)]),
  });

  public messages: CustomMessages = {
    "id_vehicule.exists": "El vehículo asociado no existe",
    "id_route.exists": "La ruta asociada no existe", 
    "start_date.after": "La fecha/hora de inicio debe ser posterior al momento actual",
    "end_date.afterField": "La fecha/hora de fin debe ser posterior a la de inicio",
    "price.range": "El precio debe estar entre 1 y 10,000,000",
    "*.required": "El campo {{ field }} es obligatorio",
  };
}