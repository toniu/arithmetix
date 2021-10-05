'use strict';
const fastcsv = require('fast-csv');
const express = require('express');
const config = require('./config');
const DB = require('./db');
const mail = require('./mail');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const formidable = require('formidable');
const fs = require('fs');
const {body, validationResult} = require('express-validator');
const notifyOffice = require('./notify-office');


// automatically notify the office every monday at 7am if there is new requests
const schedule = require('node-schedule');

const rule = new schedule.RecurrenceRule();
let day = (rule.dayOfWeek = 1);
let hour = (rule.hour = 7);
let minute = (rule.minute = 0);
let month = `None`;
// replace above with rule.second = 5 for testing

const job = schedule.scheduleJob(rule, () => {
  notifyOffice();
});

// the order is based on the order they are inserted to the
//datase in populate.sql such that primary and foriegn keys
// dont throw errors
const tableNames = [
  'modules',
  'strands',
  'module_variants',
  'programmes',
  'people',
  'leaders',
  'option_rules',
  'programme_option_keys',
  'module_option_keys',
  'module_choices',
];

const db = new DB();
const app = express();
const router = express.Router();

// i dont know what these lines do ...
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

// CORS middleware
const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
};
app.use(allowCrossDomain);

/**
 * Returns the value of the current reminder reoccurance.
 * TODO get time values from the db.
 */
router.get('/get_schedule_reminder', async (req, res) => {
  res.send({success: true, data: {minute, hour, day, month}});
});

/**
 * Reschedules the reminder using new values.
 * TODO store time values in the db.
 * TODO verify post request is done by admin
 */
router.post(`/schedule_reminder`, async (req, res) => {
  try {
    const rule = new schedule.RecurrenceRule();
    day = `None`;
    month = `None`;
    minute = req.body.minute;
    rule.minute = req.body.minute;
    hour = req.body.hour;
    rule.hour = req.body.hour;
    if (req.body.day != 'None') {
      day = req.body.day;
      rule.dayOfWeek = req.body.day;
    }
    if (req.body.month != 'None') {
      month = req.body.month;
      rule.month = req.body.month;
    }
    job.reschedule(rule);
    console.log(rule);
    console.log(day, month, minute, hour);
    res.send({success: true, data: `Scheduled reminder email`});
  } catch (e) {
    console.error(e);
    res.send({success: false, error: e});
  }
});

/**
 * Attempts to authenticate the user.
 * Returns relevant information based on whether the user is a student/office worker.
 * Stores the data in the LDAP data table
 */
router.post(
  '/login',
  // email must be an email
  body('email').isEmail(),
  // password must be at least 5 chars log (8 characters long is university policy)
  body('password').isLength({min: 5}),
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const email = req.body.email;
    const password = req.body.password;
    try {

    } catch (e) {
      console.error(e);
    }
  },
);

app.use(router);

let port = config.port;

let server = app.listen(port, function () {
  console.log('Express server listening on port ' + port);
});

module.exports = {server};
