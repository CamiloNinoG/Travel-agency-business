import { DateTime } from "luxon";
import { BaseModel, column, belongsTo, BelongsTo } from "@ioc:Adonis/Lucid/Orm";
import Hotel from "./Hotel";

export default class Room extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column({ columnName: "id_hotel" })
  public idHotel: number;

  @column()
  public priceRoom: number;

  @column()
  public type: string;

  @belongsTo(() => Hotel, { foreignKey: "idHotel" }) // 👈 clave del modelo actual
  public hotel: BelongsTo<typeof Hotel>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
