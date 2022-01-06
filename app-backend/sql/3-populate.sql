
-- Hard-coded users
INSERT INTO users (email, first_name, last_name, password, role, user_dob)
VALUES ('testuser1@gmail.com','Abigail','Smith', crypt('student', gen_salt('bf')),'student','2005-05-03');
INSERT INTO users (email, first_name, last_name, password, role, user_dob)
VALUES ('testuser2@gmail.com','Demarcus','Thompson', crypt('student', gen_salt('bf')),'student','2005-06-01');
INSERT INTO users (email, first_name, last_name, password, role, user_dob)
VALUES ('testuser3@gmail.com','Phillip','White', crypt('student', gen_salt('bf')),'student','2005-11-21');
INSERT INTO users (email, first_name, last_name, password, role, user_dob)
VALUES ('testteacher1@gmail.com','Jeremy','Kingston', crypt('teacher', gen_salt('bf')),'teacher','1984-07-18');
INSERT INTO users (email, first_name, last_name, password, role, user_dob)
VALUES ('testteacher2@gmail.com','Nancy','Daphne', crypt('teacher', gen_salt('bf')),'teacher','1988-02-01');

-- Hard-coded schools

-- Hard-coded classes

-- Hardcoded tests

-- Hardcoded assignments
