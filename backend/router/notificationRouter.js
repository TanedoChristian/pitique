const express = require("express");
const router = express.Router();

const NotificationModel = require("../model/notificationModel");

const notifModel = new NotificationModel();

// POST /packages - Create a new package
router.post("/", async (req, res) => {
  const newNotif = req.body;

  try {
    await notifModel.createNotification(newNotif.book_id, newNotif.message);
    res.status(201).json({ message: "Package created successfully" });
  } catch (error) {
    console.error("Error creating Package:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Get realtors notification
router.get("/realtor/:id", async (req, res) => {
  const realtorId = req.params.id;

  try {
    const notif = await notifModel.getRealtorNotification(realtorId);
    res.status(200).json(notif);
  } catch (error) {
    console.error("Error creating Package:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Get realtors notification
router.get("/pitiquer/:id", async (req, res) => {
  const pitiquerId = req.params.id;

  try {
    const notif = await notifModel.getPitiquerNotification(pitiquerId);
    res.status(200).json(notif);
  } catch (error) {
    console.error("Error creating Package:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
