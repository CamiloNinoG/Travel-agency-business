import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "invoices";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.integer("id_client").unsigned().references("id").inTable("clients");
      table
        .integer("id_card")
        .unsigned()
        .references("id")
        .inTable("bank_cards");
      table
        .integer("id_installment")
        .unsigned()
        .references("id")
        .inTable("installments");
      table.string("invoice_number");
      table.decimal("amount_total", 10, 2);
      table.date("date");

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
