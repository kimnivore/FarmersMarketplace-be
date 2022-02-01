const User = require('../users/users-model')

// NOT USING ANY CURRENTLY, FUNCTIONS NEED TO BE FIXED

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


async function checkUsernameExists(req, res, next) {
  
    try{
      const users = await User.findBy({ username: req.body.username })
      if (!users.length) {
        next()
      }
      else next({ message: "Invalid credentials", status: 422 })
    } catch (error){
      next(error)
    }
  }
  


module.exports = { checkUsernameTaken, checkUsernameExists
};