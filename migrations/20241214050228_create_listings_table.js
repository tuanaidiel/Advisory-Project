/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('listings', (table) => {
      table.bigIncrements('id').unsigned().primary();
      table.string('name', 255).notNullable();
      table.decimal('latitude', 20, 6).notNullable().checkBetween([-90, 90]); 
      table.decimal('longitude', 20, 6).notNullable().checkBetween([-180, 180]); 
      table.bigInteger('user_id').unsigned().notNullable();
      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE'); 
      table.timestamps(true, true); 
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('listings');
  };
  