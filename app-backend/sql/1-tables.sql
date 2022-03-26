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
  school_name TEXT,
  street TEXT,
  city TEXT,
  county TEXT,
  post_code TEXT
);
CREATE TABLE IF NOT EXISTS classes (
  class_code INT PRIMARY KEY,
  class_name TEXT,
  year INT,
  school_code INT,
  FOREIGN KEY (school_code) REFERENCES schools(school_code) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS students (
  student_no SERIAL PRIMARY KEY,
  student_email TEXT,
  school_code INT,
  class_code INT,
  year INT,
  FOREIGN KEY (student_email) REFERENCES users(email) ON DELETE CASCADE,
  FOREIGN KEY (school_code) REFERENCES schools(school_code) ON DELETE CASCADE,
  FOREIGN KEY (class_code) REFERENCES classes(class_code) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS teachers (
  school_code INT,
  teacher_email TEXT,
  FOREIGN KEY (school_code) REFERENCES schools(school_code) ON DELETE CASCADE,
  FOREIGN KEY (teacher_email) REFERENCES users(email) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS leaders (
  class_code INT,
  school_code INT,
  teacher_email TEXT,
  FOREIGN KEY (class_code) REFERENCES classes(class_code) ON DELETE CASCADE,
  FOREIGN KEY (school_code) REFERENCES schools(school_code) ON DELETE CASCADE,
  FOREIGN KEY (teacher_email) REFERENCES users(email) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS assignments (
  assignment_code SERIAL PRIMARY KEY,
  assignment_name TEXT,
  assignment_desc TEXT,
  assignment_url TEXT,
  assign_date timestamp,
  deadline TEXT,
  assigned_by TEXT,
  class_code INT,
  school_code INT,
  FOREIGN KEY (assigned_by) REFERENCES users(email) ON DELETE CASCADE,
  FOREIGN KEY (class_code) REFERENCES classes(class_code) ON DELETE CASCADE,
  FOREIGN KEY (school_code) REFERENCES schools(school_code) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS submissions (
  submission_code SERIAL PRIMARY KEY,
  assignment_code INT,
  student_email TEXT,
  submission_status TEXT,
  grade_status TEXT,
  last_modified timestamp,
  file_submission TEXT,
  FOREIGN KEY (assignment_code) REFERENCES assignments(assignment_code) ON DELETE CASCADE,
  FOREIGN KEY (student_email) REFERENCES users(email) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS feedback (
  feedback_no SERIAL PRIMARY KEY,
  assignment_code INT,
  submission_code INT,
  grade TEXT,
  graded_on timestamp,
  graded_by TEXT,
  comments TEXT,
  FOREIGN KEY (assignment_code) REFERENCES assignments(assignment_code) ON DELETE CASCADE,
  FOREIGN KEY (submission_code) REFERENCES submissions(submission_code) ON DELETE CASCADE,
  FOREIGN KEY (graded_by) REFERENCES users(email)
)