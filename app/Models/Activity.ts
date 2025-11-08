import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany} from '@ioc:Adonis/Lucid/Orm'
import PlanActivity from './PlanActivity'
import GuideActivity from './GuideActivity'


export default class Activity extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public price_activity: number

  @column()
  public name: string

  @column()
  public description: string

  @hasMany(() => PlanActivity, { foreignKey: 'id_activity' })
  public planActivities: HasMany<typeof PlanActivity>

  @hasMany(() => GuideActivity, { foreignKey: 'id_activity' })
  public guideActivities: HasMany<typeof GuideActivity>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
