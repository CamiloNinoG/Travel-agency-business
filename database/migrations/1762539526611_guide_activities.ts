import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "guide_activities";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .integer("id_guide")
        .unsigned()
        .references("id")
        .inTable("guides")
        .onDelete("CASCADE");

      table
        .integer("id_activity")
        .unsigned()
        .references("id")
        .inTable("activities")
        .onDelete("CASCADE");

        table.primary(["id_guide", "id_activity"]);
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
