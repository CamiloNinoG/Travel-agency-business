import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class TransportationItineraryValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    // 1. Corregido el nombre a 'idService' y añadida la regla exists para opcionales
    id_service: schema.number.optional([
      rules.exists({ table: 'service_transports', column: 'id' }),
    ]), 
    
    id_travel: schema.number([
      rules.exists({ table: 'travels', column: 'id' }),
    ]),
    
    id_route: schema.number([
      rules.exists({ table: 'routes', column: 'id' }),
    ]),
    
    // 2. Corregido a 'order' (minúsculas) para coincidir con el modelo
    order: schema.number([ 
      rules.range(1, 100),
    ]),
  });

  public messages: CustomMessages = {
    // Claves de campos corregidas para usar camelCase:
    "idService.exists": "El servicio indicado no existe",
    "idTravel.exists": "El viaje indicado no existe",
    "idRoute.exists": "La ruta indicada no existe",
    
    // Clave corregida a 'order' (minúsculas)
    "order.range": "El orden debe ser un número entre 1 y 100",
    
    // Mensaje genérico para campos requeridos (si no son opcionales)
    "*.required": "El campo {{ field }} es obligatorio",
  };
}