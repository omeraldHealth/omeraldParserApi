const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

// Define App
const app = express()

// configure the app
app.use(bodyParser)
app.use(cors)


//create your first api
app.get("/health",(req,res)=>{res.json("message':'alive")})

//start server
app.listen(process.env.SERVER_PORT,()=>{console.log(`Omerald Doc server is live on ${process.env.SERVER_PORT}...`)})