import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Hotel from './Hotel'

export default class Administrator extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: "id_user" })
  public idUser: string

  @hasMany(() => Hotel, { foreignKey: 'id_admin' })
  public hotels: HasMany<typeof Hotel>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
