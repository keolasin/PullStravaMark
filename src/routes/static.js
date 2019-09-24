const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.render("static/index", {
      title: "Welcome to the dataPuller",
      user: req.user
    });
  }
);

module.exports = router;
