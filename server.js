var express = require('express');

// Create our app
var app = express();

app.use(express.static('dist'));

app.listen(1337, function () {
  console.log('Server is running');
});
