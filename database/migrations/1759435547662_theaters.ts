import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'theaters'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      // crecacion de atributos en las tablas, con sus constraits
      table.increments('id')
      table.string('location', 255).notNullable()
      table.integer('capacity').notNullable()

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
