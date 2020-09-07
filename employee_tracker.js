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
    connection.query("SELECT * FROM employee", function (err, data) {
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
    connection.query("SELECT * FROM role", function (err, data) {
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
        type: "number",
        name: "roleId",
        message: "What is the employee's role ID?"
        },
        {
        type: "number",
        name: "managerId",
        message: "What is the employee's manager's ID?"
        }
    ]).then(function(answer) {
        var query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
        connection.query(query, answer.firstName, answer.lastName, parseInt(answer.roleId), parseInt(answer.managerId), function(err, res) {
            if (err) throw err;
            console.log("Successfully Added");
        })
            // viewEmployees();
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
    ]).then(function(answer) {
        var query = "INSERT INTO department (name) VALUES (?)";
        connection.query(query, answer.newDepartment, function(err, res) {
            if (err) throw err;
            console.log("Successfully Added New Department");
        })    
        viewDepartments(); 
    });
    
};

//creates a new role to a specific department
    function addRole() {
        let department= []; 
        connection.query("SELECT * FROM department",
        function(err,res){
          if(err) throw err;
          for (let i=0; i <res.length; i++){
            res[i].first_name + " " + res[i].last_name
            department.push({name: res[i].name, value: res[i].id});
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
        ]).then (function(res){
            console.log(res); 
            const query = connection.query(
              "INSERT INTO role SET ?",
              {
                title: res.newTitle,
                salary: res.newSalary,
                department_id: res.departmentId
              }, 
              function(err, res) {
                  if (err) throw err;
                  viewRole();
              }
            )
        // .then(function(answer) {
        //     var query = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
        //     connection.query(query, answer.newTitle, answer.newSalary, answer.departmentId, function(err, data) {
        //         if (err) throw err;
        //         console.log("Successfully Added New Role");
             })   
        
            })
        
    

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
    };

// function afterConnection() {
//     connection.query("SELECT * FROM employee", function(err, res) {
//         if (err) throw err;
//         console.table(res);
//         connection.end;
//     });
// }
    }
