const express = require("express");
const router = express.Router();

const RealtorFeedbackModel = require("../model/realtorFeedbackModel");

const realtorFeedback = new RealtorFeedbackModel();

// GET /realtor-feedbacks/:rid/booking/:bid - Get a specific realtor by ID
router.get("/:rid/booking/:bid", async (req, res) => {
  const realtorId = req.params.rid;
  const bookingId = req.params.bid;

  try {
    const realtor = await realtorFeedback.getRealtorFeedbackById(
      realtorId,
      bookingId
    );

    if (!realtor) {
      res.status(404).send("realtor feedback is not found");
    } else {
      res.json(realtor);
    }
  } catch (error) {
    console.error(
      `Error getting realtor feedback with ID ${realtorId}:`,
      error
    );
    res.status(500).send("Internal Server Error");
  }
});

// POST /realtor-feedbacks - Create a new realtor feedback
router.post("/", async (req, res) => {
  const newRealtorFeedback = req.body;

  try {
    const exist = await realtorFeedback.getRealtorFeedbackById(
      newRealtorFeedback.rltr_id,
      newRealtorFeedback.book_id
    );

    if (exist) res.status(403).json({ message: "Feedback already exist" });
    else {
      await realtorFeedback.createRealtorFeedback(newRealtorFeedback);
      res
        .status(201)
        .json({ message: "Realtor Feedback created successfully" });
    }
  } catch (error) {
    console.error("Error creating realtor Feedback:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
