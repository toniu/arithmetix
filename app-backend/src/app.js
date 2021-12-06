'use strict';
/* Required modules */
const express = require('express');
const config = require('./config');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const DB = require('./db');

/* Required models of resource distrubtion (e.g. exam papers, worksheets) */
const EP = require('./eps');
const RN = require('./rn');
const WS = require('./ws');

const mail = require('./mail');
const {body, validationResult} = require('express-validator');

/* Create instance of database model */
const db = new DB();

/* Create instance of exam paper list model and load files */
const eps = new EP();
eps.loadPapers('./src/resources/exam-papers')

/* Create instance of revision notes list model and load files */
const revisionNotes = new RN();
revisionNotes.loadNotes('./src/resources/revision-notes')

/* Create instance of practice worksheets list model and load files */
const practiceWorksheets = new WS();
practiceWorksheets.loadWorksheets('./src/resources/modules')

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
        throw 'Invalid username/password';
      }

      const email = req.body.email;
      const password = req.body.password;
      const user = await db.login(email, password);

      if (user) {
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
        const entries = {
          auth: true,
          token: token,
          user: email,
          firstName: firstName,
          lastName: lastName,
          student: !isTeacher,
          teacher: isTeacher,
        };

        res.status(200).send(entries);
        console.log(entries);
      } else {
        throw 'No user found'
      }
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
    let list = eps.getPapers();
    console.log('--- [EXAM PAPERS] from directory search: ', list);
    res.send({success: true, data: list});
  } catch (e) {
    res.send({success: true, error: 'Could not get exams'});
    return false;
  }
});

/**
 * Gets revision notes and returns a list of all revision notes
 */
 router.get('/get_revision_notes', async (req, res) => {
  try {
    let list = revisionNotes.getNotes();
    console.log('--- [REVISION NOTES]  from directory search: ', list);
    res.send({success: true, data: list});
  } catch (e) {
    res.send({success: true, error: 'Could not get exams'});
    return false;
  }
});

/**
 * Gets practice worksheets (by topic) and returns a list of all practice worksheets
 */
 router.get('/get_practice_worksheets', async (req, res) => {
  try {
    let list = practiceWorksheets.getWorksheets();
    console.log('--- [PRACTICE WORKSHEETS] from directory search: ', list);
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