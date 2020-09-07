var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootroot",
    database: "employee_tracker_db"
});

connection.connect(function(err) {
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
        "View All Employees By Department", 
        "View Employees By Role",
        "Add Employee", 
        "Add Role", 
        "Add Deparment",
        "Update Employee Role",
        "End"]
    }).then(function (answers) {
        console.log(answers.toDo);
            switch (answers.toDo) {
                case "View All Employees":
                    viewEmployees()
                    break;

                case "View Employees By Department":
                    viewDepartments()
                    break;

                case "View Roles":
                    viewRole()
                    break;
                
                case "Add New Employee":
                    addEmployee()
                    break;

                case "Add Role":
                    addRole()
                    break;

                case "Add New Department":
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
//prompts for information to add a new employee to systme
function addEmployee () {
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
        type: "number",
        name: "roleId",
        message: "What is the employee's role ID?"
        },
        {
        type: "number",
        name: "managerId",
        message: "What is the employee's manager's ID?"
        }
    ])


//creates a new role to a specific department
    function addRole() {
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
        ])
    };
//adds a new department to department list
    function addDepartment() {
        inquirer.prompt([
            {
            type: "input",
            message: "What department would you like to add?",
            name: "newDepartment"
            }
        ])
    }

//updates the role for an individual employee
    function updateRole() {
        inquirer.prompt([
            {
            type: "input",
            message: "Which employee would you like to update?",
            name: "nameUpd"
            },
            {
            type: "number",
            message: "What is the new Role ID?",
            name: "roleId"
            }
        ])
    }

function afterConnection() {
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        console.table(res);
        connection.end;
    });
}
}