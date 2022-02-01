const db = require("../data/db-config");

function getAll() {
  return db("users").select("user_id", "username");
}

async function add(user) {
  const [newUser] = await db("users").insert(user, [
    "user_id",
    "username",
    "password",
  ]);
  return newUser;
}

function findBy(filter) {
  return db("users").where(filter);
}

module.exports = {
  add,
  findBy,
  getAll,
};
