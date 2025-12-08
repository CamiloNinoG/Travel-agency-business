import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import TouristPlan from "./TouristPlan";
import Activity from "./Activity";

export default class PlanActivity extends BaseModel {
  @column({ columnName: "id_activity" })
  public id_activity: number;

  @column({ columnName: "id_plan" })
  public id_plan: number;

  @belongsTo(() => TouristPlan, { foreignKey: "id_plan" })
  public plan: BelongsTo<typeof TouristPlan>;

  @belongsTo(() => Activity, { foreignKey: "id_activity" })
  public activity: BelongsTo<typeof Activity>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
