const {Pool} = require('pg');
const fs = require('fs');
const archiver = require('archiver');
const format = require('pg-format');

var pool; 

switch (process.env.NODE_ENV) {
    default:
        pool = new Pool({
            user: "arithmetixAdmin",
            host: "localhost",
            database: "arithmetixDB",
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
}

module.exports = Db;