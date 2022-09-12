var express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var app = express();
require('dotenv').config();

app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb', extended: false }));
app.use(cookieParser());
app.use('/public',express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
    res.send("<h1>Hello</h1>")
});
module.exports = app;
