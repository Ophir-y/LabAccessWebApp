const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
// set public directory
app.use(express.static(path.join(__dirname, "/public")));

// set types of usasble requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set views as the views directory.
app.set("views", path.join(__dirname, "/views"));
// set view engine to ejs.
app.set("view engine", "ejs");

// routs:

// routs to different pages on website:
app.get("/", (req, res) => {
  res.render("home");
});

// routs for 'people' page.
// includes get and post for page and form logic
app.get("/people", (req, res) => {
  res.render("people");
});

app.post("/people", (req, res) => {
  console.log(req.body);
  res.redirect("/people");
});

// routs for 'groups' page.
// includes get and post for page and form logic
app.get("/groups", (req, res) => {
  res.render("groups");
});

// routs for 'doors' page.
// includes get and post for page and form logic
app.get("/doors", (req, res) => {
  res.render("doors");
});

// routs for 'permissions' page.
// includes get and post for page and form logic
app.get("/permissions", (req, res) => {
  res.render("permissions");
});

//pokemon!
app.get("/poke", (req, res) => {
  res.render("poke");
});

// reply to any other path
app.get("*", (req, res) => {
  res.send("not a valid path");
});

// listen logic
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
