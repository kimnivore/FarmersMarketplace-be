const User = require('../users/users-model');
const Item = require('./items-model');

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

const checkItemID = async (req, res, next) => {
    const itemID = req.params.item_id;
    if (!itemID) {
      return next({ status: 401, message: "Item ID required." });
    }
    else {
      req.itemID = itemID;
      const item = await Item.getById(req.itemID);
      if (!item) {
          next({ status: 401, message: `Item with ID ${req.itemID} does not exist.` });
      } else {
        next();
      }
    }
  };
  

const checkUserIDParams = async (req, res, next) => {
    const userID = req.params.user_id;
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
  checkUserID,
  checkUserIDParams,
  checkItemID
};