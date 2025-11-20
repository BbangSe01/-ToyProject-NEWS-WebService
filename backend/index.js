const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();

dbConnect();

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
