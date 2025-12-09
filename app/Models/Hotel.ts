import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import City from './City'
import Administrator from './Administrator'
import Room from './Room'

export default class Hotel extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'id_city' })
  public idCity: number

  @column({ columnName: 'id_admin' })
  public idAdmin: number

  @column()
  public name: string

  @column()
  public capacity: number

  @column()
  public address: string

  @belongsTo(() => City, { foreignKey: 'idCity' })
  public city: BelongsTo<typeof City>

  @belongsTo(() => Administrator, { foreignKey: 'id_admin' })
  public administrator: BelongsTo<typeof Administrator>

  @hasMany(() => Room, { foreignKey: 'id_hotel' }) 
  public rooms: HasMany<typeof Room>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
