const express = require("express");
const router = express.Router();

const PitiquerFeedbackModel = require("../model/pitiquerFeedbackModel");

const pitiquerFeedbackModel = new PitiquerFeedbackModel();

// GET /pitiquer-feedbacks/:rid/booking/:bid - Get a specific pitiquer by ID
router.get("/:pid/booking/:bid", async (req, res) => {
  const pitiquerId = req.params.pid;
  const bookingId = req.params.bid;

  try {
    const pitiquer = await pitiquerFeedbackModel.getPitiquerFeedbackById(
      pitiquerId,
      bookingId
    );

    if (!pitiquer) {
      res.status(404).send("pitiquer feedback is not found");
    } else {
      res.json(pitiquer);
    }
  } catch (error) {
    console.error(
      `Error getting pitiquer feedback with ID ${pitiquerId}:`,
      error
    );
    res.status(500).send("Internal Server Error");
  }
});

// POST /pitiquer-feedbacks - Create a new pitiquer feedback
router.post("/", async (req, res) => {
  const newPitiquerFeedbackModel = req.body;

  try {
    const exist = await pitiquerFeedbackModel.getPitiquerFeedbackById(
      newPitiquerFeedbackModel.ptqr_id,
      newPitiquerFeedbackModel.book_id
    );

    if (exist) res.status(403).json({ message: "Feedback already exist" });
    else {
      await pitiquerFeedbackModel.createPitiquerFeedback(
        newPitiquerFeedbackModel
      );
      res
        .status(201)
        .json({ message: "pitiquer Feedback created successfully" });
    }
  } catch (error) {
    console.error("Error creating pitiquer Feedback:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
