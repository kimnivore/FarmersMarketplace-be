const router = require("express").Router();
const Item = require("../items/items-model");

router.get("/", (req, res, next) => {
    Item.getAllItems()
    .then((items) => {
      res.json(items);
    })
    .catch(next);
});


module.exports = router;
