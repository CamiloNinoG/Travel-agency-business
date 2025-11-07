import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Route extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public origin: string; // nombre de la ciudad de origen

  @column()
  public destination: string; // nombre de la ciudad de destino

  @column()
  public duration: number;
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
