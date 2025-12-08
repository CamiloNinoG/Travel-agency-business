import { DateTime } from "luxon";
import { BaseModel, column, belongsTo, BelongsTo } from "@ioc:Adonis/Lucid/Orm";
import City from "./City";

export default class Route extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column({ columnName: "id_origin" })
  public id_origin: number;

  @column({ columnName: "id_destination" })
  public id_destination: number;

  @column()
  public duration: number;

  // Relaciones con City
  @belongsTo(() => City, { foreignKey: "id_origin" })
  public originCity: BelongsTo<typeof City>;

  @belongsTo(() => City, { foreignKey: "id_destination" })
  public destinationCity: BelongsTo<typeof City>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
