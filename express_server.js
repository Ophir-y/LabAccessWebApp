/** @format */

const express = require("express");
const app = express();

var methodOverride = require("method-override");

// set port number
const port = 8080;
// ##################################################################
// connect to database
// ##################################################################
const mysql = require("mysql2");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "LaB20@AcC22%sYs12",
  database: "labaccessdb",
});

// package for creating uniqu IDs
const { v4: idGet } = require("uuid");
const { formToJSON } = require("axios");

const path = require("path");
// set public directory
app.use(express.static(path.join(__dirname, "/public")));
// set method override
app.use(methodOverride("_method"));
// set views as the views directory.
app.set("views", path.join(__dirname, "/views"));
// set view engine to ejs.
app.set("view engine", "ejs");

// set types of usasble requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// ##################################################################
// fake person list
// ##################################################################
let peoples = [
  {
    person_id: "308397546",
    first_name: "Ophir",
    last_name: "Yoram",
    admin_system_access: 1,
    admin_password: "admin123",
  },
  {
    person_id: "123456788",
    first_name: "ben",
    last_name: "rote",
    admin_system_access: 0,
    admin_password: "",
  },
  {
    person_id: "456789134",
    first_name: "noam",
    last_name: "Yoram",
    admin_system_access: 1,
    admin_password: "",
  },
  {
    person_id: "308597546",
    first_name: "Ophir",
    last_name: "Yoram",
    admin_system_access: 1,
    admin_password: "admin123",
  },
  {
    person_id: "125456788",
    first_name: "ben",
    last_name: "rote",
    admin_system_access: 0,
    admin_password: "",
  },
  {
    person_id: "455789134",
    first_name: "noam",
    last_name: "Yoram",
    admin_system_access: 0,
    admin_password: "",
  },
  {
    person_id: "306397546",
    first_name: "Ophir",
    last_name: "Yoram",
    admin_system_access: 1,
    admin_password: "admin123",
  },
  {
    person_id: "126456788",
    first_name: "ben",
    last_name: "rote",
    admin_system_access: 0,
    admin_password: "",
  },
  {
    person_id: "457789134",
    first_name: "noam",
    last_name: "Yoram",
    admin_system_access: 0,
    admin_password: "",
  },
];

let doorss = [
  {
    door_id: idGet(),
    door_name: "lab1 door",
    building_name: "ulman",
    floor_number: 1,
  },
  {
    door_id: idGet(),
    door_name: "lab2 door",
    building_name: "ulman",
    floor_number: 2,
  },
];

let permissionss = [
  {
    permissions_id: idGet(),
    permission_type: "Door Access",
    initial_date: "12/12/2022",
    expiry_date: "12/12/2022",
    start_time: "12:00",
    end_time: "11:00",
  },
  {
    permissions_id: idGet(),
    permission_type: "Door Access",
    initial_date: "12/12/2022",
    expiry_date: "12/12/2022",
    start_time: "12:00",
    end_time: "11:00",
  },
  {
    permissions_id: idGet(),
    permission_type: "Door Access",
    initial_date: "12/12/2022",
    expiry_date: "12/12/2022",
    start_time: "12:00",
    end_time: "11:00",
  },
];
// ##################################################################
// routs:
// routs to different pages on website:
// ##################################################################
app.get("/", (req, res) => {
  res.render("home");
});

// ##################################################################
// routs for 'people' page.
// includes get and post for page and form logic
// ##################################################################
app.get("/people", (req, res) => {
  res.render("people", { doorss, peoples });
});

app.post("/people", (req, res) => {
  console.log(req.body);
  let {
    person_id,
    first_name,
    last_name,
    admin_system_access,
    admin_password,
    admin_password_confirm,
  } = req.body;
  if (admin_system_access == "on") {
    admin_system_access = "true";
  } else {
    admin_system_access = "false";
  }
  let = peoples.push({
    person_id,
    first_name,
    last_name,
    admin_system_access,
    admin_password,
  });
  res.render("people", { doorss, peoples });
});

app.delete("/people/:person_id", (req, res) => {
  const { person_id } = req.params;
  peoples = peoples.filter((p) => p.person_id !== person_id);
});

// ##################################################################
// routs for 'groups' page.
// includes get and post for page and form logic
// ##################################################################
app.get("/groups", (req, res) => {
  res.render("groups", { doorss, peoples });
});

// ##################################################################
// routs for 'groups permissions' page.
// includes get and post for page and form logic
// ##################################################################
app.get("/groupsPermissions", (req, res) => {
  res.render("groupsPermissions", { doorss, peoples });
});

// ##################################################################
// routs for 'doors' page.
// includes get and post for page and form logic
// ##################################################################
app.get("/doors", (req, res) => {
  res.render("doors", { doorss, peoples });
});

// ##################################################################
// doors post request
// ##################################################################
app.post("/doors", (req, res) => {
  console.log(req.body);
  const { door_name, building_name, floor_number } = req.body;
  doorss.push({ door_id: idGet(), door_name, building_name, floor_number });
  res.render("doors", { doorss, peoples });
});

app.delete("/doors/:door_id", (req, res) => {
  const { door_id } = req.params;
  doorss = doorss.filter((d) => d.door_id !== door_id);
});
// ##################################################################
// routs for 'permissions' page.
// includes get and post for page and form logic
// ##################################################################
app.get("/permissions", (req, res) => {
  res.render("permissions", { doorss, peoples, permissionss });
});

// ##################################################################
// permissions post
// ##################################################################
app.post("/permissions", (req, res) => {
  console.log(req.body);
  const { permission_type, initial_date, expiry_date, start_time, end_time } =
    req.body;
  permissionss.push({
    permissions_id: idGet(),
    permission_type,
    initial_date,
    expiry_date,
    start_time,
    end_time,
  });
  res.render("permissions", { doorss, peoples, permissionss });
});

// ##################################################################
//pokemon!
// ##################################################################
app.get("/poke", (req, res) => {
  res.render("poke");
});

// ##################################################################
// reply to any other path
// ##################################################################
app.get("*", (req, res) => {
  res.send("not a valid path");
});

// ##################################################################
// listen logic
// ##################################################################
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
