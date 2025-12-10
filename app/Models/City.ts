import { DateTime } from "luxon";
import { BaseModel, column, hasMany, HasMany } from "@ioc:Adonis/Lucid/Orm";
import TouristPlan from "./TouristPlan";
import Hotel from "./Hotel";

export default class City extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public ubication: string;

  @hasMany(() => TouristPlan, { foreignKey: "id_city" })
  public touristPlans: HasMany<typeof TouristPlan>;

  @hasMany(() => Hotel, { foreignKey: "id_city" })
  public hotels: HasMany<typeof Hotel>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
