const router = require("express").Router();
const tokenBuilder = require("./token-builder");
const bcrypt = require("bcryptjs");
const User = require("../users/users-model");
const { BCRYPT_ROUNDS } = require("../secrets/index");
const {checkUsernameTaken,checkUsernameExists} = require('../auth/auth-middleware')


router.post("/register", checkUsernameTaken, (req, res, next) => {
  const { username, password } = req.body;
  const hash = bcrypt.hashSync(password, BCRYPT_ROUNDS);
  User.add({ username, password: hash })
    .then((newUser) => {
      res.status(201).json({
        message: `Successfully registered ${newUser.username}!`,
        user_id: newUser.user_id
      });
    })
    .catch(next);
});

router.post("/login", checkUsernameExists, async (req, res, next) => {
  const user = req.user;
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = tokenBuilder(user);
    res.status(200).json({ message: `Welcome, ${user.username}`, token });
  } else {
    next({ status: 401, message: "Invalid credentials" });
  }
});

router.get("/users", async (req, res) => {
  res.json(await User.getAll());
});


module.exports = router;
