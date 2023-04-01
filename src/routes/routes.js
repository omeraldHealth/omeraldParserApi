const express = require("express");
const adminRouter = require("../api/admin");
const diagnosticRouter = require("../api/diagnostic");
const reportRouter = require("../api/diagnostic/reports");
const omeraldRouter = require("../api/omerald/reports");
const employeeRouter = require("../api/diagnostic/employee");
const router = express.Router();

router.use("/diagnostic",diagnosticRouter)
router.use("/reports",reportRouter)
router.use("/employee",employeeRouter)
router.use("/omerald",omeraldRouter)
router.use("/admin",adminRouter)
router.get("/health",(req,res)=>{res.send("Server is up")})

module.exports = router