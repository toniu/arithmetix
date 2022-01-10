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


}

module.exports = Db;
