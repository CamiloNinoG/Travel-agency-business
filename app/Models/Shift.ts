// app/Models/Shift.ts
import { DateTime } from "luxon";
import { BaseModel, column, belongsTo, BelongsTo } from "@ioc:Adonis/Lucid/Orm";
import Driver from "./Driver";
import Vehicle from "./Vehicule";

export default class Shift extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public driver_id: number;

  @column()
  public id_vehicule: number;

  @column.date()
  public shift_start: DateTime;

  @column.date()
  public shift_end: DateTime;

  @belongsTo(() => Driver)
  public driver: BelongsTo<typeof Driver>;

  @belongsTo(() => Vehicle)
  public vehicle: BelongsTo<typeof Vehicle>;
}
