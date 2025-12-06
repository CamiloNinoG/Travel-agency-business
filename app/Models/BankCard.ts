import { DateTime } from "luxon";
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany } from "@ioc:Adonis/Lucid/Orm";
import Client from "./Client";
import Invoice from "./Invoice";

export default class BankCard extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column({ columnName: "id_client" })
  public idClient: number;

  @column()
  public type: string;

  @column()
  public bank: string;

  @column({ columnName: "card_name" })
  public cardName: string;

  @column({ columnName: "card_number" })
  public cardNumber: number;

  @column()
  public ccv: string;

  @column.dateTime()
  public expiration: DateTime;

  @column()
  public default: boolean;
  
  @column()
  public balance: number;

  @belongsTo(() => Client, { foreignKey: "idClient" })
  public client: BelongsTo<typeof Client>;

  @hasMany(() => Invoice, { foreignKey: "id_card" })
  public invoices: HasMany<typeof Invoice>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}