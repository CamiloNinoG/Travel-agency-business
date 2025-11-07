import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  hasMany,
  HasMany,
} from "@ioc:Adonis/Lucid/Orm";
import Client from "./Client";
import Invoice from "./Invoice";

export default class BackCard extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public id_client: number;

  @column()
  public type: string;

  @column()
  public bank: string;

  @column()
  public card_number: string;

  @column()
  public ccv: string;

  @column()
  public default: boolean;

  @belongsTo(() => Client, { foreignKey: "id_client" })
  public client: BelongsTo<typeof Client>;

  @hasMany(() => Invoice, { foreignKey: "id_card" })
  public invoices: HasMany<typeof Invoice>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
