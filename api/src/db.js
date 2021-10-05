const {Pool} = require('pg');
const fastcsv = require('fast-csv');
const fs = require('fs');
const archiver = require('archiver');
const format = require('pg-format');

var pool;

switch (process.env.NODE_ENV) {
  default:
    pool = new Pool({
      host: 'localhost',
      port: 5432,
      database: 'arithmetix_db',
      user: 'arithmetix_db_admin',
      password: 'admin',
    });
    break;
}

/** Class representing a database connection. */
class Db {
  constructor() {}
}

module.exports = Db;
