import { DateTime } from "luxon";
import { BaseModel, column, belongsTo, BelongsTo } from "@ioc:Adonis/Lucid/Orm";
import Route from "./Route";
import Travel from "./Travel";

export default class TransportationItinerary extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  // Clave foránea para el servicio. Asumiendo que es id_service en la DB.
  @column({ columnName: "id_service" })
  public idService: number;

  // Clave foránea para el viaje.
  @column({ columnName: "id_travel" })
  public idTravel: number;

  // Clave foránea para la ruta.
  @column({ columnName: "id_route" })
  public idRoute: number;

  @column()
  public order: number;

  // Relación con Route, usando la clave foránea id_route
  @belongsTo(() => Route, { foreignKey: "id_route" })
  public route: BelongsTo<typeof Route>;

  // Relación con Travel, usando la clave foránea id_travel
  @belongsTo(() => Travel, { foreignKey: "id_travel" })
  public travel: BelongsTo<typeof Travel>;
    
  // NOTA: No tienes createdAt en el modelo, solo updatedAt.
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}