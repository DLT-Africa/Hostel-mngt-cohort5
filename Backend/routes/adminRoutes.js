const express = require("express");
const { register } = require("../controller/AdminController");
const router = express.Router();

router.post("/register", register);

module.exports = router;
