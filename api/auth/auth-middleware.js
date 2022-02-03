const User = require('../users/users-model')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../secrets/index')



const restricted = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return next({ status: 401, message: "Token required" });
  }
  jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return next({ status: 401, message: "token invalid" });
    }
    req.decodedToken = decodedToken;
    return next();
  });
};

async function checkUsernameTaken(req, res, next) {
  try {
    const [user] = await User.findBy({username: req.body.username});
    if (user) {
      next({
        status: 401,
        message: 'Username taken, please choose another one.',
      });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
 }

const checkUsernameExists = async (req, res, next) => {
    try{
      const user = await User.findBy({ username: req.body.username }).first();
      if(!user){
        next({
          status: 401,
          message: 'Invalid credentials'
        })
      }else{
        req.user = user
        next()
      }
    }catch(err){
      next(err)
    }
}

module.exports = { 
  checkUsernameTaken, 
  checkUsernameExists,
  restricted
};