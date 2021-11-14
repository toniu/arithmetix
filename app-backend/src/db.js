const {Pool} = require('pg');
const fs = require('fs');
const archiver = require('archiver');
const format = require('pg-format');

var pool; 

switch (process.env.NODE_ENV) {
    default:
        pool = new Pool({
            user: "arithmetix_admin",
            host: "localhost",
            database: "arithmetix_db",
            password: "admin",
            port: 5432,
        });
        break;
}

/* Class for database connection */
class Db {
    constructor() {};

    async getMethodExample(param) {
        const {rows} = await pool.query(
            `
            SELECT 
            attribute
            FROM table1
            WHERE condition = $1`,
            [param],
        );
        return rows;
    }

    /**
     * User authentication which checks the users credentials
     * against credientials stored in the table for users in the database
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
        return !!rows.length;
    }

    /**
     * Retrieve the user's full name from the database using their email
     * @param {String} email - used to uniquely identify the user.
     * @returns {String} Full name of the user
     */
    async getFullName(email) {
        const {rows} = await pool.query(
            `
            SELECT 
              first_name,
              last_name
            FROM users
            WHERE email = $1`,
            [email],
        );
        return rows[0].first_name + ' ' + rows[0].last_name;
    }

    /**
     * Gets all of the existing teachers
     * @returns {rows}
     */
     async getTeachers() {
        const {rows} = await pool.query(`
        SELECT *
        FROM teachers
        `);
        return rows;
      }

}

module.exports = Db;