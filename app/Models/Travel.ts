import { DateTime } from "luxon";
import { BaseModel, column, hasMany, HasMany } from "@ioc:Adonis/Lucid/Orm";
import Installment from "./Installment";
import ClientTravel from "./ClientTravel";

export default class Travel extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public destination: string;

  @column()
  public origin: string;

  @column()
  public total_price: number;

  @hasMany(() => Installment, { foreignKey: "id_travel" })
  public installments: HasMany<typeof Installment>;

  @hasMany(() => ClientTravel, { foreignKey: "id_travel" })
  public clientTravels: HasMany<typeof ClientTravel>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
