const express = require("express");
const router = express.Router();

const ReportModel = require("../model/reportModel");

const reportModel = new ReportModel();

// POST /subscriptions - Create a new subscription
router.post("/", async (req, res) => {
  const { info } = req.body;

  try {
    await reportModel.createReport(info);
    res.status(200).json({ message: "reported successfully" });
  } catch (error) {
    console.error("Error creating Package:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Get pitiquer subscription info
router.get("/", async (req, res) => {
  try {
    const report = await reportModel.getReports();
    res.status(200).json(report);
  } catch (error) {
    console.error("Error ", error);
    res.status(500).send("Internal Server Error");
  }
});

// Get pitiquer subscription info
router.put("/done", async (req, res) => {
  try {
    const { id } = req.body;

    const report = await reportModel.updateStatus(id);
    res.status(200).json(report);
  } catch (error) {
    console.error("Error ", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
