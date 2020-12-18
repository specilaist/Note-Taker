const express = require('express');
const apiRoutes = require('./Routes');

const app = express();

const PORT = process.env.PORT || 3001

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use("/", apiRoutes)

app.listen(PORT, function() {
      console.log('listening on PORT 3001')
})

