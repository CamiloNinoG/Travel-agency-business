import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  hasMany,
  HasMany,
} from "@ioc:Adonis/Lucid/Orm";

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

  @hasMany(() => PlanActivity, { foreignKey: "id_plan" })
  public planActivities: HasMany<typeof PlanActivity>;

  @hasMany(() => TravelPlan, { foreignKey: "id_plan" })
  public travelPlans: HasMany<typeof TravelPlan>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
