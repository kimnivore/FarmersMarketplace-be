const User = require('../users/users-model');



const checkUserID = async (req, res, next) => {
  const userID = req.headers.user_id;
  if (!userID) {
    return next({ status: 401, message: "User ID required." });
  }
  else {
    req.userID = userID;
    const user = await User.findById(req.userID);
    if (!user) {
        next({ status: 401, message: `User with ID ${req.userID} does not exist.` });
    } else {
      next();
    }
  }
};

module.exports = { 
  checkUserID
};