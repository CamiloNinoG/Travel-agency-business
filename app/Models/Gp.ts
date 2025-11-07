import { DateTime } from "luxon";
import { BaseModel, column, belongsTo, BelongsTo } from "@ioc:Adonis/Lucid/Orm";
import Vehicule from "./Vehicule";

export default class Gp extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public idVehicule: number;

  @column()
  public latitud: string;

  @column()
  public longitude: string;

  @belongsTo(() => Vehicule, { foreignKey: "idVehicule" })
  public vehicule: BelongsTo<typeof Vehicule>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
