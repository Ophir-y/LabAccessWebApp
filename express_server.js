const express = require("express");
// package for creating uniqu IDs
const { v4: uuid } = require("uuid");
const app = express();
const port = 8080;
const path = require("path");
// set public directory
app.use(express.static(path.join(__dirname, "/public")));

// set types of usasble requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// fake person list
var people = [
  {
    person_id: 308397546,
    first_name: "Ophir",
    last_name: "Yoram",
    admin_system_access: true,
    admin_password: "admin123",
  },
  {
    person_id: 123456788,
    first_name: "ben",
    last_name: "rote",
    admin_system_access: false,
    admin_password: "",
  },
  {
    person_id: 456789134,
    first_name: "noam",
    last_name: "Yoram",
    admin_system_access: false,
    admin_password: "",
  },
];

const doors = [
  {
    door_id: 1,
    door_name: "lab1 door",
    building_name: "ulman",
    floor_number: 1,
  },
  {
    door_id: 2,
    door_name: "lab2 door",
    building_name: "ulman",
    floor_number: 2,
  },
];

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
  res.render("people", { doors, people });
});

app.post("/people", (req, res) => {
  console.log(req.body);
  res.redirect("/people", { doors, people });
});

// routs for 'groups' page.
// includes get and post for page and form logic
app.get("/groups", (req, res) => {
  res.render("groups", { doors, people });
});

// routs for 'groups' page.
// includes get and post for page and form logic
app.get("/groupsPermissions", (req, res) => {
  res.render("groupsPermissions", { doors, people });
});

// routs for 'doors' page.
// includes get and post for page and form logic
app.get("/doors", (req, res) => {
  res.render("doors", { doors, people });
});

// routs for 'permissions' page.
// includes get and post for page and form logic
app.get("/permissions", (req, res) => {
  res.render("permissions", { doors, people });
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
