import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "plan_activities";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .integer("id_activity")
        .unsigned()
        .references("id")
        .inTable("activities")
        .onDelete("CASCADE");

      table
        .integer("id_plan")
        .unsigned()
        .references("id")
        .inTable("tourist_plans")
        .onDelete("CASCADE");

        table.primary(["id_activity", "id_plan"]);

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
