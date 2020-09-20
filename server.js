// server.js
const dotenv = require('dotenv');
var express = require('express');
var serveStatic = require('serve-static');

dotenv.config();

app = express();
app.use(serveStatic(__dirname + "/dist"));
var port = process.env.PORT;
app.listen(port);
console.log('server started ' + port);