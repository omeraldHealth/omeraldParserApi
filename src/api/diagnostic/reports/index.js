const express = require("express");
const multer = require("multer");
const aws = require("aws-sdk");
const {Router} = require('express')
const reportRouter = Router()
const ReportTypeSchema = require('../../../middleware/database/models/reportType')
const DiagnosticReportSchema = require("../../../middleware/database/models/reports");
const { json } = require("body-parser");
// Authentication to be still added
// configure the AWS SDK
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

// create an S3 instance
const s3 = new aws.S3();

// set up multer for file handling
const upload = multer();

const app = express();

reportRouter.post("/insertDiagnosticReport", (req, res) => {
  const diagnosticReportObject = req.body;
  const diagnosticReport = DiagnosticReportSchema;
  diagnosticReport.insertMany(diagnosticReportObject)
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
});

reportRouter.get("/getDiagnosticReports",(req, res) => {
  const diagnosticReport = DiagnosticReportSchema;
  const {reportId} = req.query
  diagnosticReport.find({ _id: {$in: JSON.parse(reportId)} })
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
});

reportRouter.post("/uploadReportFile", upload.single("file"), (req, res) => {
  // get file from the request
  const file = req.file;

  // create a unique filename for the file in S3
  const s3FileName = `${Date.now()}-${file.originalname}`;
  
  // set up S3 upload parameters
  const params = {
    Bucket: process.env.AWS_BUCKET_Omerald_Reports,
    Key: s3FileName,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read"
  };
  
  // upload the file to S3
  s3.upload(params, (error, data) => {
    if (error) {
      return res.status(500).send(error);
    }
    
    // return the URL of the file in S3
    return res.status(200).send({ location: data.Location });
  });
});

module.exports = reportRouter