const items = [
  {
    item_name: "Rice",
    item_description: "Locally grown long grain rice.",
    item_price: 7.99,
    item_category: "Grains",
  },
  {
    item_name: "Bananas",
    item_description: "Locally grown bananas.",
    item_price: 12.99,
    item_category: "Fruits",
  },
  {
    item_name: "Beans",
    item_description: "Locally grown beans.",
    item_price: 5.99,
    item_category: "Grains",
  },
];

exports.seed = function (knex) {
  return knex("items").insert(items);
};
