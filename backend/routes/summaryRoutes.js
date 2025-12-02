const express = require("express");
const router = express.Router();

// jwt 인증 미들웨어
const authenticateToken = require("../middlewares/authMiddleware");

const summaryNews = require("../controllers/summaryController");

router.route("/summary").post(authenticateToken, summaryNews);
module.exports = router;
