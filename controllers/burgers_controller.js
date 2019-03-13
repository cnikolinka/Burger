var express = require("express");
var burger = require("../models/burger");

var router = express.Router();

const orm = {
  selectAll: function (cb) {
      connection.query("SELECT * FROM restaurant_burger", function (err, data) {
          if (err) cb(err, null);
          cb(null, data);
      });
  },
  selectAllBy: function(condition, value, cb) {
      const sqlQuery = `SELECT * FROM restaurant_burger WHERE ${condition } = ${value}`;
      connection.query(sqlQuery, function (err, data) {
          if (err) cb(err, null);
          cb(null, data)
      });
  },
  insertOne: function (burgerName, cb) {
      const sqlQuery = `INSERT INTO restaurant_burger(burger_name) VALUES('${burgerName}')`;
      connection.query(sqlQuery, function (err, data) {
          if (err) cb(err, null);
          cb(null, data);
      });
  },

  updateOne: function (condition, id, cb) {
      const sqlQuery = `UPDATE restaurant_burger SET is_favorite = ${condition} WHERE id = ${id}`;
      connection.query(sqlQuery, function (err, data) {
          if (err) cb(err, null);
          cb(null, data)
      });
  },

router.get("/", function(req, res) {
  burger.selectAll(function(data) {
    var HandleBrsObj = {
      burgers: data
    };
    console.log(HandleBrsObj);
    res.render("index", HandleBrsObj);
  });

  router.post("/api/burgers", function(req, res) {
    burger.insertOne(
      ["burger_name", "devoured"],
      [req.body.burger_name, req.body.devoured],
      function(result) {
        // Send back the ID of new burger
        res.json({ id: result.insertId });
      }
    );
  });
  router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);
    burger.updateOne({ devoured: req.body.devoured }, condition, function(
      result
    ) {
      if (result.changedRows === 0) {
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });
  router.delete("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    console.log("condition", condition);

    burger.deleteOne(condition, function(result) {
      if (result.changedRows === 0) {
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });
});
module.exports = router;
