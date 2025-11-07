import { DateTime } from "luxon";
import { BaseModel, column, belongsTo, BelongsTo } from "@ioc:Adonis/Lucid/Orm";
import Hotel from "./Hotel";

export default class Room extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public idHotel: number;

  @column()
  public priceRoom: number;

  @column()
  public type: string;

  @belongsTo(() => Hotel, { foreignKey: "id_hotel" })
  public hotel: BelongsTo<typeof Hotel>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
