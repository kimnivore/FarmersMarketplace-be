const router = require("express").Router();
const Item = require("../items/items-model");
const { checkUserID, checkUserIDParams, checkItemID} = require("./items-middleware");

router.get("/", (req, res, next) => {
  Item.getAllItems()
    .then((items) => {
      res.json(items);
    })
    .catch(next);
});

router.get("/:item_id", checkItemID, async (req, res, next) => {
    try {
      const item = await Item.getById(req.itemID);
      if (item) {
        res.status(200).json(item);
      } else {
        res.status(401).json({
          message: `Item with ID ${req.itemID} does not exist.`,
        });
      }
    } catch (err) {
      next(err);
    }
  });

router.get("/user/:user_id", checkUserIDParams, async (req, res, next) => {
  try {
    const userItems = await Item.getUserItems(req.params.user_id);
    if (userItems.length !== 0) {
      res.status(200).json(userItems);
    } else {
      res.status(401).json({
        message: `No items added by user with ID ${req.params.user_id}`,
      });
    }
  } catch (err) {
    next(err);
  }
});

router.post("/", checkUserID, async (req, res, next) => {
  try {
    const newItem = await Item.addItem({
      ...req.body,
      user_id: req.userID,
    });
    res.status(201).json(newItem);
  } catch (err) {
    next(err);
  }
});

router.delete('/:item_id', checkItemID, async (req, res, next) => {
      try {
        const itemToDelete = await Item.remove(req.params.item_id);
        res.status(200).json({message: `Deleted ${itemToDelete} item.`});
      } catch (err) {
        next(err);
      }
    }
  );
  

module.exports = router;
