CREATE EXTENSION pgcrypto;

-- Creation of tables (if they don't exist)
CREATE TABLE IF NOT EXISTS users (
    userCode int NOT NULL AUTO_INCREMENT PRIMARY KEY
    email TEXT UNIQUE,
    firstName TEXT,
    lastName TEXT,
    password TEXT NOT NULL,
    role TEXT,
    userDOB DATETIME,
);