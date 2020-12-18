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
  console.log('This is the delete request', req.query.id);
  const deletNote = JSON.stringify(req.query.id);
  fs.readFile(path.join(__dirname, '../../../db/db.json'), "utf8", function(err, data) {
    if (err) throw err;
    console.log(data);
    const newDelete = JSON.parse(data);
    console.log('This is data to be deleted', newDelete);
    filteredDb = newDelete.filter(function (note) {
      console.log('note.id variable', note.id);
      console.log('deleteNote variable', deletNote);
      if (note.id == parseInt(deletNote)) {
        return false;
      }
      return true;
    });
    fs.writeFile(path.join(__dirname, "../../../db/db.json"), filteredDb, function (err, data) {
      if (err) {
        console.log(err);
      }
      console.log(data);
    });
    res.json('response', filteredDb);
  });
});

module.exports = router;
