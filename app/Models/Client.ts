import { DateTime } from "luxon";
import { BaseModel, column, hasMany, HasMany } from "@ioc:Adonis/Lucid/Orm";
import BankCard from "./BankCard";
import ClientTravel from "./ClientTravel";

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column({ columnName: "id_user" })
  public idUser: number;

  @column()
  public phone: number;

  @column()
  public city: string;

  @column()
  public cc: number;

  @hasMany(() => BankCard, { foreignKey: "idClient" })
  public bankCards: HasMany<typeof BankCard>;

  @hasMany(() => ClientTravel, { foreignKey: "idClient" })
  public travels: HasMany<typeof ClientTravel>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
