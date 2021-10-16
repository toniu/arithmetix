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
}

module.exports = Db;