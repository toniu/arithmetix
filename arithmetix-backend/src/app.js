'use strict';
const express = require('express');
const config = require('./config');

const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const formidable = require('formidable');
const fs = require('fs');

const DB = require('./db');
const mail = require('./mail');
const {body, validationResult} = require('express-validator');

const tables = [
    'users',
];

const db = new DB();
const app = express();
const router = express.Router();

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

/* Middle-ware for CORS - allow cross domain */
const allowCD = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
  };
app.use(allowCD);

/* Router requests */

app.use(router);

let port = config.port;

let server = app.listen(port, function () {
  console.log('Express server listening on port ' + port);
});

module.exports = {server};