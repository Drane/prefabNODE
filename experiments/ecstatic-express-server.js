var express = require('express');
var ecstatic = require('ecstatic');

var app = express();
app.use(ecstatic(__dirname + '/public'));
app.listen(8080);

console.log('Listening on :8080');