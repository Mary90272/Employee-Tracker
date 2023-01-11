-- view all roles
-- +----+---------------------+-------------+--------+
-- | id | title               | department  | salary |
-- +----+---------------------+-------------+--------+
-- |  1 | Sales Lead          | Sales       | 100000 |
-- |  2 | Salesperson         | Sales       |  80000 |
-- |  3 | Lead Engineer       | Engineering | 150000 |
-- |  4 | Software Engineer   | Engineering | 120000 |
-- |  5 | Account Manager     | Finance     | 160000 |
-- |  6 | Accountant          | Finance     | 125000 |
-- |  7 | Legal Team Lead     | Legal       | 200000 |
-- |  8 | Lawyer              | Legal       | 160000 |
-- |  9 | Marketing Manager   | Marketing   | 120000 |
-- | 10 | Marketing Assistant | Marketing   |  45000 |
-- | 11 | HR Lead             | HR          | 120000 |
-- | 12 | HR Manager          | HR          | 100000 |
-- | 13 | President           | Executive   | 500000 |
-- | 14 | CEO                 | Executive   | 400000 |
-- | 15 | Executive Assistant | Executive   | 250000 |
-- +----+---------------------+-------------+--------+
-- join table 
SELECT role.id,title, department.name AS department,salary
FROM role 
LEFT JOIN department 
ON role.department_id = department.id
ORDER BY role.id
;


-- view all employees
--+----+------------+-----------+---------------------+-------------+--------+------------------+
-- | id | first_name | last_name | title               | department  | salary | manager          |
-- +----+------------+-----------+---------------------+-------------+--------+------------------+
-- |  1 | Melinda    | May       | Sales Lead          | Sales       | 100000 | Steve Rogers     |
-- |  2 | Scott      | Lang      | Salesperson         | Sales       |  80000 | Melinda May      |
-- |  3 | Tony       | Stark     | Lead Engineer       | Engineering | 150000 | Steve Rogers     |
-- |  4 | Peter      | Parker    | Software Engineer   | Engineering | 120000 | Tony Stark       |
-- |  5 | Sam        | Wilson    | Account Manager     | Finance     | 160000 | Steve Rogers     |
-- |  6 | Peggy      | Carter    | Accountant          | Finance     | 125000 | Sam Wilson       |
-- |  7 | Bruce      | Banner    | Legal Team Lead     | Legal       | 200000 | Steve Rogers     |
-- |  8 | Wanda      | Maximoff  | Lawyer              | Legal       | 160000 | Bruce Banner     |
-- |  9 | Stephen    | Strange   | Marketing Manager   | Marketing   | 120000 | Steve Rogers     |
-- | 10 | Clint      | Barton    | Marketing Assistant | Marketing   |  45000 | Stephen Strange  |
-- | 11 | Natasha    | Romanoff  | HR Lead             | HR          | 120000 | Steve Rogers     |
-- | 12 | Pepper     | Potts     | HR Manager          | HR          | 100000 | Natasha Romanoff |
-- | 13 | Nick       | Fury      | President           | Executive   | 500000 | NULL             |
-- | 14 | Steve      | Rogers    | CEO                 | Executive   | 400000 | Nick Fury        |
-- | 15 | Maria      | Hill      | Executive Assistant | Executive   | 250000 | Nick Fury        |
-- +----+------------+-----------+---------------------+-------------+--------+------------------+
-- join table 
SELECT employee.id,employee.first_name,employee.last_name,title,name AS department,salary,
CONCAT(e.first_name," ",e.last_name) AS manager
FROM employee
LEFT JOIN role
ON employee.role_id = role.id
LEFT JOIN department
ON role.department_id = department.id
LEFT JOIN employee e
ON employee.manager_id = e.id
ORDER BY employee.role_id
;

-- view employee by manager
-- example
-- Steve Rogers's Team: 
-- -----------------------------------------------------------------
-- id  first_name  last_name  title              department   salary
-- --  ----------  ---------  -----------------  -----------  ------
-- 1   Melinda     May        Sales Lead         Sales        100000
-- 3   Tony        Stark      Lead Engineer      Engineering  150000
-- 5   Sam         Wilson     Account Manager    Finance      160000
-- 7   Bruce       Banner     Legal Team Lead    Legal        200000
-- 9   Stephen     Strange    Marketing Manager  Marketing    120000
-- 11  Natasha     Romanoff   HR Lead            HR           120000

--show table with manager names
SELECT DISTINCT CONCAT(e.first_name," ",e.last_name) AS manager_name
FROM employee
LEFT JOIN employee e
ON employee.manager_id = e.id
WHERE employee.manager_id IS NOT NULL

--return employee info user input
SELECT employee.id,employee.first_name,employee.last_name,title,name AS department,salary
FROM employee
LEFT JOIN role
ON employee.role_id = role.id
LEFT JOIN department
ON role.department_id = department.id
LEFT JOIN employee e
ON employee.manager_id = e.id
WHERE CONCAT(e.first_name," ",e.last_name) = manager_name_use_input
ORDER BY employee.role_id

-- view employee by department
-- example
-- Employees under HR Department: 
-- -------------------------------------------------------------------------
-- id  first_name  last_name  title       department  salary  manager         
-- --  ----------  ---------  ----------  ----------  ------  ----------------
-- 11  Natasha     Romanoff   HR Lead     HR          120000  Steve Rogers    
-- 12  Pepper      Potts      HR Manager  HR          100000  Natasha Romanoff

-- show all the department in a table
SELECT DISTINCT name FROM department
-- return employee information acoording to user input
SELECT employee.id,employee.first_name,employee.last_name,title,name AS department,salary,
CONCAT(e.first_name," ",e.last_name) as manager
FROM employee
LEFT JOIN role
ON employee.role_id = role.id
LEFT JOIN department
ON role.department_id = department.id
LEFT JOIN employee e
ON employee.manager_id = e.id
WHERE name = department_name_user_input
ORDER BY employee.role_id


-- View the total utilized budget of a department
-- example 
-- The combined salaries of all employees in SalesDepartment is:
-- -----------------------------------------------------------
-- department  budget
-- ----------  ------
-- Sales       180000

-- show all the department in a table
SELECT DISTINCT name from department
-- return employee information acoording to user input
-- SUM the total salary within a department
SELECT name AS department, SUM(salary) AS utilized_budget
FROM employee
LEFT JOIN role
ON employee.role_id = role.id
LEFT JOIN department
ON role.department_id = department.id
WHERE name = department_name_input
GROUP BY name

-- add department
-- Reset Auto Increment Values
ALTER TABLE department AUTO_INCREMENT = 1
-- insert user input data to table 
INSERT INTO department SET name = user_input
-- show all the data in department
SELECT * FROM department

-- delete department
-- create non-duplicated department lists for users to choose from
SELECT DISTINCT name FROM department
-- temporarily disable a foreign key constraint
SET FOREIGN_KEY_CHECKS=0
-- delete department
DELETE FROM department WHERE name = user_input

-- add role
-- create non-duplicated department lists for users to choose from
SELECT DISTINCT * FROM department
-- Reset Auto Increment Values
ALTER TABLE role AUTO_INCREMENT = 1
-- insert user input role to database
INSERT INTO role SET 
        title = user_input_role
        salary = user_input_salary
        department_id = user_choose_departID
      
-- delete role
-- create non-duplicated role title lists for users to choose from
SELECT DISTINCT title FROM role
-- temporarily disable a foreign key constraint
SET FOREIGN_KEY_CHECKS=0
-- delete user choose role from database
DELETE FROM role WHERE title = user_choose_roleTitle


--add employee
-- create non-duplicated role title lists for users to choose from
SELECT DISTINCT title, id FROM role
-- create non-duplicated all manager lists for users to choose from
SELECT DISTINCT CONCAT(e.first_name," ",e.last_name) AS manager_name,e.id
FROM employee
LEFT JOIN employee e
ON employee.manager_id = e.id
WHERE employee.manager_id IS NOT NULL
-- insert user input to database
INSERT INTO employee SET 
        first_name = user_input_first_name,
        last_name = user_input_last_name,
        role_id = roleID(user_choose_role_id),
        manager_id = managerID(user_choose_manager_id)

-- delete employee
-- create non-duplicated employee name lists for users to choose from
SELECT DISTINCT CONCAT(first_name,' ',last_name) AS full_name FROM employee
--delete employee from database
DELETE FROM employee WHERE CONCAT(first_name,' ',last_name) = user_choose_name

