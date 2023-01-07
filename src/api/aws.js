const fs = require('fs')
const AWS = require('aws-sdk');
const { Router } = require('express');
const awsRouter = Router()
require('dotenv').config()

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET
});

awsRouter.post("/uploadFile",(req,res)=>{
    fs.readFile(req.body.filePath, (err, data) => {
        if (err) throw err;
        const params = {
            Bucket: process.env.AWS_BUCKET, // pass your bucket name
            Key: req.body.fileName, // file will be saved as testBucket/contacts.csv
            Body: JSON.stringify(data, null, 2)
        };
        s3.upload(params, function(s3Err, data) {
            if (s3Err) throw s3Err
            console.log(`File uploaded successfully at ${data.Location}`)
            res.status(200).send(data)
        });
});
})

module.exports = awsRouter