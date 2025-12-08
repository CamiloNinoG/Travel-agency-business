import { DateTime } from "luxon";
import { BaseModel, column, belongsTo, BelongsTo } from "@ioc:Adonis/Lucid/Orm";
import Vehicule from "./Vehicule";
import Airline from "./Airline";

export default class Airplane extends BaseModel {
 @column({ isPrimary: true })
  public id_vehicule: number  // PK y FK al mismo tiempo

  @column()
  public id_airline: number

  @column()
  public code: string

  @belongsTo(() => Vehicule, { foreignKey: 'id_vehicule' })
  public vehicule: BelongsTo<typeof Vehicule>

  @belongsTo(() => Airline, { foreignKey: 'id_airline' })
  public airline: BelongsTo<typeof Airline>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
