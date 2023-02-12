const mongoose = require('mongoose');
const connectToOmeraldDatabase = require('../connections/omerald');

const ReportParamsType = {
    keyword: {type:String},
    aliases:  {type:[String]},
    normalRange:  {type:String},
    unit:  {type:String},
  };

const ReportTypeSchema = new mongoose.Schema({
  testName: {type:String,required:true},
  keywords: [ReportParamsType]
});

module.exports = connectToOmeraldDatabase().model('tests', ReportTypeSchema);