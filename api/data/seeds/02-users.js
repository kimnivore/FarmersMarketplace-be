const bcrypt = require("bcryptjs")

const users = [
  { username: "sam", password: bcrypt.hashSync("1234", 8) },
  { username: "frodo", password: bcrypt.hashSync("5678", 8) },
]

exports.seed = function (knex) {
  return knex("users").insert(users)
}
