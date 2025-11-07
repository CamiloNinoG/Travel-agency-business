import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Client from './Client'
import Travel from './Travel'

export default class ClientTravel extends BaseModel {
  @column()
  public id_client: number

  @column()
  public id_travel: number

  @belongsTo(() => Client, { foreignKey: 'id_client' })
  public client: BelongsTo<typeof Client>

  @belongsTo(() => Travel, { foreignKey: 'id_travel' })
  public travel: BelongsTo<typeof Travel>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
