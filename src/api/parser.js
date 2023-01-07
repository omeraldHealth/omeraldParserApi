require('dotenv').config()
const docparser = require('docparser-node')
const client =  new docparser.Client(process.env.DOC_PARSER_KEY)

const {verifyAuth } = require('../middleware/auth/verifyAuth')
const {Router} = require('express')
const parserRouter = Router()

parserRouter.get("/health",verifyAuth,(req,res)=>{
    client.ping()
    .then(function() {
        res.status(200).send("Parser up and connected")
    })
    .catch(function(err) {
        res.status(401).send(err)
    })
})

//fetch all parsers from docparser
parserRouter.get("/getAllParsers",verifyAuth,(req,res)=>{
    client.getParsers()
    .then(function(data) {
        res.status(200).send(data)
    })
    .catch(function(err) {
        res.status(401).send(err)
    })
})

//upload file and received parsing id
parserRouter.post("/uploadFileToParse",verifyAuth,(req,res)=>{
    client.uploadFileByPath(req.body.parserId,req.body.filePath,req.body.fileName)
    .then(function(data) {
        res.status(200).send(data)
    })
    .catch(function(err) {
        res.status(401).send(err)
    })
})

//fetch parsed data using parsing id
parserRouter.post("/getParsedData",verifyAuth,(req,res)=>{
    client.getResultsByDocument(req.body.parserId,req.body.documentId,"object")
    .then(function(data) {
        res.status(200).send(data)
    })
    .catch(function(err) {
        res.status(401).send(err)
    })
})

module.exports = parserRouter