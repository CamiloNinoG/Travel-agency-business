import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  hasOne,
  HasOne,
  hasMany,
  HasMany,
} from "@ioc:Adonis/Lucid/Orm";
import Bus from "./Bus";
import Airplane from "./Airplane";
import Gp from "./Gp";
import ServiceTransport from "./ServiceTransport";

export default class Vehicule extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public capacity: number;

  @column()
  public status: string;

  @hasOne(() => Bus, { foreignKey: "id_vehicule" })
  public bus: HasOne<typeof Bus>;

  @hasOne(() => Airplane, { foreignKey: "id_vehicule" })
  public airplane: HasOne<typeof Airplane>;

  @hasMany(() => Gp, { foreignKey: "id_vehicule" })
  public gps: HasMany<typeof Gp>;

  @hasMany(() => ServiceTransport, { foreignKey: "id_vehicule" })
  public services: HasMany<typeof ServiceTransport>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
