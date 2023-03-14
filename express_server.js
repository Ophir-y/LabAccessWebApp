/** @format */

const express = require("express");
const app = express();

var methodOverride = require("method-override");

// set port number
const port = 1231;
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

app.use(function (req, res, next) {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  next();
});
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
  try {
    pool.query("SELECT * FROM people", (err, results1) => {
      if (err) throw err;
      pool.query(
        "SELECT DISTINCT person_group_name FROM people_groups",
        (err, results2) => {
          if (err) throw err;
          res.render("people", { peoples: results1, people_groups: results2 });
        }
      );
    });
  } catch (error) {
    console.log("error!!!!");
  }
});

app.post("/people", (req, res) => {
  if (!req.body) {
    res.send("ERROR: no body was sent!");
  }
  // check if the client sent a request to add an Admin or not
  if (req.body.admin_system_access == "on") {
    req.body.admin_system_access = 1;
  } else {
    req.body.admin_system_access = 0;
  }
  // create try/catch for query
  try {
    // return
    pool.query(
      `INSERT INTO people() VALUES(
      '${req.body.person_id}',
      '${req.body.first_name}',
      '${req.body.last_name}',
      '${req.body.admin_system_access}',
      '${req.body.admin_password}')`,
      (err) => {
        if (err) {
          res.send("already a person with that ID ");
          return;
          // res.alert('already a person with that ID ');
        } else {
          console.log(
            `added ${req.body.person_id},'${req.body.first_name}','${req.body.last_name}',${req.body.admin_system_access},'${req.body.admin_password}'`
          );
          res.redirect("/people");
        }
      }
    );
  } catch (err) {
    console.log("error!!!!");
  }
});

app.post("/people/delete", (req, res) => {
  try {
    const person_ids = req.body;
    if (person_ids.data == "") {
      res.send("No one selected");
    }
    pool.query(
      `DELETE FROM people WHERE person_id IN (${person_ids})`,
      (error) => {
        if (error) {
          throw error;
        }
        res.redirect("/people");
      }
    );
  } catch (error) {}
});

// ##################################################################
// routs for 'doors' page.
// includes get and post for page and form logic
// ##################################################################
app.get("/doors", (req, res) => {
  try {
    pool.query("SELECT * FROM doors", (err, results) => {
      if (err) throw err;
      res.render("doors", { doorss: results });
    });
  } catch (error) {
    console.log("error!!!!");
  }
});
// ##################################################################
// doors post request
// ##################################################################
app.post("/doors", (req, res) => {
  if (!req.body) {
    res.send("ERROR: no body was sent!");
  }
  //create add door sql queiry command
  const addDoor = `INSERT INTO doors() VALUES('${req.body.door_id}','${req.body.door_name}','${req.body.building_name}','${req.body.floor_number}')`;
  // create try/catch for query
  try {
    // return
    pool.query(addDoor, (err) => {
      if (err) {
        res.send("already a door with that ID ");
        return;
      } else {
        try {
          res.redirect("doors");
          // res.redirect(307, 'doors');
          // pool.query('SELECT * FROM doors', (err, results) => {
          //   if (err) throw err;
          //   res.render('people', { peoples: results });
        } catch (error) {
          console.log("error!!!!");
        }
      }
    });
  } catch (err) {
    console.log("error!!!!");
    console.log(err);
    return;
  }

  // console.log(req.body);
  // const { door_name, building_name, floor_number } = req.body;
  // doorss.push({ door_id: idGet(), door_name, building_name, floor_number });
  // res.render('doors', { doorss, peoples });
});

app.post("/doors/delete", (req, res) => {
  const doors_ids = req.body;
  if (doors_ids.data == "") {
    res.send("No one selected");
    return;
  }
  try {
    pool.query(`DELETE FROM doors WHERE door_id IN (${doors_ids})`, (error) => {
      if (error) {
        console.log(error);
        res.send("Unable to delete doors");
        return;
      }
      // console.log(`deleted the following doors: '${doors_ids}'`);
      try {
        pool.query("SELECT * FROM doors", (err) => {
          if (err) {
            res.send("Unable to delete doors");
            return;
          }
          res.redirect("/doors");
        });
      } catch (error) {
        console.log("error!!!!");
        return;
      }
    });
  } catch (error) {
    console.log(error);
  }
});

// ##################################################################
// routs for 'permissions' page.
// includes get and post for page and form logic
// ##################################################################
app.get("/permissions", (req, res) => {
  try {
    pool.query("SELECT * FROM Permissions_table", (err, results) => {
      if (err) throw err;
      res.render("permissions", { permissions: results });
    });
  } catch (error) {
    console.log("error!!!!");
  }
});
// ##################################################################
// permissions post
// ##################################################################
app.post("/permissions", (req, res) => {
  if (!req.body) {
    res.send("ERROR: no body was sent!");
    return;
  }
  // create try/catch for query
  try {
    // return
    pool.query(
      `INSERT INTO permissions_table() VALUES(
      '${req.body.permission_id}',
      '${req.body.permission_type}',
      '${req.body.initial_date}',
      '${req.body.expiry_date}',
      '${req.body.start_time}',
      '${req.body.end_time}')`,
      (err) => {
        if (err) {
          res.send(err);
          return;
        } else {
          // console.log(`added '${req.body}'}'`);
          res.redirect("permissions");
        }
      }
    );
  } catch (err) {
    console.log("error!!!!");
    console.log(err);
    return;
  }
});

app.post("/permissions/delete", (req, res) => {
  const permission_ids = req.body;
  if (permission_ids.data == "") {
    res.send("No one selected");
  }
  try {
    pool.query(
      `DELETE FROM permissions_table WHERE permission_id IN (${permission_ids})`,
      (error) => {
        if (error) {
          res.send(err);
          return;
        } else {
          // console.log(`deleted the following permission: '${permission_ids}'`);
          try {
            pool.query("SELECT * FROM doors", (err) => {
              if (err) {
                res.send("Unable to delete doors");
                return;
              }
              res.redirect(303, "/permissions");
            });
          } catch (error) {
            console.log("error!!!!");
            return;
          }
        }
      }
    );
  } catch (error) {
    console.log(error);
    return;
  }
});
// ##################################################################
// routs for 'people_groups' page.
// includes get and post for page and form logic
// ##################################################################
app.get("/people_groups", (req, res) => {
  try {
    pool.query(
      "SELECT people_groups.person_group_name, people_groups.person_id, people.first_name, people.last_name FROM people_groups JOIN People  ON People.person_id = People_Groups.person_id;",
      (err, results1) => {
        if (err) throw err;
        res.render("people_groups", {
          people_groups: results1,
        });
      }
    );
  } catch (error) {
    console.log("error!!!!");
  }
});

app.post("/people_groups", (req, res) => {
  if (!req.body) {
    res.send("ERROR: no body was sent!");
  }
  // console.log(req.body);
  try {
    // return
    let query =
      "INSERT INTO people_groups( person_id, person_group_name) VALUES ?";
    pool.query(
      query,
      [
        req.body.map((people_groups) => [
          people_groups.person_id,
          people_groups.group_name,
        ]),
      ],
      (err) => {
        if (err) {
          console.log(err);
          res.send("already row with that group and person combo  ");
          return;
          // res.alert('already a person with that ID ');
        } else {
          // console.log(
          //   `added ${req.body}'`
          // );
          res.redirect("/people");
        }
      }
    );
  } catch (err) {
    console.log(err);
    console.log("error!!!!");
  }

  // res.render("people_groups", { doorss, peoples });
});

app.post("/people_groups/delete", (req, res) => {
  const peopleToDelete = req.body;
  if (!Array.isArray(peopleToDelete) || peopleToDelete.length === 0) {
    res.status(400).send("Invalid input");
    return;
  }

  const values = peopleToDelete.map((row) => [
    row.person_id,
    row.person_group_name,
  ]);
  const sql = `DELETE FROM people_groups WHERE (person_id,person_group_name) IN (?)`;
  //the values has to be in [] so that it can be identified as an array of double values and not as one long array.
  pool.query(sql, [values], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("An error occurred while deleting the records");
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).send("Records not found");
      return;
    }
    res.status(200).redirect("/people_groups");
  });
});

// ##################################################################
// routs for 'door_groups' page.
// includes get and post for page and form logic
// ##################################################################
app.get("/door_groups", (req, res) => {
  res.render("door_groups", { doorss, peoples });
});

// ##################################################################
// routs for 'permission_groups' page.
// includes get and post for page and form logic
// ##################################################################
app.get("/permission_groups", (req, res) => {
  res.render("permission_groups", { doorss, peoples });
});
// ##################################################################
// routs for 'groups permissions' page.
// includes get and post for page and form logic
// ##################################################################
app.get("/groupsPermissions", (req, res) => {
  res.render("groupsPermissions", { doorss, peoples });
});

// ##################################################################
// esp GET request first try
// ##################################################################
app.get("/GETLIST", (req, res) => {
  // Retrieve the custom ID header
  const id = req.get("X-Custom-ID");
  // Print the ID to the console
  console.log(`Request received from ID ${id}`);

  // Retrieve only the id, firstname, and lastname fields
  const query = "SELECT person_id FROM people";

  // Execute the query using the connection pool
  pool.query(query, (error, results) => {
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
// esp GET request first try
// ##################################################################
app.post("/ESP32POSTLOG", (req, res) => {
  // Retrieve the custom ID header
  const id = req.get("X-Custom-ID");
  // Print the ID to the console
  console.log(`Request received from ID ${id}`);
});
// ##################################################################
// respond with server time
// ##################################################################
app.get("/time", (req, res) => {
  const timestamp = Math.floor(Date.now() / 1000);
  res.json({ timestamp });
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
