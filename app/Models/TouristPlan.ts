import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  belongsTo,
  BelongsTo,
  hasMany,
  HasMany,
} from "@ioc:Adonis/Lucid/Orm";
import City from "./City";
import PlanActivity from "./PlanActivity";
import TravelPlan from "./TravelPlan";

export default class TouristPlan extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public type: string;

  @column()
  public total: number;

  @column()
  public id_city: number;

  @belongsTo(() => City, { foreignKey: "id_city" })
  public city: BelongsTo<typeof City>;

  @hasMany(() => PlanActivity, { foreignKey: "id_plan" })
  public planActivities: HasMany<typeof PlanActivity>;

  @hasMany(() => TravelPlan, { foreignKey: "id_plan" })
  public travelPlans: HasMany<typeof TravelPlan>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
