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
CREATE TABLE IF NOT EXISTS schools (
  school_code INT PRIMARY KEY,
  street TEXT,
  city TEXT,
  county TEXT,
  post_code TEXT
);
CREATE TABLE IF NOT EXISTS classes (
  class_code INT PRIMARY KEY,
  year INT,
  school_code INT,
  FOREIGN KEY (school_code) REFERENCES schools(school_code) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS students (
  student_email TEXT,
  class_code INT,
  year INT,
  FOREIGN KEY (student_email) REFERENCES users(email) ON DELETE CASCADE,
  FOREIGN KEY (class_code) REFERENCES classes(class_code) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS teachers (
  teacher_email TEXT,
  class_code INT,
  FOREIGN KEY (teacher_email) REFERENCES users(email) ON DELETE CASCADE,
  FOREIGN KEY (class_code) REFERENCES classes(class_code) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS tests (
  test_code INT,
  test_link TEXT,
  duration INT,
  class_code INT,
  FOREIGN KEY (class_code) REFERENCES classes(class_code) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS assignments (
  assignment_code INT PRIMARY KEY,
  assignment_link TEXT,
  assign_date TEXT,
  deadline TEXT,
  assigned_by TEXT,
  class_code INT,
  FOREIGN KEY (assigned_by) REFERENCES users(email) ON DELETE CASCADE,
  FOREIGN KEY (class_code) REFERENCES classes(class_code) ON DELETE CASCADE
);