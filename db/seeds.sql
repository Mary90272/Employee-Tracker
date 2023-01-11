INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Marketing"),
       ("HR"),
       ("Executive");

-- view all departments
-- SELECT * FROM department;

-- +----+-------------+
-- | id | name        |
-- +----+-------------+
-- |  1 | Sales       |
-- |  2 | Engineering |
-- |  3 | Finance     |
-- |  4 | Legal       |
-- |  5 | Marketing   |
-- |  6 | HR          |
-- |  7 | Executive   |
-- +----+-------------+

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1),
       ("Salesperson", 80000, 1),
       ("Lead Engineer", 150000, 2),
       ("Software Engineer", 120000, 2),
       ("Account Manager", 160000, 3),
       ("Accountant", 125000, 3),
       ("Legal Team Lead", 200000, 4),
       ("Lawyer", 160000, 4),
       ("Marketing Manager", 120000, 5),
       ("Marketing Assistant", 45000, 5),
       ("HR Lead", 120000, 6),
       ("HR Manager", 100000, 6),
       ("President", 500000, 7),
       ("CEO", 400000, 7),
       ("Executive Assistant", 250000, 7);

-- SELECT * FROM role;
-- +----+---------------------+--------+---------------+
-- | id | title               | salary | department_id |
-- +----+---------------------+--------+---------------+
-- |  1 | Sales Lead          | 100000 |             1 |
-- |  2 | Salesperson         |  80000 |             1 |
-- |  3 | Lead Engineer       | 150000 |             2 |
-- |  4 | Software Engineer   | 120000 |             2 |
-- |  5 | Account Manager     | 160000 |             3 |
-- |  6 | Accountant          | 125000 |             3 |
-- |  7 | Legal Team Lead     | 200000 |             4 |
-- |  8 | Lawyer              | 160000 |             4 |
-- |  9 | Marketing Manager   | 120000 |             5 |
-- | 10 | Marketing Assistant |  45000 |             5 |
-- | 11 | HR Lead             | 120000 |             6 |
-- | 12 | HR Manager          | 100000 |             6 |
-- | 13 | President           | 500000 |             7 |
-- | 14 | CEO                 | 400000 |             7 |
-- | 15 | Executive Assistant | 250000 |             7 |
-- +----+---------------------+--------+---------------+

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Melinda", "May", 1, 14),
       ("Scott", "Lang", 2, 1),
       ("Tony", "Stark", 3, 14),
       ("Peter", "Parker", 4, 3),
       ("Sam", "Wilson", 5, 14),
       ("Peggy", "Carter", 6, 5),
       ("Bruce", "Banner", 7, 14),
       ("Wanda", "Maximoff", 8, 7),
       ("Stephen", "Strange", 9, 14),
       ("Clint", "Barton", 10, 9),
       ("Natasha", "Romanoff", 11, 14),
       ("Pepper", "Potts", 12, 11),
       ("Nick", "Fury", 13, null),
       ("Steve", "Rogers", 14, 13),
       ("Maria", "Hill", 15, 13);

-- SELECT * FROM employee;
-- +----+------------+-----------+---------+------------+
-- | id | first_name | last_name | role_id | manager_id |
-- +----+------------+-----------+---------+------------+
-- |  1 | Melinda    | May       |       1 |         14 |
-- |  2 | Scott      | Lang      |       2 |          1 |
-- |  3 | Tony       | Stark     |       3 |         14 |
-- |  4 | Peter      | Parker    |       4 |          3 |
-- |  5 | Sam        | Wilson    |       5 |         14 |
-- |  6 | Peggy      | Carter    |       6 |          5 |
-- |  7 | Bruce      | Banner    |       7 |         14 |
-- |  8 | Wanda      | Maximoff  |       8 |          7 |
-- |  9 | Stephen    | Strange   |       9 |         14 |
-- | 10 | Clint      | Barton    |      10 |          9 |
-- | 11 | Natasha    | Romanoff  |      11 |         14 |
-- | 12 | Pepper     | Potts     |      12 |         11 |
-- | 13 | Nick       | Fury      |      13 |       NULL |
-- | 14 | Steve      | Rogers    |      14 |         13 |
-- | 15 | Maria      | Hill      |      15 |         13 |
-- +----+------------+-----------+---------+------------+
