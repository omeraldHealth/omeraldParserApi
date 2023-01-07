require('dotenv').config()
const docparser = require('docparser-node')
const client =  new docparser.Client(process.env.DOC_PARSER_KEY)

const {verifyAuth } = require('../middleware/auth/verifyAuth')
const {Router} = require('express')
const parserRouter = Router()

//pinging parser
parserRouter.get("/health",verifyAuth,(req,res)=>{
    client.ping()
    .then(function() {
        res.status(200).send("Parser up and connected")
    })
    .catch(function(err) {
        res.status(401).send(err)
    })
})

parserRouter.get("/getAllParsers",verifyAuth,(req,res)=>{
    client.getParsers()
    .then(function(data) {
        res.status(200).send(data)
    })
    .catch(function(err) {
        res.status(401).send(err)
    })
})

module.exports = parserRouter