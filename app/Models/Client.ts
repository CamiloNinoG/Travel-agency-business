import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import BankCard from './BankCard'
import Invoice from './Invoice'
import ClientTravel from './ClientTravel'
import { DateTime } from 'luxon'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_user: string // referencia al usuario en MongoDB

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  
  @hasMany(() => BankCard, { foreignKey: 'id_client' })
  public bankCards: HasMany<typeof BankCard>

  @hasMany(() => Invoice, { foreignKey: 'id_client' })
  public invoices: HasMany<typeof Invoice>

  @hasMany(() => ClientTravel, { foreignKey: 'id_client' })
  public clientTravels: HasMany<typeof ClientTravel>
}
