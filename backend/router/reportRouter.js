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
router.get("/pitiquers/:id", async (req, res) => {
  const pitiquerId = req.params.id;

  try {
    const notif = await reportModel.getSubscriptionDetails(pitiquerId);
    res.status(200).json(notif[0]);
  } catch (error) {
    console.error("Error creating getting subscription info:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
