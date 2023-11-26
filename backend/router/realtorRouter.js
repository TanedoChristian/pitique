const express = require("express");
const router = express.Router();

const RealtorModel = require("../model/realtorModel");

const realtorModel = new RealtorModel();

// GET /realtors/:id - Get a specific realtor by ID
router.get("/:id", async (req, res) => {
  const realtorId = req.params.id;

  try {
    const realtor = await realtorModel.getRealtorById(realtorId);

    if (!realtor) {
      res.status(404).send("realtor not found");
    } else {
      res.json(realtor);
    }
  } catch (error) {
    console.error(`Error getting realtor with ID ${realtorId}:`, error);
    res.status(500).send("Internal Server Error");
  }
});

// GET /realtors/:email - Get a specific realtor by email
router.get("/email/:email", async (req, res) => {
  const realtorEmail = req.params.email;

  try {
    const realtor = await realtorModel.getRealtorByEmail(realtorEmail);

    if (!realtor) {
      res.status(404).send("realtor not found");
    } else {
      res.json(realtor);
    }
  } catch (error) {
    console.error(`Error getting realtor with email ${realtorEmail}:`, error);
    res.status(500).send("Internal Server Error");
  }
});

// POST /realtors - Create a new realtor
router.post("/", async (req, res) => {
  const newRealtor = req.body;

  try {
    const exist = await realtorModel.getRealtorByEmail(newRealtor.email);
    if (exist) res.status(403).json({ message: "Account already exist" });
    else {
      await realtorModel.createRealtor(newRealtor);
      res.status(201).json({ message: "Realtor created successfully" });
    }
  } catch (error) {
    console.error("Error creating realtor:", error);
    res.status(500).send("Internal Server Error");
  }
});

// POST /realtors - logging in a realtor
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const authResult = await realtorModel.authenticate(email, password);

    if (authResult) {
      res.json({
        message: "Login successful",
        user: authResult,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error during logging in realtor:", error);
    res.status(500).send("Internal Server Error");
  }
});

// PUT /realtors/:id - Update a realtor by ID
router.put("/:id", async (req, res) => {
  const realtorId = req.params.id;
  const updateRealtor = req.body;

  try {
    const existingRealtor = await realtorModel.getRealtorById(realtorId);

    if (!existingRealtor) {
      res.status(404).send("Realtor not found");
      return;
    }

    await realtorModel.updateRealtor(realtorId, updateRealtor);
    res.json({ message: "Realtor updated successfully" });
  } catch (error) {
    console.error(`Error updating Realtor with ID ${realtorId}:`, error);
    res.status(500).send("Internal Server Error");
  }
});

// DELETE /realtors/:id - Delete a realtor by ID
router.delete("/:id", async (req, res) => {
  const realtorsId = req.params.id;

  try {
    await realtorModel.deleteRealtorById(realtorsId);
    res.send(`Realtor with ID ${realtorsId} deleted successfully`);
  } catch (error) {
    console.error(`Error deleting realtor with ID ${realtorsId}:`, error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
