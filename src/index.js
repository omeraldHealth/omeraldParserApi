const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require("./routes/routes")
const token = require("./middleware/token/generateToken")
require('dotenv').config()


// Define App
const app = express()

// configure the app
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    "Access-Control-Allow-Origin":"*",
    "credentials":true,}
));

app.use("/api",router)

//create your first api
app.use("/token",token)

//start server
app.listen(process.env.SERVER_PORT,()=>{console.log(`Omerald Doc server is live on ${process.env.SERVER_PORT}...`)})