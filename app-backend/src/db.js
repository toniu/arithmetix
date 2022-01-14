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
      FROM teachers 
      WHERE teacher_email = $1`,
    [teacherEmail]);
    console.log(rows);
    return rows;
  }

  /**
   * Gets all existing classes of a school
   * @param schoolCode - The code of the school
   * @returns {rows} - The classes 
   */
   async getClassesOfSchool(schoolCode) {
    const {rows} = await pool.query(
      `SELECT
      class_code, class_name, year 
      FROM classes 
      WHERE school_code = $1
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
      student_no, student_email, year 
      FROM students 
      WHERE school_code = $1
      AND class_code = $2`,
    [schoolCode, classCode]);
    console.log(rows);
    return rows;
  }

  /**
   * Gets all of the existing students of a specific year
   * @param schoolCode - The code of the school
   * @param classCode - The code of the class
   * @param year - The year
   * @returns {rows} - The students
   */
   async getStudentsByYear(schoolCode, classCode, year) {
    const {rows} = await pool.query(
      `SELECT
      student_no, student_email, year 
      FROM students 
      WHERE school_code = $1
      AND year = $2`,
    [schoolCode, year]);
    console.log(rows);
    return rows;
  }

  /**
   * Adds a new class into the school
   * @param {*} classCode - the class code of the new class
   * @param {*} className - the name the new class
   * @param {*} year - the year of the new class
   * @param {*} schoolCode - the school code of the new class
   * @returns the inserted class
   */
  async addClassToSchool(classCode, className, year, schoolCode) {
    let classInsert = await pool.query(`INSERT INTO classes (class_code, class_name, year, school_code)
      VALUES ($1, $2, $3, $4)`,
      [classCode, className, year, schoolCode]
    );
    return classInsert;
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
    const conn = await pool.connect();

    /* Array of student's class code to update */
    for (let index = 0; index < studentEmails.length; index++) {
      const email = studentEmails[index];
      await conn.query(
        `UPDATE students
        SET class_code = $1
        WHERE student_email = $2 AND
        school_code = $3`
        [classCode, email, schoolCode]
      ); 
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
    for (let index = 0; index < studentEmails.length; index++) {
      const email = studentEmails[index];
      await conn.query(
        `UPDATE students
        SET class_code = 0
        WHERE student_email = $1
        AND schoolCode = $2`
        [email, schoolCode]
      ); 
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
      `UPDATE classes
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
    return await pool.query(
      `
      DELETE FROM classes
      WHERE school_code = $1
      AND class_code = $2`,
      [schoolCode, classCode],
    );
  }


}

module.exports = Db;
