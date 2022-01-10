
------ Hard-coded users
-- Students
INSERT INTO users (email, first_name, last_name, password, role, user_dob)
VALUES ('testuser1@gmail.com','Abigail','Smith', crypt('student', gen_salt('bf')),'student','2005-05-03');
INSERT INTO users (email, first_name, last_name, password, role, user_dob)
VALUES ('testuser2@gmail.com','Demarcus','Thompson', crypt('student', gen_salt('bf')),'student','2005-06-01');
INSERT INTO users (email, first_name, last_name, password, role, user_dob)
VALUES ('testuser3@gmail.com','Phillip','White', crypt('student', gen_salt('bf')),'student','2005-11-21');
INSERT INTO users (email, first_name, last_name, password, role, user_dob)
VALUES ('testuser4@gmail.com','Joseph','Stewart', crypt('student', gen_salt('bf')),'student','2005-11-21');
INSERT INTO users (email, first_name, last_name, password, role, user_dob)
VALUES ('testuser5@gmail.com','Oliver','Orange', crypt('student', gen_salt('bf')),'student','2005-11-21');
INSERT INTO users (email, first_name, last_name, password, role, user_dob)
VALUES ('testuser6@gmail.com','Harry','Hanover', crypt('student', gen_salt('bf')),'student','2005-11-21');
INSERT INTO users (email, first_name, last_name, password, role, user_dob)
VALUES ('testuser7@gmail.com','Aineias','Nikolaus', crypt('student', gen_salt('bf')),'student','2005-11-21');
INSERT INTO users (email, first_name, last_name, password, role, user_dob)
VALUES ('testuser8@gmail.com','Magnus','Dieuwert', crypt('student', gen_salt('bf')),'student','2005-11-21');
INSERT INTO users (email, first_name, last_name, password, role, user_dob)
VALUES ('testuser9@gmail.com','Anastasio','Anouk', crypt('student', gen_salt('bf')),'student','2005-11-21');
INSERT INTO users (email, first_name, last_name, password, role, user_dob)
VALUES ('testuser10@gmail.com','Solomon','Artur', crypt('student', gen_salt('bf')),'student','2005-11-21');
INSERT INTO users (email, first_name, last_name, password, role, user_dob)
VALUES ('testuser11@gmail.com','Alex','Emmie', crypt('student', gen_salt('bf')),'student','2005-11-21');
INSERT INTO users (email, first_name, last_name, password, role, user_dob)
VALUES ('testuser12@gmail.com','Hazel','Ray', crypt('student', gen_salt('bf')),'student','2005-11-21');
INSERT INTO users (email, first_name, last_name, password, role, user_dob)
VALUES ('testuser13@gmail.com','Mya','Alina', crypt('student', gen_salt('bf')),'student','2005-11-21');
INSERT INTO users (email, first_name, last_name, password, role, user_dob)
VALUES ('testuser14@gmail.com','Micheal','Boateng', crypt('student', gen_salt('bf')),'student','2005-11-21');
INSERT INTO users (email, first_name, last_name, password, role, user_dob)
VALUES ('testuser15@gmail.com','April','Summers', crypt('student', gen_salt('bf')),'student','2005-11-21');
INSERT INTO users (email, first_name, last_name, password, role, user_dob)
VALUES ('testuser16@gmail.com','Isaiah','King', crypt('student', gen_salt('bf')),'student','2005-11-21');
INSERT INTO users (email, first_name, last_name, password, role, user_dob)
VALUES ('testuser17@gmail.com','Jade','Edwards', crypt('student', gen_salt('bf')),'student','2005-11-21');
INSERT INTO users (email, first_name, last_name, password, role, user_dob)
VALUES ('testuser18@gmail.com','Sana','Cleo', crypt('student', gen_salt('bf')),'student','2005-11-21');
INSERT INTO users (email, first_name, last_name, password, role, user_dob)
VALUES ('testuser19@gmail.com','Darcia','Evans', crypt('student', gen_salt('bf')),'student','2005-11-21');
INSERT INTO users (email, first_name, last_name, password, role, user_dob)
VALUES ('testuser20@gmail.com','Madison','Cleveland', crypt('student', gen_salt('bf')),'student','2005-11-21');
INSERT INTO users (email, first_name, last_name, password, role, user_dob)
VALUES ('testuser21@gmail.com','Lulu','Kelley', crypt('student', gen_salt('bf')),'student','2005-11-21');
INSERT INTO users (email, first_name, last_name, password, role, user_dob)
VALUES ('testuser22@gmail.com','Siobhan','Hagan', crypt('student', gen_salt('bf')),'student','2005-11-21');
INSERT INTO users (email, first_name, last_name, password, role, user_dob)
VALUES ('testuser23@gmail.com','Ahsan','Mccabe', crypt('student', gen_salt('bf')),'student','2005-11-21');
INSERT INTO users (email, first_name, last_name, password, role, user_dob)
VALUES ('testuser24@gmail.com','Rae','Rubio', crypt('student', gen_salt('bf')),'student','2005-11-21');

-- User as teachers
INSERT INTO users (email, first_name, last_name, password, role, user_dob)
VALUES ('testteacher1@gmail.com','Jeremy','Kingston', crypt('teacher', gen_salt('bf')),'teacher','1984-07-18');
INSERT INTO users (email, first_name, last_name, password, role, user_dob)
VALUES ('testteacher2@gmail.com','Nancy','Daphne', crypt('teacher', gen_salt('bf')),'teacher','1988-02-01');

------ Hard-coded schools
INSERT INTO schools (school_code, school_name, street, city, county, post_code)
VALUES (1,'Christ The King Sixth Form College', 'Belmont Grove', 'Lewisham', 'South East London', 'SE6 3TE');
INSERT INTO schools (school_code, school_name, street, city, county, post_code)
VALUES (2, 'Kings College London', '80 Kennington Road', 'South London', 'London', 'SE4 P5L');
INSERT INTO schools (school_code, school_name, street, city, county, post_code)
VALUES (3, 'St Johnsons College', 'Highland', 'Kingston', 'South West London', 'SW2 7HJ');
INSERT INTO schools (school_code, school_name, street, city, county, post_code)
VALUES (4, 'Stanmore College', 'Elm Park', 'North West London', 'London', 'NW2 VBN');
INSERT INTO schools (school_code, school_name, street, city, county, post_code)
VALUES (5, 'Havering Sixth Form College', 'Wingletye Lane', 'East London', 'London', 'E5 CNR');
INSERT INTO schools (school_code, school_name, street, city, county, post_code)
VALUES (6, 'Richmond-upon-Thames College', 'Egerton Road', 'South West London', 'London', 'SW2 7HJ');

------ Hard-coded classes
INSERT INTO classes(class_code, class_name, year, school_code)
VALUES(1, 'C3801', '2019', 1);
INSERT INTO classes(class_code, class_name, year, school_code)
VALUES(2, 'C3802', '2019', 1);

------ Hard-coded students 
INSERT INTO students (student_email, school_code, class_code, year)
VALUES ('testuser1@gmail.com', 1, 1, '12');
INSERT INTO students (student_email, school_code, class_code, year)
VALUES ('testuser2@gmail.com', 1, 1, '12');
INSERT INTO students (student_email, school_code, class_code, year)
VALUES ('testuser3@gmail.com', 1, 1, '12');
INSERT INTO students (student_email, school_code, class_code, year)
VALUES ('testuser4@gmail.com', 1, 1, '12');
INSERT INTO students (student_email, school_code, class_code, year)
VALUES ('testuser5@gmail.com', 1, 1, '12');
INSERT INTO students (student_email, school_code, class_code, year)
VALUES ('testuser6@gmail.com', 1, 1, '12');
INSERT INTO students (student_email, school_code, class_code, year)
VALUES ('testuser7@gmail.com', 1, 1, '12');
INSERT INTO students (student_email, school_code, class_code, year)
VALUES ('testuser8@gmail.com', 1, 1, '12');
INSERT INTO students (student_email, school_code, class_code, year)
VALUES ('testuser9@gmail.com', 1, 2, '13');
INSERT INTO students (student_email, school_code, class_code, year)
VALUES ('testuser10@gmail.com', 1, 2, '13');
INSERT INTO students (student_email, school_code, class_code, year)
VALUES ('testuser11@gmail.com', 1, 2, '13');
INSERT INTO students (student_email, school_code, class_code, year)
VALUES ('testuser12@gmail.com', 1, 2, '13');
INSERT INTO students (student_email, school_code, class_code, year)
VALUES ('testuser13@gmail.com', 1, 2, '13');
INSERT INTO students (student_email, school_code, class_code, year)
VALUES ('testuser14@gmail.com', 1, 2, '13');
INSERT INTO students (student_email, school_code, class_code, year)
VALUES ('testuser15@gmail.com', 1, 2, '13');
INSERT INTO students (student_email, school_code, class_code, year)
VALUES ('testuser16@gmail.com', 1, 2, '13');


------ Hardcoded teachers
INSERT INTO teachers (class_code, school_code, teacher_email)
VALUES(1, 1, 'testteacher1@gmail.com');
INSERT INTO teachers (class_code, school_code, teacher_email)
VALUES(2, 1, 'testteacher2@gmail.com');

------ Hardcoded assignments
