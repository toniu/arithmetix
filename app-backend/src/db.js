const {Pool} = require('pg');

var pool;

/* Set the pool as the Postgres database */
switch (process.env.NODE_ENV) {
  default:
    pool = new Pool({
      user: 'arithmetix_admin',
      host: 'localhost',
      database: 'arithmetix_db',
      password: 'admin',
      port: 5432,
    });
    break;
}

/**
 * Class for database connection
 */
class Db {
  constructor() {}

  /**
   * User authentication which checks the users credentials
   * against credentials stored in the table for users in the database
   * @param {String} email - Used to uniquely identify the user
   * @param {String} password - Used for user authentication
   * @returns {Boolean} Returns if the query has any existing rows
   */
  async login(email, password) {
    const {rows} = await pool.query(
      `SELECT
             *
            FROM users 
            WHERE email = $1
            AND password=crypt($2, password)`,
      [email, password],
    );
    console.log(rows);
    return !!rows.length;
  }

  /**
   * Retrieve the user's first name from the database using their email
   * @param {String} email - used to uniquely identify the user.
   * @returns {String} First name of the user
   */
  async getFirstName(email) {
    const {rows} = await pool.query(
      `
            SELECT 
              first_name
            FROM users
            WHERE email = $1`,
      [email],
    );
    return rows[0].first_name;
  }

  /**
   * Retrieve the user's last name from the database using their email
   * @param {String} email - used to uniquely identify the user.
   * @returns {String} Last name of the user
   */
  async getLastName(email) {
    const {rows} = await pool.query(
      `
            SELECT 
              last_name
            FROM users
            WHERE email = $1`,
      [email],
    );
    return rows[0].last_name;
  }

  /**
   * Retrieve the user's role from the database using their email
   * @param {String} email - used to uniquely identify the user.
   * @returns {String} Role of the user
   */
   async getRole(email) {
    const {rows} = await pool.query(
      `
            SELECT 
              role
            FROM users
            WHERE email = $1`,
      [email],
    );
    return rows[0].role;
  }

  /**
   * Retrieve the information about a particular school e.g.
   * name of school and its location
   * @param {*} schoolCode - the school code
   * @returns the information about the given school
   */
  async getSchoolInfo(schoolCode) {
    const {rows} = await pool.query(
      `
      SELECT 
        school_name, street, city, county, post_code
      FROM schools
      WHERE school_code = $1`,
      [schoolCode],
    );
    return rows[0];
  }


  /**
   * Retrieve the ID of the student's school
   * @param {String} email - used to uniquely identify the user.
   * @returns {String} School ID of the user's school
   */
  async getSchoolCodeByStudentEmail(email) {
    const {rows} = await pool.query(
      `
      SELECT 
        school_code
      FROM students
      WHERE student_email = $1`,
      [email],
    );
    return rows[0].school_code;
  }

  /**
   * Retrieve the ID of the teacher's school
   * @param {String} email - used to uniquely identify the user.
   * @returns {String} School ID of the user's school
   */
   async getSchoolCodeByTeacherEmail(email) {
    const {rows} = await pool.query(
      `
      SELECT 
        school_code
      FROM teachers
      WHERE teacher_email = $1`,
      [email],
    );
    return rows[0].school_code;
  }

  /**
   * Gets all of the existing teachers in the system
   * @returns {rows} - The teachers
   */
  async getTeachers() {
    const {rows} = await pool.query(`
        SELECT *
        FROM teachers
        `);
    return rows;
  }

  /**
   * Gets all classes that the logged in teacher teaches
   * @param teacherEmail - The email of the logged in teacher
   * @returns {rows} - The classes 
   */
   async getClassesTeachedBy(teacherEmail) {
    const {rows} = await pool.query(
      `SELECT
      class_code, school_code 
      FROM leaders 
      WHERE teacher_email = $1
      AND class_code <> 0`,
    [teacherEmail]);
    console.log(rows);
    return rows;
  }

  /**
   * Gets all existing classes of a school.
   * Avoids void classes (class_code = 0); 
   * which means students who are in no class
   * @param schoolCode - The code of the school
   * @returns {rows} - The classes 
   */
   async getClassesOfSchool(schoolCode) {
    const {rows} = await pool.query(
      `SELECT
      class_code, class_name, year 
      FROM classes 
      WHERE school_code = $1
      AND class_code <> 0
      ORDER BY year`,
    [schoolCode]);
    console.log(rows);
    return rows;
  }

  /**
   * Gets all of the existing students of a particular class
   * in a particular school
   * @param schoolCode - The code of the school
   * @param classCode - The code of the class
   * @returns {rows} - The students
   */
   async getStudentsOfClass(schoolCode, classCode) {
    const {rows} = await pool.query(
      `SELECT
      student_no, student_email, class_code, year 
      FROM students 
      WHERE school_code = $1
      AND class_code = $2`,
    [schoolCode, classCode]);
    return rows;
  }

  /**
   * Gets all of the existing students of a specific year
   * @param schoolCode - The code of the school
   * @param classCode - The code of the class
   * @param year - The year
   * @returns {rows} - The students
   */
   async getStudentsByYear(schoolCode, year) {
    const {rows} = await pool.query(
      `SELECT
      student_no, student_email, class_code, year 
      FROM students 
      WHERE school_code = $1
      AND year = $2`,
    [schoolCode, year]);
    console.log(rows);
    return rows;
  }

  /**
   * Adds a new class into the school with leader as the teacher logged in
   * @param {*} classCode - the class code of the new class
   * @param {*} className - the name the new class
   * @param {*} year - the year of the new class
   * @param {*} schoolCode - the school code of the new class
   * @param {*} teacherEmail - the teacher's email
   * @returns the inserted class
   */
  async addClassToSchool(classCode, className, year, schoolCode, teacherEmail) {
    /* Add class to system and set the teacher as the leader of the class*/
    console.log('---------DB CALL: add class to school');
    console.log(classCode, className, year, schoolCode, teacherEmail);
    const conn = await pool.connect();

    await conn.query(`INSERT INTO classes (class_code, class_name, year, school_code)
      VALUES ($1, $2, $3, $4)`,
      [classCode, className, year, schoolCode]
    );

    await conn.query(`INSERT into leaders (class_code, school_code, teacher_email)
      VALUES ($1, $2, $3)`,
      [classCode, schoolCode, teacherEmail]
    );

    console.log('yea');
    return await conn.release();
  }

  /**
   * Adds a new student(s) into the class (chosen from existing student users)
   * @param {*} studentEmails - array of emails of student
   * @param {*} schoolCode - the school code of new student
   * @param {*} classCode - the class code of the class the student is in
   * @param {*} year - the year the student is in
   * @returns the inserted student(s)
   */
  async addStudentsToClass(studentEmails, schoolCode, classCode) {
    console.log('---------DB CALL: add students to newly added class');
    console.log(studentEmails, schoolCode, classCode);
    const conn = await pool.connect();

    /* Array of student's class code to update */
    for (let i = 0; i < studentEmails.length; i++) {
      if (studentEmails[i]) {
        var email = studentEmails[i];
        console.log('---add student: ', email);

        console.log('SC: ', schoolCode);
        console.log('EM: ', email);
        console.log('CC: ', classCode);

        await conn.query(
          `
          UPDATE students 
          SET class_code = $1 
          WHERE student_email = $2 AND 
          school_code = $3`,
          [classCode, email, schoolCode]
        ); 
      } 
    }

    return await conn.release();
  }

  /**
   * Removes student(s) from the class (chosen from existing student users)
   * @param {*} studentEmails - array of emails of student
   * @param {*} schoolCode - the school code of student(s)
   * @returns the removed student(s)
   */
   async removeStudentsFromClass(studentEmails, schoolCode) {
    const conn = await pool.connect();

    /* Array of student's class code to update */
    for (let i = 0; i < studentEmails.length; i++) {
      if (studentEmails[i]) {
        var email = studentEmails[i];
        await conn.query(
          `
          UPDATE students 
          SET class_code = 0 
          WHERE student_email = $1 AND 
          school_code = $2`,
          [email, schoolCode]
        ); 
      }
    }
    return await conn.release();
  }

  /**
   * Renames the name of a class
   * @param {*} classCode - the class code
   * @param {*} schoolCode - the school code
   * @param {*} newName - the new name assigned to the class
   * @returns The updated class name
   */
  async renameClass(classCode, schoolCode, newName) {
    let classNameUpdate = await pool.query(
      `
      UPDATE classes 
      SET class_name = $1 
      WHERE school_code = $2 AND 
      class_code = $3`,
      [newName, schoolCode, classCode]
    );

    return classNameUpdate;
  }

  /**
   * Deletes a class from school
   * @param {*} schoolCode - the school code
   * @param {*} classCode - the class code
   * @returns the deleted class
   */
   async deleteClass(schoolCode, classCode) {
    const conn = await pool.connect();

    await conn.query(
      `
      DELETE FROM leaders 
      WHERE school_code = $1 AND 
      class_code = $2`,
      [schoolCode, classCode],
    );

    await conn.query(
      `
      DELETE FROM classes 
      WHERE school_code = $1 AND 
      class_code = $2`,
      [schoolCode, classCode],
    );

    return await conn.release();
  }

  /**
   * Adds a new assignment for a particular class
   * @param {*} assignmentCode the assignment code
   * @param {*} assignmentName the name of assignment
   * @param {*} assignmentDesc the description of assignment
   * @param {*} assignmentURL the URL of the PDF 
   * @param {*} deadline the deadline of the assignment
   * @param {*} classCode the class code
   * @param {*} schoolCode the school code
   * @returns 
   */
  async addAssignment(assignmentCode, assignmentName, assignmentDesc, assignmentURL, deadline, classCode, schoolCode) {
    await conn.query(`INSERT INTO assignments (assignment_code, assignment_name, assignment_desc, assignment_url, deadline, assigned_by, class_code, school_code)
      VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [assignmentCode, assignmentName, assignmentDesc, assignmentURL, deadline, classCode, schoolCode]
    );

    return await conn.release();
  }

  /**
   * Edits the details of an existing assignment
   * @param {*} assignmentName the new name of the assignment
   * @param {*} assignmentDesc the description of the assignment
   * @param {*} deadline the changed deadline of the assignment
   * @param {*} assignmentCode the assignment code
   * @param {*} classCode the class code
   * @param {*} schoolCode the school code
   * @returns 
   */
  async editAssignment(assignmentName, assignmentDesc, deadline, assignmentCode, classCode, schoolCode) {
    let assignmentUpdate = await pool.query(
      `
      UPDATE assignments 
      SET assignment_name = $1, 
      assignment_desc = $2,  
      deadline = $3,
      WHERE assignment_code = $4,  
      class_code = $5 AND  
      school_code = $6`,
      [assignmentName, assignmentDesc, deadline, assignmentCode, classCode, schoolCode]
    );

    return assignmentUpdate;
  }

  /**
   * Deletes an existing assignment
   * @param {*} assignmentCode the assignment code
   * @param {*} classCode the class code
   * @param {*} schoolCode the school code 
   * @returns 
   */
  async deleteAssignment(assignmentCode, classCode, schoolCode) {
    const conn = await pool.connect();
    
    /* Delete the assignment... */
    await conn.query(
      `
      DELETE FROM assignments 
      WHERE assignment_code = $1, 
      school_code = $2 AND 
      class_code = $3`,
      [assignmentCode, schoolCode, classCode],
    );

    /* Delete any submissions related to the assignment... */
    await conn.query(
      `
      DELETE FROM submissions 
      WHERE assignment_code = $1, 
      class_code = $2 AND 
      school_code = $3
      `,
      [assignmentCode, classCode, schoolCode],
    );
    
    /* Delete any feedback related to the assignment submissions... */
    await conn.query(
      `
      DELETE FROM feedback 
      WHERE assignment_code = $1, 
      class_code = $2 AND 
      school_code = $3
      `,
      [assignmentCode, classCode, schoolCode],
    );

    return await conn.release();
  }

  /**
   * Add submission to associated assignment
   * @param {*} submissionCode the submission code
   * @param {*} assignmentCode the assignment code
   * @param {*} studentEmail the student's email
   * @param {*} fileSubmission the URL of the file submission
   * @param {*} feedbackCode the feedback code
   * @returns 
   */
  async addSubmission(submissionCode, assignmentCode, studentEmail, fileSubmission, feedbackCode) {
    const conn = await pool.connect();

    /* Check for existing submission */
    const {submissions} = await pool.query(
      `SELECT
      *
      FROM submissions 
      WHERE student_email = $1 AND 
      assignment_code = $2`,
    [studentEmail, assignmentCode]);

    /* Delete any existing student's submission(s) and feedback of assignment */
    if (submissions.length > 0) {
      await conn.query(
        `
        DELETE FROM submissions 
        WHERE student_email = $1 AND  
        assignment_code = $2,`,
        [studentEmail, assignmentCode],
      );

      await conn.query(
        `
        DELETE FROM feedback 
        WHERE assignment_code = $1 AND  
        submission_code = $2,`,
        [assignmentCode, submissionCode],
      );
    }

    /* Add new student submission to assignment */
    await conn.query(`INSERT INTO submissions (submission_code, assignment_code, student_email, submission_status, grade_status, file_submission)
      VALUES ($1, $2, $3, $4, $5, $6)`,
      [submissionCode, assignmentCode, studentEmail, 'Submitted', fileSubmission]
    );

    /* Add default feedback to submission */
    await conn.query(`INSERT INTO feedback (feedback_no, assignment_code, submission_code, grade, graded_by, comments)
      VALUES ($1, $2, $3, $4, $5, $6)`,
      [feedbackCode, assignmentCode, submissionCode, '', '', '']
    );

    return await conn.release();

  }

  /**
   * Deletes the submission of associated assignment
   * @param {*} submissionCode the submission code
   * @param {*} studentEmail the student's email
   * @param {*} feedbackCode the feedback code
   */
  async deleteSubmission(submissionCode, studentEmail, feedbackCode) {
    const conn = await pool.connect();
    /* Delete submission from assignment */
    await conn.query(
      `
      DELETE FROM submissions 
      WHERE submission_code = $1 AND 
      student_email = $2`,
      [submissionCode, studentEmail],
    );

    /* Delete the feedback associated with submission */
    await conn.query(
      `
      DELETE FROM feedback 
      WHERE feedback_no = $1 AND 
      submission_code = $2`,
      [feedbackCode, submissionCode],
    );
  }

  /**
   * Sets the feedback of a particular submission to an assignment
   * @param {*} grade the grade on the feedback
   * @param {*} teacherEmail the teacher grading the submission
   * @param {*} comments the comments on the submission
   * @param {*} feedbackNo the feedback code
   * @param {*} submissionCode the submission code
   * @returns 
   */
  async setFeedback(grade, teacherEmail, comments, feedbackNo, submissionCode) {
    let feedbackUpdate = await pool.query(
      `
      UPDATE feedback 
      SET grade = $1, 
      graded_by = $2,
      comments = $3,
      WHERE feedback_no = $4 AND  
      submission_code = $5`,
      [grade, teacherEmail, comments, feedbackNo, submissionCode]
    );

    return feedbackUpdate;
  }

  /**
   * Retrieves the list of submissions of a particular assignment code
   * @param {*} submissionCode the submission code
   * @param {*} assignmentCode the assignment code
   * @returns the rows returned
   */
  async getSubmissions(submissionCode, assignmentCode) {
    const {rows} = await pool.query(
      `SELECT * 
      FROM submissions 
      WHERE submission_code = $1 AND 
      assignment_code = $2 
      ORDER BY last_modified`,
    [submissionCode, assignmentCode]);

    console.log(rows);
    return rows;
  }

  /**
   * Retrieves the list of assignments set by a teacher
   */
  async getAssignmentsByTeacher(schoolCode, classCode, teacherEmail) {
    const {rows} = await pool.query(
      `SELECT * 
      FROM assignments 
      WHERE school_code = $1, 
      class_code = $2 AND 
      assigned_by = $3 
      ORDER BY assign_date`,
    [schoolCode, classCode, teacherEmail]);

    console.log(rows);
    return rows;

  }
}

module.exports = Db;
