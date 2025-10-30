import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Movie from './Movie'
import Theater from './Theater'

export default class Screening extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public movie_id: number

  @column()
  public theater_id: number

  @column.dateTime()
  public date: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


    @belongsTo(() => Movie, {
      foreignKey: 'movie_id', // Foreign key on the movie model
    })
    public movie: BelongsTo<typeof Movie>


    @belongsTo(() => Theater, {
      foreignKey: 'theater_id', // Foreign key on the theater model
    })
    public theater: BelongsTo<typeof Theater>
    
}
