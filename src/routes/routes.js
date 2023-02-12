const express = require("express");
const diagnosticRouter = require("../api/diagnostic");
const reportRouter = require("../api/diagnostic/reports");
const omeraldRouter = require("../api/omerald/reports");
const router = express.Router();

router.use("/diagnostic",diagnosticRouter)
router.use("/diagnostic/reports",reportRouter)
router.use("/omerald",omeraldRouter)
router.get("/health",(req,res)=>{res.send("Server is up")})

module.exports = router