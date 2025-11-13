import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'shifts'
 public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id"); // PK
      table.integer("driver_id").unsigned().notNullable().references("id").inTable("drivers").onDelete("CASCADE");
      table.integer('id_vehicule')
        .unsigned()
        .references('id')
        .inTable('vehicules')
        .onDelete('CASCADE')
      // Fechas de turno

      table.timestamp("shift_start", { useTz: true }).notNullable();
      table.timestamp("shift_end", { useTz: true }).notNullable();
      
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}