USE employee_tracker_db;

INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Finance");
INSERT INTO department (name)
VALUES ("Legal");


INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 75000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 60000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 90000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 90000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 85000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 70000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 95000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
Values ("John", "Doe", 29, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Chan", 30, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ashley", "Rodriguez", 31, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kevin", "Tupik", 32, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Malia", "Brown", 33, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sarah", "Lourd", 34, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tom", "Allen", 35, 6);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tammer", "Galal", 35, 2);
