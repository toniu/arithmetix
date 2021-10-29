CREATE EXTENSION pgcrypto;

-- Creation of tables (if they don't exist)
CREATE TABLE IF NOT EXISTS users (
  email TEXT PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  password TEXT NOT NULL,
  role TEXT,
  user_dob TEXT
);