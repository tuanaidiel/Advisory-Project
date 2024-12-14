/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('users', (table) => {
      table.bigIncrements('id').unsigned().primary();
      table.string('name', 255).notNullable();
      table.string('email', 255).unique().notNullable();
      table.char('role_type', 1).notNullable(); 
      table.timestamp('email_verified_at').nullable();
      table.string('password', 255).notNullable();
      table.string('remember_token', 100).nullable();
      table.timestamps(true, true); 
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users');
  };
  
