const router = require('express').Router();

const data = require('../../../db/db.json')

const controller = require('../../../Controller/index')

router.get('/notes', function(req, res) {
      return res.json(data)
})

router.post('/notes', function(req,res){
      data.push(req.body)
})

module.exports = router