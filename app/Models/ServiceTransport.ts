import { DateTime } from "luxon";
import { BaseModel, column, belongsTo, BelongsTo } from "@ioc:Adonis/Lucid/Orm";
import Vehicule from "./Vehicule";
import Route from "./Route";

export default class ServiceTransport extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column({ columnName: "id_vehicule" })
  public id_vehicule: number;

  @column({ columnName: "id_route" })
  public id_route: number;

  @column.date()
  public start_date: DateTime;

  @column.date()
  public end_date: DateTime;

  @column()
  public price: number;

  @belongsTo(() => Vehicule, { foreignKey: "idVehicule" })
  public vehicule: BelongsTo<typeof Vehicule>;

  @belongsTo(() => Route, { foreignKey: "id_route" })
  public route: BelongsTo<typeof Route>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
