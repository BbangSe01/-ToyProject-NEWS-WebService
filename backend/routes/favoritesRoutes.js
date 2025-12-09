const express = require("express");
const router = express.Router();

// jwt 인증 미들웨어
const authenticateToken = require("../middlewares/authMiddleware");

const {
  postFavorites,
  deleteFavorites,
  getFavorites,
} = require("../controllers/favoritesController");

router.route("/favorites").post(authenticateToken, postFavorites);
router.route("/favorites").get(authenticateToken, getFavorites);
router.route("/favorites").delete(authenticateToken, deleteFavorites);
module.exports = router;
