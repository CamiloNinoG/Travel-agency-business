import { DateTime } from 'luxon'
import { BaseModel,
  BelongsTo,
  belongsTo,
  column,
 } from '@ioc:Adonis/Lucid/Orm'
import Installment from './Installment'
import Client from './Client'
import BankCard from './BankCard'

export default class Invoice extends BaseModel {
  @column({ isPrimary: true })
public id: number

@column()
public id_client: number

@column()
public id_card: number

@column()
public id_installment: number

@column()
public invoice_number: string

@column()
public amount_total: number

@belongsTo(() => Client, { foreignKey: 'id_client' })
public client: BelongsTo<typeof Client>

@belongsTo(() => BankCard, { foreignKey: 'id_card' })
public card: BelongsTo<typeof BankCard>

@belongsTo(() => Installment, { foreignKey: 'id_installment' })
public installment: BelongsTo<typeof Installment>


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
