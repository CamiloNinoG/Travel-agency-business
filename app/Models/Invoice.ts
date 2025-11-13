import { DateTime } from "luxon";
import { BaseModel, column, belongsTo, BelongsTo } from "@ioc:Adonis/Lucid/Orm";
import BankCard from "./BankCard";
import Installment from "./Installment";
import Client from "./Client";

export default class Invoice extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column({ columnName: "id_card" })
  public idCard: number;

  @column()
  public cc: number; // Se asocia al campo CC del cliente

  @column({ columnName: "id_installment" })
  public idInstallment: number;

  @column({ columnName: "invoice_number" })
  public invoiceNumber: number;

  @column({ columnName: "amount_total" })
  public amountTotal: number;

  // Relaciones
  @belongsTo(() => BankCard, { foreignKey: "id_card" })
  public bankCard: BelongsTo<typeof BankCard>;

  @belongsTo(() => Client, { foreignKey: "cc", localKey: "cc" })
  public client: BelongsTo<typeof Client>;

  @belongsTo(() => Installment, { foreignKey: "idInstallment" })
  public installment: BelongsTo<typeof Installment>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
