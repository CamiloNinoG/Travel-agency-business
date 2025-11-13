import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'turnos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer("id_conductor")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("conductors")
        .onDelete("CASCADE");
      table
        .integer("id_vehicule")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("vehicules")
        .onDelete("CASCADE");

      table.date("fecha_inicio");
      table.date("fecha_fin")
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
