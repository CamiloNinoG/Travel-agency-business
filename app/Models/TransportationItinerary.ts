import { DateTime } from "luxon";
import { BaseModel, column, belongsTo, BelongsTo } from "@ioc:Adonis/Lucid/Orm";
import Route from "./Route";
import Travel from "./Travel";

export default class TransportationItinerary extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public idService: number;

  @column()
  public idTravel: number;

  @column()
  public idRoute: number;

  @column()
  public order: number;

  @belongsTo(() => Route, { foreignKey: "idRoute" })
  public route: BelongsTo<typeof Route>;

  @belongsTo(() => Travel, { foreignKey: "idTravel" })
  public travel: BelongsTo<typeof Travel>;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
