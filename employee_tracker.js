var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootroot",
    database: "employee_tracker_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    firstPrompt();
});

function firstPrompt() {

    inquirer.prompt({
        type: "list",
        name: "toDo",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View Departments",
            "View Roles",
            "Add Employee",
            "Add Role",
            "Add Department",
            "Update Employee Role",
            "End"]
    }).then(function (answers) {
        console.log(answers.toDo);
        switch (answers.toDo) {
            case "View All Employees":
                viewEmployees()
                break;
            case "View Departments":
                viewDepartments()
                break;
            case "View Roles":
                viewRole()
                break;
            case "Add Employee":
                addEmployee()
                break;
            case "Add Role":
                addRole()
                break;
            case "Add Department":
                newDepartment()
                break;
            case "Update Employee Role":
                updateRole()
                break;
            default:
                connection.end()
                break;
        }
    })
}

function viewEmployees() {
    var query = 
    `SELECT role.title, employee.id, employee.first_name, employee.last_name, employee.manager_id
    FROM employee
    LEFT JOIN role
    ON employee.role_id = role.id`
    connection.query(query, function (err, data) {
        console.table(data);
        firstPrompt();
    })
}

function viewDepartments() {
    connection.query("SELECT * FROM department", function (err, data) {
        console.table(data);
        firstPrompt();
    })
}

function viewRole() {
    var query = `
    SELECT department.name, role.id, role.title, role.salary
    FROM department 
    INNER JOIN role
    ON department.id = role.department_id`
    connection.query(query, function (err, data) {
        console.table(data);
        firstPrompt();
    })
}

//prompts for information to add a new employee to systme
function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "Type employee's first name."
        },
        {
            type: "input",
            name: "lastName",
            message: "Type employee's last name."
        },
        {
            type: "list",
            choices: ["29", "30", "31", "32", "33", "34", "35"],
            name: "roleId",
            message: "What is the employee's role ID?"
        },
        {
            type: "number",
            name: "managerId",
            message: "What is the employee's manager's ID?"
        }
    ]).then(function (answer) {
        var query= connection.query("INSERT INTO employee SET ?",
        {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: answer.roleId,
            manager_id: answer.managerId
        },
        function(err, res) {
            if (err) throw err;
            console.log("Succefully added new employee");
        })
        firstPrompt();
    })
};
//adds a new department to department list
function newDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "newDepartment",
            message: "What department would you like to add?"
        }
    ]).then(function (answer) {
        var query = "INSERT INTO department (name) VALUES (?)";
        connection.query(query, answer.newDepartment, function (err, res) {
            if (err) throw err;
            console.log("Successfully Added New Department");
        })
        viewDepartments();
    });

};
//updates the role for an individual employee
function updateRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter last name of employee you'd like to update",
            name: "nameUpd"
        },
        {
            type: "number",
            message: "What is the new Role ID?",
            name: "roleId"
        }
    ]).then(function (res) {
        const query = connection.query(
            "UPDATE employee SET ? WHERE ?",
            [
            {
                role_id: res.roleId
            },
        {
                last_name: res.nameUpd
            }
        ],
            function (err, res) {
                if (err) throw err;
                viewRole();
            }
        )
    })
};
//creates a new role to a specific department
function addRole() {
    let department = [];
    connection.query("SELECT * FROM department",
        function (err, res) {
            if (err) throw err;
            for (let i = 0; i < res.length; i++) {
                res[i].first_name + " " + res[i].last_name
                department.push({ name: res[i].name, value: res[i].id });
            }
            inquirer.prompt([
                {
                    type: "input",
                    message: "Enter new role",
                    name: "newTitle"
                },
                {
                    type: "number",
                    message: "Enter salary",
                    name: "newSalary"
                },
                {
                    type: "number",
                    message: "Enter Department ID",
                    name: "departmentId"
                }
            ]).then(function (res) {
                console.log(res);
                const query = connection.query(
                    "INSERT INTO role SET ?",
                    {
                        title: res.newTitle,
                        salary: res.newSalary,
                        department_id: res.departmentId
                    },
                    function (err, res) {
                        if (err) throw err;
                        viewRole();
                    }
                )
            })

        });

    
}
