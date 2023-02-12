const {Router} = require('express');
const omeraldReportRouter = Router()
const ReportTypeSchema = require("../../middleware/database/models/reportType")

// Wont be used by diagnostic center
omeraldReportRouter.get("/getReportTypes",(req, res) => {
    const reportType = ReportTypeSchema;
    reportType.find()
      .then(items => res.json(items))
      .catch(err => res.status(400).json('Error: ' + err));
});

omeraldReportRouter.post("/setReportTypes", (req, res) => {
  const reportType = ReportTypeSchema;
  const reportTypeObject = req.body
  reportType.insertMany(reportTypeObject)
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
})


module.exports = omeraldReportRouter