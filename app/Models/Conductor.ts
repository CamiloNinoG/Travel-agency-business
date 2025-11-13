import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Conductor extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'id_user' })
  public idUser: string
  
  @column()
  public experiencia: number

  @column()
  public nombre: string

  @column()
  public email: string
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
