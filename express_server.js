const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/search", (req, res) => {
  const { q } = req.query;
  if (!q) {
    res.send(`Nothing searched`);
  } else {
    res.send(`this is your query: ${q}!!!`);
  }
});

app.get("/r/:sub", (req, res) => {
  const { sub } = req.params;
  res.send(`this is sub: ${sub}!!!`);
});
app.get("/r/:sub/:next", (req, res) => {
  const { sub } = req.params;
  res.send(`this is sub: ${sub}!!!`);
});

app.get("/cats", (req, res) => {
  res.send("meow");
});
app.get("/dogs", (req, res) => {
  res.send("woof");
});

// reply to any other path
app.get("*", (req, res) => {
  res.send("not a valid path");
});

app.post("/cats", (req, res) => {
  res.send("we got post!");
});
// app.use((req, res) => {
//   console.log("got a request!");
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
