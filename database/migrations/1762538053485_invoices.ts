import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "invoices";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");

      // FK hacia BankCard
      table
        .integer("id_card")
        .unsigned()
        .references("id")
        .inTable("bank_cards")
        .onDelete("CASCADE");

      // FK hacia Client (por el campo CC)
      table.integer("cc").notNullable();

      // FK hacia Installment
      table
        .integer("id_installment")
        .unsigned()
        .references("id")
        .inTable("installments")
        .onDelete("CASCADE");

      table.integer("invoice_number").notNullable();
      table.decimal("amount_total", 10, 2).notNullable();
      // table.timestamp("expiration", { useTz: false }).notNullable();

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
