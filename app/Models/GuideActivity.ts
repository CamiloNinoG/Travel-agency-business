import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Guide from './Guide'
import Activity from './Activity'

export default class GuideActivity extends BaseModel {
  @column({ columnName: "id_guide" })
  public idGuide: number

  @column({ columnName: "id_activity" })
  public idActivity: number

  @belongsTo(() => Guide, { foreignKey: 'id_guide' })
  public guide: BelongsTo<typeof Guide>

  @belongsTo(() => Activity, { foreignKey: 'id_activity' })
  public activity: BelongsTo<typeof Activity>
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
