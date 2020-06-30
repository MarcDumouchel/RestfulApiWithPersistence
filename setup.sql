CREATE TABLE students (
studentId serial PRIMARY KEY,
name VARCHAR (255),
grades VARCHAR (255),
email VARCHAR (255)
);

INSERT INTO students 
(name, grades, email) 
VALUES 
('Sally Struthers', 'A, B, C', 'SaveTehChildren@SharkLasers.com'),
('Gunther', 'Q, Q', 'GuntherAndTheSunshineGirls@aol.com'),
('Sammy Sossa', 'Z, Z, Z', 'Samosa@hey.com');
