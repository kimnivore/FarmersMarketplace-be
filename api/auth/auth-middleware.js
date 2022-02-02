const User = require('../users/users-model')



const checkUsernameTaken = async (req, res, next) => {
    try{
      const user = await User.findBy({username: req.body.username})
      if(!user.length){
        next({
            status: 401,
            message: 'username taken'
          })
      }else{
        req.user = user
        next()
      }
    }catch(err){
      next(err)
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