const router = require('express').Router();

const data = require('../../../db/db.json')

const controller = require('../../../Controller/index');
const { get } = require('..');

router.get('/notes', function(req, res) {
      getNotes().then((notes) => {
            res.json(notes)
      }).catch((e) => {
            if(e) throw e
      });
      // return res.json(data)
})

router.post('/notes', function(req,res){
      data.push(req.body)
})

module.exports = router