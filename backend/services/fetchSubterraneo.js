const router = require("express").Router();

// simple movie average
router.get("/subterraneo", async (req, res) => {
  res.send("fetch subterraneo - services running");
});

module.exports = router;