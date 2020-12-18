const router = require("express").Router();
const fs = require("fs");
const db = require("../../../db/db.json");
const path = require("path");
const { request } = require("http");
const { parse } = require("path");

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
    const newData = JSON.parse(data);
    newData.push(newNote);
    const jsonData = JSON.stringify(newData);
    fs.writeFileSync(path.join(__dirname, "../../../db/db.json"), jsonData);
    res.json(newData);
  });
});

router.delete("/notes/:id", function (req, res) {
  console.log('This is the delete request', req.params.id);
  const deletNote = parseInt(req.params.id);
  fs.readFile(path.join(__dirname, '../../../db/db.json'), "utf8", function(err, data) {
    if (err) throw err;
    console.log(data);
    const newDelete = JSON.parse(data);
    console.log('This is data to be deleted', newDelete);
    const filteredDb = newDelete.filter(newDeleted => {
      console.log('deleted id', newDeleted.id)
      console.log('delete note', deletNote)
      if (newDeleted.id == parseInt(deletNote)) {
        return false;
      } return true
    });
    console.log('filtered db', filteredDb);
    fs.writeFileSync(path.join(__dirname, "../../../db/db.json"), JSON.stringify(filteredDb));
    res.json(filteredDb);
  });
});

module.exports = router;
