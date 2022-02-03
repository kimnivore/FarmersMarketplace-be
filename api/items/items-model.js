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

function getUserItems(user_id) {
    return db("items").where("user_id", user_id);
  }

function remove(item_id) {
    return db('items').where({ item_id }).del();
}

function getById(id) {
    return db("items").where("item_id", id).first();
  }

  




module.exports = {
  getAllItems,
  addItem, 
  getUserItems,
  remove,
  getById
};
