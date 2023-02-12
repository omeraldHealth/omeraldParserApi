const mongoose = require('mongoose');

const BrandDetailsForm = {
    brandLogo: String,
    facebookUrl: String,
    instaUrl: String
};

const IManagerDetails = {
    managerName: String,
    managerRole: String,
    managerSignature: String
};

const ActivityDetails = {
    activity: String,
    updatedTime: {type: Date,
        default: Date.now},
};

const ReportParamsType = {
    keyword: {type:String},
    aliases:  {type:[String]},
    normalRange:  {type:String},
    unit:  {type:String},
  };

const ReportType = {
  testName: {type:String,required:true},
  keywords: [ReportParamsType]
}

const DiagnosticUserSchema = new mongoose.Schema({
    diagnosticName: {type:String,required:true},
    fullName: {type:String,required:true},
    tests: {type:[ReportType]},
    phoneNumber: {type:String,required:true},
    branch: {type:String,required:true},
    email: {type:String,required:true},
    sharedReport: {type:[String]},
    address: {type:String},
    reports: {type:[String]},
    updatedAt: {type: Date,
        default: Date.now},
    brandDetails: [BrandDetailsForm],
    managersDetail: [IManagerDetails],
    activities: [ActivityDetails]
});

module.exports = mongoose.model('diagnosticusers', DiagnosticUserSchema);