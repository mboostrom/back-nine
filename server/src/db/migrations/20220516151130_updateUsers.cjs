/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.table('users', (table) => {
    table.string('firstName')
    table.string('lastName')
    table.string('userName').notNullable().unique()
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.table('users', (table) => {
    table.dropColumn('firstName')
    table.dropColumn('lastName')
    table.dropColumn('userName')
  })
}
