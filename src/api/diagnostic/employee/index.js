const {Router} = require('express');
const employeeRouter = Router()
const EmployeeSchema = require("../../../middleware/database/models/employees");

const employeeQuery = EmployeeSchema;


employeeRouter.get("/getAllEmployees", (req, res) => {
  employeeQuery.find()
      .then(items => res.json(items))
      .catch(err => res.status(400).json('Error: ' + err));
  })

employeeRouter.get("/getEmployee", (req, res) => {
  const {userId} = req.query;
  employeeQuery.find({"managerContact":"+"+userId.replace(" ",'')})
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
})

employeeRouter.post("/addEmployee", (req, res) => {
    const employeeObj = req.body;

    employeeQuery.insertMany(employeeObj)
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
})
  
employeeRouter.post("/updateEmployee", (req, res) => {
    const employeeObj = req.body;
    const {userId} = req.query
    employeeQuery.updateOne({"_id":userId},employeeObj)
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
})

employeeRouter.delete("/deleteEmployee", (req, res) => {
    const {userId} = req.query
    employeeQuery.deleteOne({"managerContact":'+'+userId.replace(" ","")})
      .then(items => res.json(items))
      .catch(err => res.status(400).json('Error: ' + err));
})


module.exports = employeeRouter