const items = [
  {
    item_name: "Rice",
    item_description: "Locally grown long grain rice.",
    item_price: 7.99,
    item_category: "Grains",
    user_id: 1,
  },
  {
    item_name: "Bananas",
    item_description: "Locally grown bananas.",
    item_price: 12.99,
    item_category: "Fruits",
    user_id: 2,
  },
  {
    item_name: "Beans",
    item_description: "Locally grown beans.",
    item_price: 5.99,
    item_category: "Grains",
    user_id: 1,
  },
];

exports.seed = function (knex) {
  return knex("items").insert(items);
};
