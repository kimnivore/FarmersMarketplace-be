exports.up = async (knex) => {
  await knex.schema
    .createTable("users", (users) => {
      users.increments("user_id");
      users.string("username", 32).unique().notNullable();
      users.string("password", 100).notNullable();
    })
    .createTable("items", (items) => {
      items.increments("item_id");
      items.string("item_name", 128).notNullable();
      items.string("item_description", 128).notNullable();
      items.float("item_price").notNullable();
      items.string("item_category", 128).notNullable();
    });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("items");
  await knex.schema.dropTableIfExists("users");
};
