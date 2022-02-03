const router = require("express").Router();
const Item = require("../items/items-model");
const {checkUserID} = require("./items-middleware");

router.get("/", (req, res, next) => {
    Item.getAllItems()
    .then((items) => {
      res.json(items);
    })
    .catch(next);
});

router.post("/", checkUserID, async (req, res, next) => {
    try {
      const newItem = await Item.addItem({
          ...req.body,
          user_id: req.userID});
      res.status(201).json(newItem);
    } catch (err) {
      next(err);
    }
  });



module.exports = router;
