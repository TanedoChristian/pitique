const express = require("express");
const router = express.Router();

const PitiquerModel = require("../model/pitiquerModel");

const pitiquerModel = new PitiquerModel();

// GET /pitiquers/:id - Get a specific realtor by ID
router.get("/:id", async (req, res) => {
  const pitiquerId = req.params.id;

  try {
    const pitiquer = await pitiquerModel.getPitiquerById(pitiquerId);

    if (!pitiquer) {
      res.status(404).send("pitiquer not found");
    } else {
      res.json(pitiquer);
    }
  } catch (error) {
    console.error(`Error getting pitiquer with ID ${pitiquerId}:`, error);
    res.status(500).send("Internal Server Error");
  }
});

// GET /pitiquers/:email - Get a specific realtor by email
router.get("/email/:email", async (req, res) => {
  const pitiquerEmail = req.params.email;

  try {
    const pitiquer = await pitiquerModel.getPitiquerByEmail(pitiquerEmail);

    if (!pitiquer) {
      res.status(404).send("pitiquer not found");
    } else {
      res.json(pitiquer);
    }
  } catch (error) {
    console.error(`Error getting pitiquer with email ${pitiquerEmail}:`, error);
    res.status(500).send("Internal Server Error");
  }
});

// POST /pitiquers - Create a new pitiquer
router.post("/", async (req, res) => {
  const newPitiquer = req.body;

  try {
    await pitiquerModel.createPitiquer(newPitiquer);
    res.status(201).json({ message: "Pitiquer created successfully" });
  } catch (error) {
    console.error("Error creating Pitiquer:", error);
    res.status(500).send("Internal Server Error");
  }
});

// POST /pitiquers - logging in a pitiquer
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const authResult = await pitiquerModel.authenticate(email, password);

    if (authResult) {
      res.json({
        message: "Login successful",
        user: authResult,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error during logging in pitiquqer:", error);
    res.status(500).send("Internal Server Error");
  }
});

// PUT /pitiquers/:id - Update a pitiquer by ID
router.put("/:id", async (req, res) => {
  const pitiquerId = req.params.id;
  const updatePitiquer = req.body;

  try {
    const existingPitiquer = await pitiquerModel.getPitiquerById(pitiquerId);

    if (!existingPitiquer) {
      res.status(404).send("Pitiquer not found");
      return;
    }

    await pitiquerModel.updatePitiquer(pitiquerId, updatePitiquer);
    res.json({ message: "Pitiquer updated successfully" });
  } catch (error) {
    console.error(`Error updating Pitiquer with ID ${pitiquerId}:`, error);
    res.status(500).send("Internal Server Error");
  }
});

// DELETE /pitiquers/:id - Delete a pitiquer by ID
router.delete("/:id", async (req, res) => {
  const pitiquerId = req.params.id;

  try {
    await pitiquerModel.deletePitiquerById(pitiquerId);
    res.send(`Pitiquer with ID ${pitiquerId} deleted successfully`);
  } catch (error) {
    console.error(`Error deleting Pitiquer with ID ${pitiquerId}:`, error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
