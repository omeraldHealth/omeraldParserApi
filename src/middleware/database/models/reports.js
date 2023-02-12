const mongoose = require('mongoose');
const connectToDiagnosticDatabase = require('../connections/diagnostic');

const ReportParamsType = {
    keyword: {type:String},
    aliases:  {type:[String]},
    normalRange:  {type:String},
    unit:  {type:String},
  };

const DiagnosticReportSchema = new mongoose.Schema({
    userId: {type:String,required:true},
    userName: {type:String,required:true},
    email: {type:String,required:true},
    gender: {type:String,required:true},
    dob: {type: Date,
        default: Date.now},
    doctorName: {type:String},
    reportId: {type:String},
    reportUrl: {type:String},
    reportDate: {type: Date,required:true},
    status: {type: String,default :"parsing"},
    testName: {type:String},
    isManualReport: {type:Boolean},
    parsedData:{type:[ReportParamsType]},
    createdAt:{type: Date},
    updatedAt: {type: Date}
})

module.exports = connectToDiagnosticDatabase().model('reports', DiagnosticReportSchema)