const router = require("express").Router();
const fs = require("fs");
let db = require("../../../db/db.json");
const path = require("path");
const { request } = require("http");

router.get("/notes", function (req, res) {
  console.log("This is the get request", db);
  res.json(db);
});

router.post("/notes", function (req, res) {
  console.log('This is the post request', req.body);
  const newNote = req.body;
  newNote.id = db.length;
  console.log('This is the new input', newNote);
  fs.readFile(path.join(__dirname, "../../../db/db.json"), "utf8", function (err, data) {
    if (err) {
      console.log(err);
    }
    let newData = JSON.parse(data);
    newData.push(newNote);
    let jsonData = JSON.stringify(newData);
    fs.writeFile(path.join(__dirname, "../../../db/db.json"), jsonData, function (err, data) {
        if (err) {
          console.log(err);
      }
      console.log(data);
      res.json(newData);
    });
  });
});

router.delete("/notes/:id", function (req, res) {
  console.log('This is the delete request', req.body);
  const deletNote = req.body;
  fs.readFile(path.join(__dirname, '../../../db/db.json'), deletNote, function(err, data) {
    if (err) throw err;
    console.log('This is data to be deleted', data);
  })
  console.log(db);
  db = db.filter(function (note) {
    console.log(note.id);
    console.log(req.params.id);
    if (note.id === parseInt(req.params.id)) {
      return false;
    }
    return true;
  });

  res.json(db);
});

module.exports = router;
