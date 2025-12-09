import { DateTime } from "luxon";
import { BaseModel, column, belongsTo, BelongsTo } from "@ioc:Adonis/Lucid/Orm";
import Vehicule from "./Vehicule";
import Hotel from "./Hotel";

export default class Bus extends BaseModel {
  @column({ isPrimary: true })
  public id_vehicule: number  // PK y FK al mismo tiempo

  @column()
  public id_hotel: number

  @column()
  public plate: string

  @belongsTo(() => Vehicule, { foreignKey: 'id_vehicule' })
  public vehicule: BelongsTo<typeof Vehicule>

  @belongsTo(() => Hotel, { foreignKey: 'id_hotel' })
  public hotel: BelongsTo<typeof Hotel>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
