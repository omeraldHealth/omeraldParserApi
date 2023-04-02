const mongoose = require('mongoose');
const connectToDiagnosticDatabase = require('../connections/diagnostic');

const EmployeeSchema = new mongoose.Schema({
    managerName: {type:String,required:true},
    managerRole: {type:String,required:true},
    managerContact:{type:String,required:true,unique:true},
    mainBranchId: {type:String,required:true},
    branchId:  {type:String},
})

module.exports = connectToDiagnosticDatabase().model('employees', EmployeeSchema)

