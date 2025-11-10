import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "routes";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      
      // Llaves foráneas a cities
      table
        .integer("id_origin")
        .unsigned()
        .references("id")
        .inTable("cities")
        .onDelete("CASCADE");

      table
        .integer("id_destination")
        .unsigned()
        .references("id")
        .inTable("cities")
        .onDelete("CASCADE");

      table.integer("duration").notNullable();

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
