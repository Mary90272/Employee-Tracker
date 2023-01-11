-- As the image illustrates, your schema should contain the following three tables:
DROP DATABASE IF EXISTS emptrack_db;
CREATE DATABASE emptrack_db;

USE emptrack_db;

-- department
    -- id: INT PRIMARY KEY
    -- name: VARCHAR(30) to hold department name

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);
-- role
    -- id: INT PRIMARY KEY
    -- title: VARCHAR(30) to hold role title
    -- salary: DECIMAL to hold role salary
    -- department_id: INT to hold reference to department role belongs to

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL(20),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
);
-- employee
    -- id: INT PRIMARY KEY
    -- first_name: VARCHAR(30) to hold employee first name
    -- last_name: VARCHAR(30) to hold employee last name
    -- role_id: INT to hold reference to employee role
    -- manager_id: INT to hold reference to another employee that is the manager of the current employee (null if the employee has no manager)

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id)
);