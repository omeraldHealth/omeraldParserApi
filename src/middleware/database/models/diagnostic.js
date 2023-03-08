const mongoose = require('mongoose');
const connectToDiagnosticDatabase = require('../connections/diagnostic');

const BrandDetailsForm = {
    brandLogo: String,
    facebookUrl: String,
    instaUrl: String
};

const IManagerDetails = {
    managerName: String,
    managerRole: String,
    managerContact: String
};

const ActivityDetails = {
    activity: String,
    user: IManagerDetails,
    updatedTime: {type: Date,default: Date.now},
};

const BranchDetail = {
    branchName: String,
    branchEmail: String,
    branchAddress: String,
    branchContact: String,
    branchManager: IManagerDetails,
}

const IPathologistDetails = {
    name: String,
    designation: String,
    signature: String
}

const ReportParamsType = { keyword: {type:String},
    aliases:  {type:[String]},
    minRange:  {type:String},
    maxRange:  {type:String},
    unit:  {type:String},
};

const ReportType = {
  sampleName: {type:String,required:true},
  testName: {type:String,required:true},
  keywords: [ReportParamsType]
}

const DiagnosticUserSchema = new mongoose.Schema({
    diagnosticName: {type:String,required:true},
    fullName: {type:String},
    tests: {type:[ReportType]},
    phoneNumber: {type:String,required:true,unique:true},
    branch: {type:String},
    email: {type:String,required:true},
    sharedReport: {type:[String]},
    address: {type:String},
    reports: {type:[String]},
    updatedAt: {type: Date,default: Date.now},
    brandDetails: [BrandDetailsForm],
    managersDetail: [IManagerDetails],
    activities: [ActivityDetails],
    branchDetails: [BranchDetail],
    pathologistDetail: [IPathologistDetails],
});

module.exports = connectToDiagnosticDatabase().model('diagnosticusers', DiagnosticUserSchema);