import { DateTime } from "luxon";
import { BaseModel, column, belongsTo, BelongsTo } from "@ioc:Adonis/Lucid/Orm";
import Vehicule from "./Vehicule";
import Hotel from "./Hotel";

export default class Bus extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public idVehicule: number;

  @column()
  public idHotel: number;

  @column()
  public plate: string;

  @belongsTo(() => Vehicule, { foreignKey: "idVehicule" })
  public vehicule: BelongsTo<typeof Vehicule>;

  @belongsTo(() => Hotel, { foreignKey: "idHotel" })
  public hotel: BelongsTo<typeof Hotel>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
