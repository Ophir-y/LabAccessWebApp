/** @format */

const express = require("express");
const app = express();

var methodOverride = require("method-override");

// set port number
const port = 8080;
// ##################################################################
// connect to database
// ##################################################################
const mysql = require("mysql");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "LaB20@AcC22%sYs12",
  database: "labaccessdb",
});

// package for creating uniqu IDs
const { v4: idGet } = require("uuid");

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
// get person list
// ##################################################################

let peoples;

const getPeople = async () => {
  const personget = "SELECT * FROM people";
  pool.query(personget, (err, results) => {
    if (err) throw err;
    peoples = results;
  });
};
getPeople().catch((error) => {
  console.log("Cant get people from server!");
});

// ##################################################################
// get doors list
// ##################################################################
let doorss;
const getDoors = async () => {
  const doorget = "SELECT * FROM doors";
  pool.query(doorget, (err, results) => {
    if (err) throw err;
    doorss = results;
  });
};
getDoors().catch((error) => {
  console.log("Cant get Doors from server!");
});

// ##################################################################
// get permission list
// ##################################################################
let permissionss;
const getPermissions = async () => {
  const permissionget = "SELECT * FROM permissions";
  pool.query(permissionget, (err, results) => {
    if (err) throw err;
    const permissionss = results;
  });
};

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
  getPeople()
    .then(res.render("people", { peoples: peoples }))
    .catch((error) => {
      console.log(error);
      console.log("Cant get people from server!");
    });
});

app.post("/people", (req, res) => {
  if (!req.body) {
    res.send("ERROR: no body was sent!");
  }
  // save req information from client
  let {
    person_id,
    first_name,
    last_name,
    admin_system_access, // admin field 1 if admin, 0 if not.
    admin_password,
    admin_password_confirm,
  } = req.body;

  // check if the client sent a request to add an Admin or not
  if (admin_system_access == "on") {
    console.log("here");
    admin_system_access = 1;
  } else {
    admin_system_access = 0;
  }
  //create add person sql queiry command
  const addPerson = `INSERT INTO people() VALUES(${person_id},"${first_name}","${last_name}",${admin_system_access},"${admin_password}")`;
  // create try/catch for query
  try {
    // return
    pool.query(addPerson, (err, results) => {
      if (err) {
        res.send("already a person with that ID ");
        // alert("already a person with that ID ");
      } else {
        console.log(
          `added ${person_id},${first_name},${last_name},${admin_system_access},'${admin_password}'`
        );
      }
    });
  } catch (err) {
    console.log("error!!!!");
  }
  getPeople()
    .then(res.redirect("/people"))
    .catch(console.log("Cant get people from server!"));
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
  getDoors()
    .then(res.render("doors", { doorss: doorss }))
    .catch((error) => {
      console.log(error);
      console.log("Cant get Doors from server!");
    });
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
  getPermissions()
    .then(getDoors())
    .then(getPeople())
    .then(res.render("permissions", { doorss, peoples, permissions }))
    .catch(console.log("Cant get permissions from server!"));
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
// esp GET request first try
// ##################################################################
app.get("/Client", (req, res) => {
  // Retrieve the custom ID header
  const id = req.get("X-Custom-ID");
  // Print the ID to the console
  console.log(`Request received from ID ${id}`);

  // Retrieve only the id, firstname, and lastname fields
  const query = "SELECT person_id, first_name, last_name FROM people";

  // Execute the query using the connection pool
  pool.query(query, (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
      return;
    }
    // Send the results to the ESP32 board as a JSON array
    res.json(results);
  });
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
