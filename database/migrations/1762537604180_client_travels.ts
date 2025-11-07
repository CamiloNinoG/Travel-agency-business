import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "client_travels";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer("id_travel").unsigned().references("id").inTable("travels");
      table.integer("id_client").unsigned().references("id").inTable("clients");
      table.primary(["id_travel", "id_client"]);

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
