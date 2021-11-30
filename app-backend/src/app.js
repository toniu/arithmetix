'use strict';
/* Required modules */
const express = require('express');
const config = require('./config');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const DB = require('./db');
const EP = require('./ep');
const mail = require('./mail');
const {body, validationResult} = require('express-validator');

/* Tables of the arithmetix database,
order based on populate.sql to avoid errors,
related to primary/foriegn keys */

const tables = ['users'];

const db = new DB();
const exampapers = new EP();
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

/*-- Router requests --*/

/**
 * User authentication
 * Returns informations based on the user's role (student, teacher or admin)
 */
router.post(
  '/login',
  /* Check if the email is actually an email */
  body('email').isEmail(),
  /* Password must be minimum 6 characters long */
  body('password').isLength({min: 6}),
  async (req, res) => {
    /* Call function to find any validation errors using Express validator */
    try {
      const errorsFound = validationResult(req);
      if (!errorsFound.isEmpty()) {
        console.log({errorsFound: errorsFound.array()});
        return res.status(400).json('Invalid username and/or password');;
      }

      const email = req.body.email;

      let teachers = await db.getTeachers();
      /* Convert to array of emails */
      let teacherEmails = teachers.map((e) => e.email);
      console.log('Teacher emails: ', teacherEmails);

      let isTeacher = false;
      if (teacherEmails.includes(email)) {
        isTeacher = true;
      }

      /* Get name of user */
      const firstName = await db.getFirstName(email);
      const lastName = await db.getLastName(email);

      /* Create new JSON web token */
      const token = jwt.sign({id: email}, config.secret, {expiresIn: 86400});

      /* Values for client's local storage */
      res.status(200).send({
        auth: true,
        token: token,
        user: email,
        firstName: firstName,
        lastName: lastName,
        student: !isTeacher,
        teacher: isTeacher,
      });
    } catch (e) {
      console.error(e);
      res.status(404).send('No user found.');
    }
  },
);

/**
 * Get all teachers
 * Returns the list of all existing teachers in the system
 */
router.get('/get_teachers', async (req, res) => {
  try {
    let teachers = await db.getTeachers();
    res.send({success: true, data: teachers});
  } catch (e) {
    console.error(e);
    res.send({success: false, error: 'Could not get teachers.'});
    return false;
  }
});

/**
 * Gets exam papers and returns a list of all exam papers
 */
 router.get('/get_exam_papers', async (req, res) => {
  try {
    let list = exampapers;
    console.log('List here: ', list);
    res.send({success: true, data: list});
  } catch (e) {
    res.send({success: true, error: 'Could not get exams'});
    return false;
  }
});


/* -- End of router requests -- */
app.use(router);

let port = config.port;

/* Server listening to port */
let server = app.listen(port, function () {
  console.log('Express server listening on port ' + port);
});

module.exports = {server};