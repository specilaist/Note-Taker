const router = require('express').Router();
const fs = require('fs');
const db = require('../../../db/db.json');

const { get } = require('..');

router.get('/notes', function(req, res) {
      res.json(db);
      fs.readFile(db, 'utf8', function(err, data) {
            if (err) {
                  console.log(err);
            }
            console.log(data)
      })
})

router.post('/notes', function(req,res){
      const newNote = req.body;
      console.log(newNote);
      fs.readFileSync(db, function(err, data) {
            if (err) {
                  console.log(err)
            };
            console.log(data);
            let newData = JSON.parse(data);
            newNote.push(newData);
            fs.writeFile(db, newNote, function(err,dat) {
                  if(err) console.log(err)
            });
      })
})

router.delete('/notes', function(req, res) {
      res.json(data);

})

module.exports = router