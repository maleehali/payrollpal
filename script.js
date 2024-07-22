// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');

// Collect employee data
const collectEmployees = function() {
  let employees = [];
  let adding = true;

  while (adding) {
    let firstName = prompt("Enter the employee's first name:");
    let lastName = prompt("Enter the employee's last name:");
    let salary = parseFloat(prompt("Enter the employee's salary:"));
    if (isNaN(salary)) {
      salary = 0;
    }

    employees.push({ firstName, lastName, salary });

    adding = confirm("Do you want to add another employee?");
  }

  return employees;
}

// Display the average salary
const displayAverageSalary = function(employeesArray) {
  let totalSalary = employeesArray.reduce((total, employee) => total + employee.salary, 0);
  let averageSalary = (totalSalary / employeesArray.length).toFixed(2);
  console.log(`Number of employees: ${employeesArray.length}`);
  console.log(`Average salary: $${averageSalary}`);
}

// Select a random employee
const getRandomEmployee = function(employeesArray) {
  let randomIndex = Math.floor(Math.random() * employeesArray.length);
  let randomEmployee = employeesArray[randomIndex];
  console.log(`Random Employee: ${randomEmployee.firstName} ${randomEmployee.lastName}`);
}

// Display employee data in an HTML table
const displayEmployees = function(employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
}

// Function to handle sorting, displaying, and logging data
const handleCancel = function(employees) {
  // Sort employees by last name
  employees.sort(function(a, b) {
    return a.lastName.localeCompare(b.lastName);
  });

  // Display employees
  displayEmployees(employees);

  // Log computed and aggregated data
  displayAverageSalary(employees);
}

// Main function to track employee data
const trackEmployeeData = function() {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  let continueAdding = confirm("Do you want to add another employee?");
  if (!continueAdding) {
    handleCancel(employees);
  }
}

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
