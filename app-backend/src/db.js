const {Pool} = require('pg');

var pool; 

/* Set the pool as the Postgres database */
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

/**
 * Class for database connection 
 */
class Db {
    constructor() {};

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

}

module.exports = Db;