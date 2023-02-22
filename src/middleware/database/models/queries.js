const mongoose = require('mongoose');
const connectToDiagnosticDatabase = require('../connections/diagnostic');

const QuerySchema = new mongoose.Schema({
    phoneNumber: {type:String,required:true},
    branch: {type:String,required:true},
    email: {type:String,required:true},
    name: {type:String,required:true},
    subject: {type:String,required:true},
    message: {type:String,required:true},
    createdAt:{type: Date, default: Date.now}, 
})

module.exports = connectToDiagnosticDatabase().model('queries', QuerySchema)

