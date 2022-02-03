const db = require("../data/db-config");

function getAllItems() {
  return db("items");
}

async function addItem(item) {
    const [newItem] = await db("items").insert(item, [
      "item_name",
      "item_description",
      "item_price",
      "item_category",
      "user_id"
    ]);
    return newItem;
  }

module.exports = {
  getAllItems,
  addItem
};
