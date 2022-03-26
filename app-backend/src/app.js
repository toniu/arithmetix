'use strict';
/* Required modules */
const express = require('express');
const config = require('./config');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const path = require('path');

const fs = require('fs');

const DB = require('./db');

/* Required models for displaying resources (e.g. exam papers, worksheets, quizzes) */
const EP = require('./eps');
const RN = require('./rn');
const WS = require('./ws');
const QZ = require('./quiz');

const mail = require('./mail');
const {body, validationResult} = require('express-validator');

/* Create instance of database model */
const db = new DB();

/* Create instance of exam paper list model and load files */
const eps = new EP();
eps.loadPapers('./src/resources/public/exam-papers')

/* Create instance of revision notes list model and load files */
const revisionNotes = new RN();
revisionNotes.loadNotes('./src/resources/public/revision-notes')

/* Create instance of practice worksheets list model and load files */
const practiceWorksheets = new WS();
practiceWorksheets.loadWorksheets('./src/resources/public/modules')

/* Create instance of quizzes model and load files */
const quizzes = new QZ();
quizzes.loadPools('./src/resources/quizzes')

const app = express();
const router = express.Router();

express.static('./resources')
app.use('/static', express.static('public'))

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
      var schoolID = '';

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

        /* Get role of user */
        const role = await db.getRole(email);
        
        /* Get school ID of user's school */
        if (role == 'student') {
          schoolID = await db.getSchoolCodeByStudentEmail(email);
        } else if (role == 'teacher') {
          schoolID = await db.getSchoolCodeByTeacherEmail(email);
        }

        /* Create new JSON web token */
        const token = jwt.sign({id: email}, config.secret, {expiresIn: 86400});

        /* Values for client's local storage */
        const entries = {
          auth: true,
          token: token,
          user: email,
          firstName: firstName,
          lastName: lastName,
          role: role,
          schoolCode: schoolID,
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
    res.send({success: false, error: 'Could not get exams'});
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
    res.send({success: false, error: 'Could not get exams'});
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
    res.send({success: false, error: 'Could not get worksheets'});
    return false;
  }
});

/**
 * Gets quizzes and returns a list of all CSV files of questions
 */
 router.get('/get_quizzes', async (req, res) => {
  try {
    let list = quizzes.getPools();
    console.log('--- [QUIZ POOLS] from directory search: ', list);
    res.send({success: true, data: list});
  } catch (e) {
    res.send({success: false, error: 'Could not get quizzes'});
    return false;
  }
});

/**
 * Generate quiz questions with selected CSV file
 */
 router.post('/generate_quiz', async (req, res) => {
  try {
    var replay = req.body.replay;
    let quizData = [];
    if (replay) {
      var csvFile = quizzes.getCSVFile();
      console.log('Re-generating quiz with... ', csvFile);
      var poolPath = req.body.file_path;
      /* Quiz data generated - randomly selected 10 questions from chosen pool */
      quizData = await quizzes.chooseQuestions(poolPath);
    } else {
      console.log('Generating quiz with... ', req.body.file_path);
      var poolPath = req.body.file_path;
      /* Quiz data generated - randomly selected 10 questions from chosen pool */
      quizData = await quizzes.chooseQuestions(poolPath);
    }
    res.send({success: true, data: quizData});
  } catch (e) {
    res.send({success: false, error: 'Could not generate quiz'});
    return false;
  }
});

/**
 * Gets quiz data and returns randomised list of questions
 */
 router.get('/get_quiz_data', async (req, res) => {
  try {
    let list = quizzes.getQuizData();
    console.log('--- [QUIZ DATA] from CSV: ', list);
    res.send({success: true, data: list});
  } catch (e) {
    res.send({success: false, error: 'Could not get quiz data'});
    return false;
  }
});

/**
 * Opens the PDF with given path URL - also sets the file header
 */
router.get('/open_pdf', async (req, res) => {
  try {
    /* The file path to access */
    var filePath = req.query.file_path;

    console.log('Opening PDF... ', filePath);
    console.log(__dirname);

    /* Expected route vs. actual route */
    var expectedRoute = path.join(__dirname, 'resources/public');
    var actualRoute = path.join(__dirname, filePath);

    console.log('ER: ', expectedRoute);
    console.log('AR: ', actualRoute);

    /* Open file if the actual route matches with the expected route */
    if (actualRoute.startsWith(expectedRoute)) {
      /* String manipulation to retrieve file name */ 
      var sp = filePath.split('/');
      var fileName = sp[sp.length - 1].toLowerCase();
      console.log('Opening PDF... ', filePath, ' with file name... ', fileName);

      /* Read data of PDF file */
      fs.readFile(actualRoute, function (err, data){
          res.contentType("application/pdf");
          res.send(data);
          console.log(data);
      });
    } else {
      res.send({data: null});
    }
  } catch (e) {
    console.log(e);
    res.send({data: null});
  }
});

/**
 * Gets information about a particular school
 */
 router.post('/get_school_info', async (req, res) => {
  try {
    const schoolInfo = await db.getSchoolInfo(req.body.school_code);
    res.send({success: true, data: schoolInfo});
  } catch (e) {
    res.send({success: false, error: 'Could not get info about school'});
    return false;
  }
});

/**
 * Gets all the classes the teacher teaches in
 */
router.post('/get_classes_teached_by', async (req, res) => {
  try {
    const classesTeacherHas = await db.getClassesTeachedBy(req.body.email);
    res.send({success: true, data: classesTeacherHas});
  } catch (e) {
    res.send({success: false, error: 'Could not get classes teacher has'});
    return false;
  }
});

/**
 * Gets all the classes the teacher teaches in
 */
 router.post('/get_all_school_classes', async (req, res) => {
  try {
    const schoolClasses = await db.getClassesOfSchool(req.body.school_code);
    res.send({success: true, data: schoolClasses});
  } catch (e) {
    res.send({success: false, error: 'Could not get classes of school'});
    return false;
  }
});

/**
 * Gets all the students in a given class
 */
 router.post('/get_students_of_class', async (req, res) => {
  try {
    var studentsOfClass = await db.getStudentsOfClass(req.body.school_code,
      req.body.class_code);
    
    for (const i in studentsOfClass) {
      /* Add names of students */
      if (studentsOfClass[i]) {
        studentsOfClass[i].first_name = await db.getFirstName(studentsOfClass[i].student_email);
        studentsOfClass[i].last_name = await db.getLastName(studentsOfClass[i].student_email);
      }
    }
    console.log(studentsOfClass);
    res.send({success: true, data: studentsOfClass});
  } catch (e) {
    res.send({success: false, error: 'Could not get students of given class'});
    return false;
  }
});

/**
 * Gets all the students of a specific year in a school
 */
 router.post('/get_students_by_year', async (req, res) => {
  try {
    var studentsByYear = await db.getStudentsByYear(req.body.school_code,
      req.body.year);
    
    for (const i in studentsByYear) {
      /* Add names of students */
      if (studentsByYear[i]) {
        studentsByYear[i].first_name = await db.getFirstName(studentsByYear[i].student_email);
        studentsByYear[i].last_name = await db.getLastName(studentsByYear[i].student_email);
      }
    }
    res.send({success: true, data: studentsByYear});
  } catch (e) {
    res.send({success: false, error: 'Could not get students of class by year'});
    return false;
  }
});

/**
 * Adds new class into a school
 */
router.post('/add_class', async (req, res) => {
  console.log('----------APP REQUEST: add class');
  console.log('body: ',
  req.body);

  var emails = req.body.student_emails.split(',');

  try {
    await db.addClassToSchool(
      req.body.class_code,
      req.body.class_name,
      req.body.year,
      req.body.school_code,
      req.body.teacher_email);
    
    console.log('Inserted Class!');

    /* Add array of students to add in forum */
    if (emails.length > 0) {
      await db.addStudentsToClass(
        emails,
        req.body.school_code,
        req.body.class_code);
      console.log('RIGHT THUR');
      console.log('Students added in new class!');
    }

    res.send({success: true, data: req.body.class_name});
  } catch(e) {
    console.log(e);
    res.send({success: false, error: 'Could not add class'});
    return false;
  }
});

/**
 * Re-names the name of a class
 */
router.post('/rename_class', async (req, res) => {
  try {
    let renamedClass = await db.renameClass(
      req.body.class_code,
      req.body.school_code,
      req.body.new_name);
    res.send({success: true, data: renamedClass});
  } catch(e) {
    res.send({success: false, error: 'Could not rename class'});
    return false;
  }
});

/**
 * Adds new student into a class
 */
router.post('/add_students_to_class', async (req, res) => {
  console.log('----------APP REQUEST: add students to class');
  console.log('body: ',
  req.body);
  /* Add student (or students) to a class -
    changing the student's class code to a class that is not void (i.e. not '0') */
  var student = [];
  console.log('Body Email', req.body.student_emails);
  student.push(req.body.student_emails);

  try {
    await db.addStudentsToClass(
      student,
      req.body.school_code,
      req.body.class_code);
    res.send({success: true, data: student});
  } catch(e) {
    console.log(e);
    res.send({success: false, error: 'Could not add student(s) to class'});
    return false;
  }
});

/**
 * Removes a student from a class
 */
router.post('/remove_students_from_class', async (req, res) => {
  try {
    /* Deleting a student(s) from a class -
    changing the student's class code to '0' (void) */
    var student = [];
    console.log('Body Email', req.body.student_emails);
    student.push(req.body.student_emails);

    await db.removeStudentsFromClass(
      student,
      req.body.school_code
    );
    res.send({success: true, data: student[0]});
  } catch (e) {
    console.log(e);
    res.send({success: false, error: 'Could not remove student(s) from class'});
    return false;
  }
});

/**
 * Deletes a class from school
 */
router.post('/delete_class', async (req, res) => {
  try {
    /* Remove students from class */
    var emails = req.body.student_emails.split(',');

    let deletedStudents = await db.removeStudentsFromClass(
      emails,
      req.body.school_code
    );

    console.log('Students removed from class: ', deletedStudents);

    /* Delete class from system */
    await db.deleteClass(
      req.body.school_code,
      req.body.class_code,
    );
    res.send({success: true, data: req.body.class_code});
  } catch (e) {
    console.log(e);
    res.send({success: false, error: 'Could not delete class'});
    return false;
  }
});

/* ------ */

/**
 * Add new assignment to class 
 */
router.post('/add_assignment', async (req, res) => {
  try {
    const assignmentAdded = await db.addAssignment(
      req.body.assignment_code,
      req.body.assignment_name,
      req.body.assignment_desc,
      req.body.assignment_url,
      req.body.deadline,
      req.body.class_code,
      req.body.school_code
      );
    console.log('Inserted assignment!');

    res.send({success: true, data: assignmentAdded});
    /* */
  } catch (e) {
    console.log(e);
    res.send({success: false, error: 'Could not add assignment'});
  }
});

/**
 * Edit particular assignment
 */
router.post('/edit_assignment', async (req, res) => {
  try {
    let editedAssignment = await db.editAssignment(
      req.body.assignment_name,
      req.body.assignment_desc,
      req.body.deadline,
      req.body.assignment_code,
      req.body.class_code,
      req.body.school_code);
    console.log('Edited assignment!');

    res.send({success: true, data: editedAssignment});
  } catch (e) {
    console.log(e);
    res.send({success: false, error: 'Could not edit assignment'});
  }
});

/**
 * Remove assignments
 */
router.post('/delete_assignment', async (req, res) => {
  try {
    await db.deleteAssignment(
      req.body.assignment_code,
      req.body.class_code,
      req.body.school_code
    );
    res.send({success: true, data: req.body.class_code});
  } catch (e) {
    console.log(e);
    res.send({success: false, error: 'Could not delete assignment'});
  }
});

/**
 * Send a new submission for assignment
 */
router.post('/send_submission', async (req, res) => {
  try {
    const submissionAdded = await db.sendSubmission(
      req.body.submission_code,
      req.body.assignment_code,
      req.body.student_email,
      req.body.file_submission,
      req.body.feedback_code
      );
    console.log('Inserted new student submission!');

    res.send({success: true, data: submissionAdded});
    /* */
  } catch (e) {
    console.log(e);
    res.send({success: false, error: 'Could not send student submission'});
  }
});

/**
 * Deletes an existing submission from the student
 */
router.post('/delete_submission', async (req, res) => {
  try {
    await db.deleteSubmission(
      req.body.submission_code,
      req.body.student_email,
      req.body.feedback_code
    );
    res.send({success: true, data: req.body.submission_code});
  } catch (e) {
    console.log(e);
    res.send({success: false, error: 'Could not delete submission'});
  }
});

/**
 * Update the feedback on a submission made on the assignment
 */
router.post('/update_feedback', async (req, res) => {
  try {
    let editedFeedback = await db.setFeedback(
      req.body.grade,
      req.body.teacher_email,
      req.body.comments,
      req.body.feedback_no,
      req.body.submission_code,
      req.body.assignment_code);
    console.log('Edited feedback!');

    res.send({success: true, data: editedFeedback});
  } catch (e) {
    console.log(e);
    res.send({success: false, error: 'Could not edit feedback'});
  }
});

/**
 * Get student submissions on a particular assignment
 */
router.post('/get_submissions', async (req, res) => {
  try {
    const studentSubmissions = await db.getSubmissions(req.body.assignment_code,
      req.body.school_code,
      req.body.class_code);
    res.send({success: true, data: studentSubmissions});
  } catch (e) {
    res.send({success: false, error: 'Could not get student submissions for particular assignment'});
    return false;
  }
});

/**
 * Get assignments of a class, set by a particular teacher
 */
 router.post('/get_class_assignments_by_teacher', async (req, res) => {
  try {
    const assignments = await db.getClassAssignmentsByTeacher(req.body.school_code,
      req.body.class_code,
      req.body.teacher_email);
    res.send({success: true, data: assignments});
  } catch (e) {
    res.send({success: false, error: 'Could not get assignments set by teacher'});
    return false;
  }
});

/**
 * Retrieves the feedback for a student submission
 */
router.post('/get_submission_feedback', async (req, res) => {
  try {
    const feedback = await db.getFeedback(req.body.submission_code,
      req.body.assignment_code);
    res.send({success: true, data: feedback});
  } catch (e) {
    res.send({success: false, error: 'Could not get feedback for submission'});
    return false;
  }
}); 

/* --- */
router.post('/create_notification', async (req, res) => {});
router.post('/send_notification', async (req, res) => {});
router.post('/read_notification', async (req, res) => {});


/* -- End of router requests -- */
app.use(router);
let port = config.port;

/* Server listening to port */
let server = app.listen(port, function () {
  console.log('Express server listening on port ' + port);
});

module.exports = {server};