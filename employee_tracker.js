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
        options: [
        "View All Employees", 
        "View All Employees By Department", 
        "View Employees By Role",
        // "View Employees By Manager", 
        "Add Employee", 
        // "Remove Employee", 
        "Add Role", 
        "Add Deparment",
        // "Remove Role", 
        "Update Employee Role",
        // "Update Employee Manager", 
        "End"]
    })
}

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

    // function removeEmployee () {
    //     inquirer.prompt([{
    //         type: "input",
    //         name: "removeEmp",
    //         message: "Which employee would you like to remove?"
    //     }])
    // };

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

    function addDepartment() {
        inquirer.prompt([
            {
            type: "input",
            message: "What department would you like to add?",
            name: "newDepartment"
            }
        ])
    }

    // function removeRole() {
    //     inquirer.prompt([
    //         {
    //         type: "input",
    //         message: "Enter role",
    //         name: "newTitle"
    //         },
    //         {
    //         type: "input",
    //         message: "Enter new role",
    //         name: "newRole"
    //         },
    //         {
    //         type: "number",
    //         message: "Enter Department ID",
    //         name: "departmentId"
    //         }
    //     ])
    // };

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
// function.createProduct() {
//     console.log("Inserting a new product...\n");
//     var query = connection.query(
//         "Insert INTO products SET ?",
//         {

//         }
//     )
// }

function afterConnection() {
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        console.table(res);
        connection.end;
    })
}