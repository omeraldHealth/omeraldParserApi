const express = require("express");
const userRouter = require('../api/user');
const parserRouter = require('../api/parser');
const awsParserRouter = require('../api/aws')
const router = express.Router();
const { verifyAuth } = require("../middleware/auth/verifyAuth");

router.use("/user",userRouter)
router.use("/parser",parserRouter)
router.use("/aws",awsParserRouter)

router.get("/health",verifyAuth,(req,res)=>{res.send("Server is up")})

module.exports = router