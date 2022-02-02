const User = require('../users/users-model')


async function checkUsernameTaken(req, res, next) {
  const [user] = await User.findBy({ username: req.body.username });
  if (user) {
   next({
    status: 422,
    message: "Username taken",
   });
  } else {
   next();
  }
 }


const checkUsernameExists = async (req, res, next) => {
  
    try{
      const users = await User.findBy({ username: req.body.username })
      if(!users){
        next({
          status: 422,
          message: 'Invalid credentials'
        })
      }else{
        req.user = users
        next()
      }
    }catch(err){
      next(err)
    }
}

  


module.exports = { checkUsernameTaken, checkUsernameExists
};