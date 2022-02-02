const db = require("../data/db-config");

function getAllItems() {
  return db("items");
}


module.exports = {
  getAllItems
};
