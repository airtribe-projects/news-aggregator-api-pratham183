require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const userRoute = require("./src/routes/users.routes");
const newsRoute = require("./src/routes/news.routes");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users/", userRoute);
app.use("/news", newsRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = app;
