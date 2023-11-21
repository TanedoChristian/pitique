const express = require("express");
const router = express.Router();

const RealtorModel = require("../model/realtorModel");

const realtorModel = new RealtorModel();

router.get("/", async (req, res) => {
  try {
    const realtors = await realtorModel.getRealtors();
    res.json(realtors);
  } catch (error) {
    console.error("Error getting realtors:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
