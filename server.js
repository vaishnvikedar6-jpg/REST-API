const express = require("express");

const app = express();

const PORT = 5000;

// Middleware
app.use(express.json());

// Temporary employee data
let Employee = [
    {
        id: 1,
        name: "Vaishnavi",
        role: "Developer"
    },
    {
        id: 2,
        name: "Kedar",
        role: "Designer"
    }
];

// GET - Home
app.get("/", (req, res) => {
    res.json({
        message: "Employee API is running"
    });
});

// GET - Get all employees
app.get("/api/employees", (req, res) => {
    res.json(Employee);
});

// POST - Create a new employee
app.post("/api/employees", (req, res) => {

    const newEmployee = {
        id: Employee.length + 1,
        name: req.body.name,
        role: req.body.role
    };

    Employee.push(newEmployee);

    res.status(201).json(newEmployee);
});

// PUT - Update an existing employee
app.put("/api/employees/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const employee = Employee.find(emp => emp.id === id);

    if (!employee) {
        return res.status(404).json({
            message: "Employee not found"
        });
    }

    employee.name = req.body.name;
    employee.role = req.body.role;

    res.json(employee);
});

// DELETE - Delete an employee
app.delete("/api/employees/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const employeeIndex = Employee.findIndex(emp => emp.id === id);

    if (employeeIndex === -1) {
        return res.status(404).json({
            message: "Employee not found"
        });
    }

    const deletedEmployee = Employee.splice(employeeIndex, 1);

    res.json({
        message: "Employee deleted successfully",
        employee: deletedEmployee[0]
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});