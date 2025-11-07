import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "service_transports";

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
        .integer("id_route")
        .unsigned()
        .references("id")
        .inTable("routes")
        .onDelete("CASCADE");

      table.timestamp("start_date", { useTz: true }).notNullable();
      table.timestamp("end_date", { useTz: true }).notNullable();

      table.float("price").notNullable();

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
