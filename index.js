// Import modules
const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTables = require("console.table");
const logo = require('asciiart-logo');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'four=4444',
    database: 'emptrack_db',
    multipleStatements: true
  },
  console.log(`Connected to the emptrack_db database.`)
);

// connects to sql server and sql database
db.connect(function (err) {
  if (err) throw err;
  console.log(
    logo({
      name: 'Employee Manager',
      lineChars: 10,
      padding: 2,
      margin: 3,
      borderColor: 'grey',
      logoColor: 'blue',
      textColor: 'blue',
    })
      .render()
  );
  console.log("Welcome to employee Manager ! ")
  initPrompt();
})

// prompts user with list of options to choose from
function initPrompt() {
  inquirer.prompt({
    name: 'action',
    type: 'list',
    message: 'What would you like to do?',
    choices: [
      "Add a department.",
      "Add a role.",
      "Add an employee.",
      "View departments.",
      "View roles.",
      "View employees.",
      "View total budget utilization by department.",
      "View employees with the same manager.",
      "View employees by department.",
      "Update an employee's role.",
      "Update an employee's manager.",
      "Delete a department.",
      "Delete a role.",
      "Delete an employee.",
      "Exit.",
    ],
  }).then(function (answer) {
    switch (answer.action) {
      case "Add a department.":
        addDepartment();
        break;

      case "Add a role.":
        addRole();
        break;

      case "Add an employee.":
        addEmployee();
        break;

      case "View departments.":
        viewDepartment();
        break;

      case "View roles.":
        viewRole();
        break;

      case "View employees.":
        viewEmployee();
        break;

      case "View total budget utilization by department.":
        budgetUtilized();
        break;

      case "View employees with the same manager.":
        viewEmpByManager();
        break;

      case "View employees by department.":
        viewEmpByDepartment();
        break;

      case "Update an employee's role.":
        updateRole();
        break;

      case "Update an employee's manager.":
        updateEmpManager();
        break;

      case "Delete a department.":
        deleteDepartment();
        break;

      case "Delete a role.":
        deleteRole();
        break;

      case "Delete an employee.":
        deleteEmployee();
        break;

      case "Exit.":
        db.end();
        console.log(" Employee Management System Exit. ")
         console.log(
          logo({
            name: 'Employee Manager System Exit ',
          lineChars: 10,
          padding: 2,
          margin: 3,
          borderColor: 'grey',
          logoColor: 'skyblue',
          textColor: 'skyblue',
        })
         .render()
        );
        break;
    }
  })
}

// view all departments in the database
function viewDepartment() {
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.table(result);
    initPrompt();
  });
}

//view all roles in the database
function viewRole() {
  const sql = `SELECT role.id,title, department.name AS department,salary
  FROM role 
  LEFT JOIN department 
  ON role.department_id = department.id
  ORDER BY role.id;`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.table(result);
    initPrompt();
  });
}

//view all employees in the database
function viewEmployee() {
  const sql = `SELECT employee.id,employee.first_name,employee.last_name,title,name AS department,salary,
  CONCAT(e.first_name," ",e.last_name) AS manager
  FROM employee
  LEFT JOIN role
  ON employee.role_id = role.id
  LEFT JOIN department
  ON role.department_id = department.id
  LEFT JOIN employee e
  ON employee.manager_id = e.id
  ORDER BY employee.id;`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.table(result);
    initPrompt();
  });
}

// add a department to the database
function addDepartment() {
  inquirer.prompt({
    name: 'newDepartment',
    type: 'input',
    message: 'Which department would you like to add?'
  }).then(function (answer) {
    db.query(
      `ALTER TABLE department AUTO_INCREMENT = 1; INSERT INTO department SET ?`,
      {
        name: answer.newDepartment
      });
    const sql = 'SELECT * FROM department';
    db.query(sql, function (err, res) {
      if (err) throw err;
      console.log(answer.newDepartment + ' has been added!');
      console.table('All Departments:', res);
      initPrompt();
    })
  })
}

// add a role to the database
function addRole() {
  db.query(
    `SELECT DISTINCT * FROM department`, (err, result) => {
      if (err) throw err;
      inquirer.prompt([
        {
          name: "role",
          type: "input",
          message: "What is the title of the role you like to add?",
        },
        {
          name: "salary",
          type: "input",
          message: "What is the salary of the role? (must be a number and without separating with commas)",
          validate: input => {
            if (isNaN(input)) {
              console.log("Please enter a number!")
              return false;
            } else {
              return true;
            }
          }
        },
        {
          name: 'department',
          type: 'list',
          message: "What department does the role belong to?",
          choices: () =>
            result.map((result) => result.name),
        }])
        .then(function (answers) {
          const departmentID = result.filter((result) => result.name === answers.department)[0].id;
          db.query(
            "ALTER TABLE role AUTO_INCREMENT = 1; INSERT INTO role SET ?",
            {
              title: answers.role,
              salary: answers.salary,
              department_id: departmentID
            },
            function (err) {
              if (err) throw err;
              console.log(answers.role + " successfully add to roles under " + answers.department);
              initPrompt();
            }
          );
        });
    })
};


//add an employee to the database
function addEmployee() {
  db.query(
    `SELECT DISTINCT title,id FROM role`, (err, role_result) => {
      if (err) throw err;
      db.query(
        `SELECT DISTINCT CONCAT(e.first_name," ",e.last_name) AS manager_name,e.id
      FROM employee
      LEFT JOIN employee e
      ON employee.manager_id = e.id
      WHERE employee.manager_id IS NOT NULL`, (err, manager_result) => {
        if (err) throw err;
        inquirer.prompt([
          {
            name: "first_name",
            type: "input",
            message: "What is the employee's first name?",
          },
          {
            name: "last_name",
            type: "input",
            message: "What is the employee's last name?",
          },
          {
            name: "role",
            type: "list",
            message: "What is the employee's role?",
            choices: () =>
              role_result.map((role_result) => role_result.title),
          },
          {
            name: 'manager',
            type: 'list',
            message: "Who is the employee's manager?",
            choices: () =>
              manager_result.map((manager_result) => manager_result.manager_name),
          }])
          .then(function (answers) {
            const managerID = manager_result.filter((manager_result) => manager_result.manager_name === answers.manager)[0].id;
            const roleID = role_result.filter((role_result) => role_result.title === answers.role)[0].id;
            db.query(
              "ALTER TABLE employee AUTO_INCREMENT = 1; INSERT INTO employee SET ?",
              {
                first_name: answers.first_name,
                last_name: answers.last_name,
                role_id: roleID,
                manager_id: managerID
              },
              function (err) {
                if (err) throw err;
                console.log(answers.first_name + ' ' + answers.last_name + " is successfully added!");
                initPrompt();
              }
            );
          });
      })
    })
};

//update a role in the database
function updateRole() {
  db.query(`SELECT * FROM employee`, (err, employee_result) => {
    if (err) throw err;
    db.query(`SELECT * FROM role`, (err, role_result) => {
      if (err) throw err;
      inquirer.prompt([
        {
          name: "employee",
          type: "list",
          message: "Which employee would you like to update?",
          choices: () =>
            employee_result.map(
              (employee_result) => employee_result.first_name + " " + employee_result.last_name
            ),
        },
        {
          name: "role",
          type: "list",
          message: "Which role do you want to assign the selected employee?",
          choices: () =>
            role_result.map(
              (role_result) => role_result.title
            ),
        },
      ])
        .then((answers) => {
          const roleID = role_result.filter((role_result) => role_result.title === answers.role)[0].id;
          const empID = employee_result.filter((employee_result) => employee_result.first_name + " " + employee_result.last_name === answers.employee)[0].id;
          db.query(
            `UPDATE employee SET ? WHERE ?`,
            [{
              role_id: roleID
            },
            {
              id: empID
            }],
            function (err) {
              if (err) throw err;
              console.log(answers.employee + "'s role is successfully updated!");
              initPrompt();
            }
          );
        });
    })
  })
}

//Update employee managers in the database
function updateEmpManager() {
  db.query(`SELECT * FROM employee`, (err, employee_result) => {
    if (err) throw err;
    db.query(`SELECT DISTINCT CONCAT(e.first_name," ",e.last_name) AS manager_name,e.id
          FROM employee
          LEFT JOIN employee e
          ON employee.manager_id = e.id
          WHERE employee.manager_id IS NOT NULL`, (err, manager_result) => {
      if (err) throw err;
      inquirer.prompt([
        {
          name: "employee",
          type: "list",
          message: "Which employee would you like to update?",
          choices: () =>
            employee_result.map(
              (employee_result) => employee_result.first_name + " " + employee_result.last_name
            ),
        },
        {
          name: "manager",
          type: "list",
          message: "Who is this employee's new manager?",
          choices: () =>
            manager_result.map(
              (manager_result) => manager_result.manager_name
            ),
        },
      ])
        .then((answers) => {
          const managerID = manager_result.filter((manager_result) => manager_result.manager_name === answers.manager)[0].id;
          const empID = employee_result.filter((employee_result) => employee_result.first_name + " " + employee_result.last_name === answers.employee)[0].id;
          db.query(
            `UPDATE employee SET ? WHERE ?`,
            [{
              manager_id: managerID
            },
            {
              id: empID
            }],
            function (err) {
              if (err) throw err;
              console.log(answers.employee + "'s manager is successfully updated!");
              initPrompt();
            }
          );
        });
    })
  })
};

//view employees by manager
function viewEmpByManager() {
  db.query(
    `SELECT DISTINCT CONCAT(e.first_name," ",e.last_name) AS manager_name
  FROM employee
  LEFT JOIN employee e
  ON employee.manager_id = e.id
  WHERE employee.manager_id IS NOT NULL`, (err, result) => {
    if (err) throw err;
    inquirer.prompt({
      name: "manager",
      type: "list",
      message: "Which manager's team would you like to view?",
      choices: () =>
        result.map((result) => result.manager_name),
    })
      .then((answer) => {
        db.query(
          `SELECT employee.id,employee.first_name,employee.last_name,title,name AS department,salary
          FROM employee
          LEFT JOIN role
          ON employee.role_id = role.id
          LEFT JOIN department
          ON role.department_id = department.id
          LEFT JOIN employee e
          ON employee.manager_id = e.id
          WHERE CONCAT(e.first_name," ",e.last_name) = "${answer.manager}"
          ORDER BY employee.role_id`, (err, finalResult) => {
          if (err) throw err;
          console.table(answer.manager + "'s Team: ", finalResult);
          initPrompt();
        })
      })
  })
}

//View employees by department
function viewEmpByDepartment() {
  db.query(
    `SELECT DISTINCT name FROM department`, (err, result) => {
      if (err) throw err;
      inquirer.prompt({
        name: "department",
        type: "list",
        message: "Which department would you like to view?",
        choices: () =>
          result.map((result) => result.name),
      })
        .then((answer) => {
          db.query(
            `SELECT employee.id,employee.first_name,employee.last_name,title,name AS department,salary,
          CONCAT(e.first_name," ",e.last_name) as manager
          FROM employee
          LEFT JOIN role
          ON employee.role_id = role.id
          LEFT JOIN department
          ON role.department_id = department.id
          LEFT JOIN employee e
          ON employee.manager_id = e.id
          WHERE name = "${answer.department}"
          ORDER BY employee.role_id`, (err, finalResult) => {
            if (err) throw err;
            console.table("Employees under " + answer.department + " Department: ", finalResult);
            initPrompt();
          })
        })
    })
}

//Delete departments
function deleteDepartment() {
  db.query("SELECT DISTINCT name FROM department", (err, result) => {
    if (err) throw err;
    inquirer.prompt({
      name: "department",
      type: "list",
      message: "Which department would you like to delete?",
      choices: () =>
        result.map((result) => result.name)
    })
      .then((answer) => {
        db.query(`SET FOREIGN_KEY_CHECKS=0;
    DELETE FROM department WHERE ?`, { name: answer.department },
          (err, result) => {
            if (err) throw err;
            console.log(
              "Successfully deleted the " + answer.department + " department."
            );
            initPrompt();
          });
      })
  })
}

//Delete roles
function deleteRole() {
  db.query("SELECT DISTINCT title FROM role", (err, result) => {
    if (err) throw err;
    inquirer.prompt({
      name: "title",
      type: "list",
      message: "Which role would you like to delete?",
      choices: () =>
        result.map((result) => result.title)
    })
      .then((answer) => {
        db.query(`SET FOREIGN_KEY_CHECKS=0;
      DELETE FROM role WHERE ?`, { title: answer.title },
          (err, result) => {
            if (err) throw err;
            console.log(
              "Successfully deleted the " + answer.title + " role."
            );
            initPrompt();
          });
      })
  })
}

//Delete employees
function deleteEmployee() {
  db.query("SELECT DISTINCT CONCAT(first_name,' ',last_name) AS full_name FROM employee", (err, result) => {
    if (err) throw err;
    inquirer.prompt({
      name: "full_name",
      type: "list",
      message: "Which employee would you like to delete?",
      choices: () =>
        result.map((result) => result.full_name)
    })
      .then((answer) => {
        console.log(answer.full_name)
        db.query(`SET FOREIGN_KEY_CHECKS=0;
      DELETE FROM employee WHERE CONCAT(first_name,' ',last_name) = "${answer.full_name}"`,

          (err, result) => {
            if (err) throw err;
            console.log(
              "Successfully deleted the employee named " + answer.full_name + "."
            );
            initPrompt();
          });
      })
  })
}

//View the total utilized budget of a department
function budgetUtilized() {
  db.query(
    `SELECT DISTINCT name from department`, (err, result) => {
      if (err) throw err;
      inquirer.prompt({
        name: "department",
        type: "list",
        message: "Which department would you like to view?",
        choices: () =>
          result.map((result) => result.name),
      })
        .then((answer) => {
          db.query(
            `SELECT name AS department, SUM(salary) AS utilized_budget
          FROM employee
          LEFT JOIN role
          ON employee.role_id = role.id
          LEFT JOIN department
          ON role.department_id = department.id
          WHERE name = "${answer.department}"
          GROUP BY name`, (err, finalResult) => {
            if (err) throw err;
            console.table("The combined salaries of all employees in " + answer.department + " department is:", finalResult);
            initPrompt();
          })
        })
    })
}