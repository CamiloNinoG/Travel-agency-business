import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Conductor from './Conductor'
import Vehicule from './Vehicule'

export default class Turno extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: "id_conductor"})
  public idConductor: number

  @column({ columnName: "id_vehicule"})
  public idVehicule: number

  @column.date({ columnName: 'fecha_inicio' })
  public fechaInicio: DateTime

  @column.date({ columnName: 'fecha_fin' })
  public fechaFin: DateTime

  @belongsTo(() => Conductor, { foreignKey: "id_conductor" })
  public conductor: BelongsTo<typeof Conductor>;

  @belongsTo(() => Vehicule, { foreignKey: "id_vehicule" })
  public vehicule: BelongsTo<typeof Vehicule>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}
