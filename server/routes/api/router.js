const express = require("express");
const router = express.Router();
const auth = require("../../config/auth");

router.get("/", auth, (req, res) => {
  res.send("dzadzad");
});
module.exports = router;
