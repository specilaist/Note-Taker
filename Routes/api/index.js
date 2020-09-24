const router = require('express').Router();

const notesRoutes = require('./notes')

router.use('/api', notesRoutes)

module.exports = router