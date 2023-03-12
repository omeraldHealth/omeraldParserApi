const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require("./routes/routes")
const token = require("./middleware/token/generateToken")
const multer = require('multer');
const connectToDiagnosticDatabase = require('./middleware/database/connections/diagnostic')
const connectToOmeraldDatabase = require('./middleware/database/connections/omerald')
const form = multer();
require('dotenv').config()

// Define App
const app = express()

// configure the app
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    "Access-Control-Allow-Origin":"*",
    "credentials":true,}
));
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
app.use("/api",router)


connectToOmeraldDatabase().once('open', () => {
    console.log('MongoDB omerald database connection established successfully!');
});

connectToDiagnosticDatabase().once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

//create your first api
app.use("/token",token)

//start server
app.listen(process.env.SERVER_PORT,()=>{console.log(`Omerald Doc server is live on ${process.env.SERVER_PORT}...`)})