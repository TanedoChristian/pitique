const express = require("express");
const router = express.Router();

const SubscriptionModel = require("../model/subscriptionModel");

const notifModel = new SubscriptionModel();

// POST /subscriptions - Create a new subscription
router.post("/", async (req, res) => {
  const subscriptionInfo = req.body;

  try {
    await notifModel.createSubscription(newNotif.book_id, newNotif.message);
    res.status(201).json({ message: "Package created successfully" });
  } catch (error) {
    console.error("Error creating Package:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Get pitiquer subscription info
router.get("/pitiquers/:id", async (req, res) => {
  const pitiquerId = req.params.id;

  try {
    const notif = await notifModel.getRealtorNotification(pitiquerId);
    res.status(200).json(notif);
  } catch (error) {
    console.error("Error creating getting subscription info:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
