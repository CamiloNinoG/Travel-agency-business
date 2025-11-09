import { DateTime } from "luxon";
import { BaseModel, column, belongsTo, BelongsTo } from "@ioc:Adonis/Lucid/Orm";
import City from "./City";

export default class Route extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column({ columnName: "id_origin" })
  public idOrigin: number;

  @column({ columnName: "id_destination" })
  public idDestination: number;

  @column()
  public duration: number;

  // Relaciones con City
  @belongsTo(() => City, { foreignKey: "idOrigin" })
  public originCity: BelongsTo<typeof City>;

  @belongsTo(() => City, { foreignKey: "idDestination" })
  public destinationCity: BelongsTo<typeof City>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
