// app/Models/Driver.ts
import { BaseModel, column, hasMany, HasMany } from "@ioc:Adonis/Lucid/Orm";
import Shift from "./Shift";

export default class Driver extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public id_user: string;

  @column()
  public experience: string;

  @hasMany(() => Shift)
  public shifts: HasMany<typeof Shift>;
}
