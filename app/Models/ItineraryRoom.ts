import { DateTime } from 'luxon'
import Itinerary from './TransportationItinerary'
import Room from './Room'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'

export default class ItineraryRoom extends BaseModel {
  public static table = 'itinerary_rooms'

  @column({ isPrimary: true })
  public idItinerary: number

  @column({ isPrimary: true })
  public idRoom: number

  @belongsTo(() => Itinerary, { foreignKey: 'idItinerary' })
  public itinerary: BelongsTo<typeof Itinerary>

  @belongsTo(() => Room, { foreignKey: 'idRoom' })
  public room: BelongsTo<typeof Room>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
