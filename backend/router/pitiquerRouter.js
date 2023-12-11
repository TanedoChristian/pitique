const express = require("express");
const router = express.Router();
const multer = require("multer");

const PitiquerModel = require("../model/pitiquerModel");
const SubscriptionModel = require("../model/subscriptionModel");

const pitiquerModel = new PitiquerModel();
const subscriptionModel = new SubscriptionModel();

// Set up Multer to handle file uploads
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

// GET /pitiquers - Get all realtor for dashboard
router.get("/", async (req, res) => {
  try {
    const pitiquer = await pitiquerModel.getPitiquers();

    if (!pitiquer) {
      res.status(404).send("pitiquer not found");
    } else {
      res.json(pitiquer);
    }
  } catch (error) {
    console.error(`Error getting pitiquers`, error);
    res.status(500).send("Internal Server Error");
  }
});

// GET /pitiquers - Get all pitiquers
router.get("/admin/all", async (req, res) => {
  try {
    const pitiquers = await pitiquerModel.getAllPitiquers();

    if (!pitiquers) {
      res.status(404).send("pitiquers not found");
    } else {
      res.json(pitiquers);
    }
  } catch (error) {
    console.error(`Error getting pitiquers`, error);
    res.status(500).send("Internal Server Error");
  }
});

// GET /pitiquers/name/:name - Get all realtor
router.get("/name/:name", async (req, res) => {
  const name = req.params.name;
  try {
    const pitiquers = await pitiquerModel.getPitiquerByName(name);

    if (!pitiquers) {
      res.status(404).send("pitiquer not found");
    } else {
      res.json(pitiquers);
    }
  } catch (error) {
    console.error(`Error getting pitiquers`, error);
    res.status(500).send("Internal Server Error");
  }
});

// GET /pitiquers/:id - Get a specific realtor by ID
router.get("/:id", async (req, res) => {
  const pitiquerId = req.params.id;

  try {
    const pitiquer = await pitiquerModel.getPitiquerById(pitiquerId);
    const finalResult = {
      ...pitiquer,
      prof_img: base64EncodeImage(pitiquer.prof_img),
    };
    if (!pitiquer) {
      res.status(404).send("pitiquer not found");
    } else {
      res.json(finalResult);
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
    const ptqr_id = await pitiquerModel.createPitiquer(newPitiquer);

    // amount
    const amount = 200;
    await subscriptionModel.createSubscription({ ptqr_id, amount });

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
      const finalResult = {
        ...authResult,
        prof_img: base64EncodeImage(authResult.prof_img),
      };

      res.json({
        message: "Login successful",
        user: finalResult,
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

// PUT /pitiquers/edit/picture - edit profile picture
router.put("/edit/picture", upload.single("prof_img"), async (req, res) => {
  try {
    const newPortfolio = {
      pitiquerId: req.body.ptqr_id,
      prof_img: req.file.buffer,
    };

    await pitiquerModel.updatePitiquerPicture(
      newPortfolio.pitiquerId,
      newPortfolio.prof_img
    );
    res.status(201).json({ message: "Updated successfully" });
  } catch (error) {
    console.error("Error Updating:", error);
    res.status(500).send("Internal Server Error");
  }
});

// PUT /pitiquers/edit/status - edit profile status
router.put("/edit/status", async (req, res) => {
  try {
    const user = req.body;

    await pitiquerModel.updateStatus(user);
    res.status(201).json({
      message: "Updated successfully",
    });
  } catch (error) {
    console.error("Error Updating:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/statistics/:id", async (req, res) => {
  try {
    const pitiquerId = req.params.id;

    const stats = await pitiquerModel.getStatistics(pitiquerId);
    res.status(200).json(stats);
  } catch (error) {
    console.error("Error ", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/statistics/ratings/:id", async (req, res) => {
  try {
    const pitiquerId = req.params.id;

    const stats = await pitiquerModel.getStatisticsRating(pitiquerId);
    res.status(200).json(stats);
  } catch (error) {
    console.error("Error ", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/statistics/report/:id", async (req, res) => {
  try {
    const pitiquerId = req.params.id;

    const stats = await pitiquerModel.getReportComplete(pitiquerId);
    res.status(200).json(stats);
  } catch (error) {
    console.error("Error ", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/statistics/report/income/:id", async (req, res) => {
  try {
    const pitiquerId = req.params.id;

    const stats = await pitiquerModel.getReportSumIncome(pitiquerId);
    res.status(200).json(stats);
  } catch (error) {
    console.error("Error ", error);
    res.status(500).send("Internal Server Error");
  }
});

const base64EncodeImage = (buffer) => {
  return buffer.toString("base64");
};

module.exports = router;
