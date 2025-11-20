const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/dbConnect");

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
dbConnect();

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", require("./routes/loginRoutes"));

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
