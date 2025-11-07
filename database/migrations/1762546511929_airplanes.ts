import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "airplanes";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");

      table
        .integer("id_vehicule")
        .unsigned()
        .references("id")
        .inTable("vehicules")
        .onDelete("CASCADE");
      table
        .integer("id_airline")
        .unsigned()
        .references("id")
        .inTable("airlines")
        .onDelete("CASCADE");

      table.string("code").notNullable();

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
