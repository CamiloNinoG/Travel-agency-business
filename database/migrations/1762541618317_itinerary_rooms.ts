import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "itinerary_rooms";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .integer("id_itinerary")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("transportation_itineraries")
        .onDelete("CASCADE");
      table
        .integer("id_room")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("rooms")
        .onDelete("CASCADE");

      table.primary(["id_itinerary", "id_room"]);

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
