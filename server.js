const express = require('express')
const path = require('path')
const apiRoutes = require('./Routes/api')


const app = express()

const PORT = 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(apiRoutes)

app.listen(PORT, function() {
      console.log('listening on PORT 3000')
})

