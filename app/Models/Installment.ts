import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasOne,
  hasOne,
} from "@ioc:Adonis/Lucid/Orm";
import Travel from "./Travel";
import Invoice from "./Invoice";

export default class Installment extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public id_travel: number;

  @column()
  public amount: number;

  @column()
  public status: string;

  @belongsTo(() => Travel, { foreignKey: "id_travel" })
  public travel: BelongsTo<typeof Travel>;

  @hasOne(() => Invoice, { foreignKey: "id_installment" })
  public invoice: HasOne<typeof Invoice>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
