const User = require('../users/users-model')


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

module.exports = { checkUsernameTaken, checkUsernameExists
};