import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddCardNameToBankCards extends BaseSchema {
  protected tableName = 'bank_cards'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('card_name')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('card_name')
    })
  }
}
