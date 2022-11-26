const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.set("views", path.join(__dirname, "/views"));

// Get logic
app.get("/", (req, res) => {
  res.render("home");
});
app.get("/people", (req, res) => {
  res.render("people");
});
app.get("/groups", (req, res) => {
  res.render("groups");
});
app.get("/doors", (req, res) => {
  res.render("doors");
});
app.get("/permissions", (req, res) => {
  res.render("permissions");
});

// reply to any other path
app.get("*", (req, res) => {
  res.send("not a valid path");
});

// listen logic
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
