import { DateTime } from "luxon";
import { BaseModel, column, belongsTo, BelongsTo } from "@ioc:Adonis/Lucid/Orm";
import Vehicule from "./Vehicule";
import Airline from "./Airline";

export default class Airplane extends BaseModel {
  @column({ isPrimary: true, columnName: 'id_vehicule' })
  public idVehicule: number

  @column({ columnName: 'id_airline' })
  public idAirline: number
  
  @column()
  public code: string

  @belongsTo(() => Vehicule, { foreignKey: 'idVehicule' })
  public vehicule: BelongsTo<typeof Vehicule>

  @belongsTo(() => Airline, { foreignKey: 'idAirline' })
  public airline: BelongsTo<typeof Airline>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
