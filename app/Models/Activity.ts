import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import PlanActivity from "./PlanActivity";
import GuideActivity from "./GuideActivity";
import City from "./City";

export default class Activity extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column({ columnName: "price_activity" }) // 👈 importante si tu campo SQL es con underscore
  public priceActivity: number;

  @column()
  public name: string;

  @column()
  public description: string;

  @column({ columnName: "id_city" }) // Columna en la base de datos sigue en snake_case
  public idCity: number;  

  @belongsTo(() => City, { foreignKey: "idCity" })
  public city: BelongsTo<typeof City>;

  @hasMany(() => PlanActivity, { foreignKey: "id_activity" })
  public planActivities: HasMany<typeof PlanActivity>;

  @hasMany(() => GuideActivity, { foreignKey: "id_activity" })
  public guideActivities: HasMany<typeof GuideActivity>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
