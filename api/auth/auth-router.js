const router = require("express").Router();
const tokenBuilder = require('./token-builder');
const bcrypt = require("bcryptjs");
const User = require("../users/users-model");
const {
 checkUsernameExists,
 validateRoleName,
 checkUsernameTaken,
} = require("../auth/auth-middleware");


router.post(
    "/register",
    checkUsernameTaken,
    validateRoleName,
    (req, res, next) => {
     const { username, password } = req.body;
     const hash = bcrypt.hashSync(password, 8);
     User.add({ username, password: hash })
      .then((newUser) => {
       res.status(201).json(newUser);
      })
      .catch(next);
   
    
    },
    );
    
    router.post(
     "/login",
     checkUsernameExists,
     (req, res) => {
      if (bcrypt.compareSync(req.body.password, req.user.password)) {
        const token = tokenBuilder(req.user)
        const { user_id } = req.user;
        res.status(200).json({ message: `Welcome ${req.user.username}!`, user_id, token })
    } else {
        res.status(401).json({ message: "Invalid credentials" })
    }
})
   
    module.exports = router;
   
