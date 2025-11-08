import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import TouristPlan from "./TouristPlan";
import Travel from "./Travel";

export default class TravelPlan extends BaseModel {
  @column({ columnName: "id_travel" })
  public idTravel: number;

  @column({ columnName: "id_plan" })
  public idPlan: number;

  @belongsTo(() => TouristPlan, { foreignKey: "id_plan" })
  public plan: BelongsTo<typeof TouristPlan>;

  @belongsTo(() => Travel, { foreignKey: "id_travel" })
  public travel: BelongsTo<typeof Travel>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
