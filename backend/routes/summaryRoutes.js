const express = require("express");
const router = express.Router();

const summaryNews = require("../controllers/summaryController");
// const { registerUser, loginUser } = require("../controllers/loginController");

router.route("/summary").post(summaryNews);
// router.route("/register").post(registerUser);
// router.route("/login").post(loginUser);
module.exports = router;
