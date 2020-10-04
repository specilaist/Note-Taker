const router = require('express').Router();
const fs = require('fs');
const data = require('../../../db/db.json');

const { get } = require('..');

router.get('/notes', function(req, res) {
      res.json(data);
      fs.readFile(data, 'utf8', function(err, data) {
            if (err) {
                  console.log(err);
            }
            console.log(data)
      })
})

router.post('/notes', function(req,res){
      const newNote = req.body;
      const existingNote = fs.readFile(data, function(err, data) {
            if (err) {
                  console.log(err)
            }
            console.log(data)
      })
      fs.writeFile(data, newNote,)
})

router.delete('/notes', function(req, res) {
      res.json(data);
      
})

module.exports = router