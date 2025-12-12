require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/dbConnect");
const cookieParser = require("cookie-parser");

const app = express();

const corsOptions = {
  // 크로스 오리진 응답을 브라우저가 받아들이고 Set-Cookie 명령을 실행하게 하기 위함. 즉, 브라우저가 응답을 처리하게 해준다.
  origin: ["http://localhost:5173"],
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));
dbConnect();

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/user", require("./routes/loginRoutes"));
app.use("/user", require("./routes/summaryRoutes"));
app.use("/user", require("./routes/favoritesRoutes"));
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
