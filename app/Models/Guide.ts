import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import GuideActivity from './GuideActivity'

export default class Guide extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: "id_user" })
  public idUser: string // referencia al usuario (por ejemplo en MongoDB)

  @hasMany(() => GuideActivity, { foreignKey: 'id_guide' })
  public guideActivities: HasMany<typeof GuideActivity>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
