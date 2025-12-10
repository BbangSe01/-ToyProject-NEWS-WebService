const dayjs = require("dayjs");
const Performance = require("../models/performance");
const User = require("../models/user");

// post Favorites
// POST /favorites
const postFavorites = async (req, res) => {
  try {
    const userId = req.user.userId; // 로그인 미들웨어로부터 전달
    const formattedDate = dayjs(req.body.publishedAt).format("YYYY-MM-DD");
    const performanceData = { ...req.body, publishedAt: formattedDate };
    console.log(performanceData);
    console.log(formattedDate);
    const url = performanceData.url;

    if (!url) {
      return res.status(400).json({ message: "URL is required" });
    }

    await Performance.findOneAndUpdate({ url }, performanceData, {
      upsert: true,
      new: true,
    });

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.favorites.includes(url)) {
      user.favorites.push(url);
      await user.save();
    }

    res
      .status(200)
      .json({ message: "update favorites success!", success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      code: "SERVER_ERROR",
      message: "서버 에러",
    });
  }
};

// delete Favorites
// DELETE /favorites
const deleteFavorites = async (req, res) => {
  try {
    const userId = req.user.userId; // 로그인 미들웨어로부터 전달
    const url = req.body.url;

    if (!url) {
      return res.status(400).json({ message: "URL is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.favorites.includes(url)) {
      user.favorites = user.favorites.filter((item) => item !== url);
      await user.save();
    }

    res
      .status(200)
      .json({ message: "delete favorites success!", success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      code: "SERVER_ERROR",
      message: "서버 에러",
    });
  }
};

// get Favorites list
// GET /favorites
const getFavorites = async (req, res) => {
  try {
    const userId = req.user.userId; // 로그인 미들웨어로부터 전달

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const data = [];
    for (const url of user.favorites) {
      const perf = await Performance.findOne({ url });
      data.push(perf);
    }

    return res.status(200).json({ favorites: data, success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      code: "SERVER_ERROR",
      message: "서버 에러",
    });
  }
};

module.exports = { postFavorites, deleteFavorites, getFavorites };
