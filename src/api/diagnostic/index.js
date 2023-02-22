const multer = require("multer");
const aws = require("aws-sdk");
const {Router} = require('express');
const diagnosticRouter = Router()
const DiagnosticUserSchema = require("../../middleware/database/models/diagnostic");
const QuerySchema = require("../../middleware/database/models/queries")
const reportRouter = require("./reports");
const express = require("express");
const nodemailer = require('nodemailer')

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

const diagnosticUser = DiagnosticUserSchema;
const diagnosticQuery = QuerySchema;

diagnosticRouter.post("/uploadBranding", upload.single("file"), (req, res) => {
  // get file from the request
  const file = req.file;
  // create a unique filename for the file in S3
  const s3FileName = `${Date.now()}-${file.originalname}`;
  
  // set up S3 upload parameters
  const params = {
    Bucket: process.env.AWS_BUCKET_Diagnostic_Brand,
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

diagnosticRouter.post("/uploadReport", upload.single("file"), (req, res) => {
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

diagnosticRouter.get("/getDiagnosticUser", (req, res) => {
  const {userId} = req.query;
  diagnosticUser.findOne({"phoneNumber":'+'+userId.replace(" ","")})
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
})

diagnosticRouter.post("/saveDiagnosticUser", (req, res) => {
  const diagnosticUserObject = req.body;

  diagnosticUser.insertMany(diagnosticUserObject)
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
})

diagnosticRouter.post("/updateDiagnosticUser", (req, res) => {
  const diagnosticUserObject = req.body;
  const {userId} = req.query
  diagnosticUser.updateOne({"phoneNumber":'+'+userId.replace(" ","")},diagnosticUserObject)
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
})

diagnosticRouter.post("/createQuery", (req, res) => {
  const { name, email, phoneNumber, subject, message } = req.body;
  console.log(req.body)
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'saifmohammed.campk12@gmail.com',
      pass: 'ipozhvblhgjqvjou',
    },
  });

  // send mail with defined transport object
  let mailOptions = {
    from: email,
    to: 'saifmohammed888@gmail.com',
    subject: subject,
    text: `${message}\n\nFrom: ${name} <${email}>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send('Something went wrong. Please try again later.');
    } else {
      diagnosticQuery.insertMany(req.body)
      .then(items => console.log("Query inserted to db"))
      .catch(err => console.log('Error: ' + err));
      console.log('Email sent: ' + info.response);
      res.status(200).send('Thank you for your message. We will get back to you soon!');
    }
  });
})

diagnosticRouter.get("/getQuery", (req, res) => {
  const {userId} = req.query;
  console.log(userId)
  diagnosticQuery.find({"phoneNumber":"+"+userId.replace(" ",'')})
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
    {}
})

module.exports = diagnosticRouter