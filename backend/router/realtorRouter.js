const express = require("express");
const router = express.Router();
const multer = require("multer");
const RealtorModel = require("../model/realtorModel");

const realtorModel = new RealtorModel();

// Set up Multer to handle file uploads
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

// GET /realtors - Get all realtors
router.get("/admin/all", async (req, res) => {
  try {
    const realtors = await realtorModel.getRealtors();

    if (!realtors) {
      res.status(404).send("realtors not found");
    } else {
      res.json(realtors);
    }
  } catch (error) {
    console.error(`Error getting realtors`, error);
    res.status(500).send("Internal Server Error");
  }
});

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

// FAVORITE
// POST /realtors/:rid/favorite/:id - favorite a pitiquer
router.post("/:rid/favorite/:id", async (req, res) => {
  const pitiquerId = req.params.id;
  const realtorId = req.params.rid;
  try {
    await realtorModel.addFavoritePitiquer(pitiquerId, realtorId);
    res.status(201).json({ message: "Favorite successfully" });
  } catch (error) {
    console.error("Error creating favorite:", error);
    res.status(500).send("Internal Server Error");
  }
});
// GET /realtors/:rid/favorite/:id - get favorite  pitiquer
router.get("/:rid/favorite/:id", async (req, res) => {
  const pitiquerId = req.params.id;
  const realtorId = req.params.rid;
  try {
    const result = await realtorModel.getFavorite(pitiquerId, realtorId);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating realtor:", error);
    res.status(500).send("Internal Server Error");
  }
});

// GET /realtors/:rid/favorite/:id - get favorite  pitiquer
router.delete("/:rid/favorite/:id", async (req, res) => {
  const pitiquerId = req.params.id;
  const realtorId = req.params.rid;
  try {
    await realtorModel.deleteFavorite(pitiquerId, realtorId);
    res.status(201).json({ message: "get successfully" });
  } catch (error) {
    console.error("Error creating realtor:", error);
    res.status(500).send("Internal Server Error");
  }
});

// END OF FAVORITE

// POST /realtors - logging in a realtor
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const authResult = await realtorModel.authenticate(email, password);

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

// PUT /realtors/edit/picture - edit profile picture and name
router.put("/edit/picture", upload.single("prof_img"), async (req, res) => {
  try {
    const newPortfolio = {
      prof_img: req.file.buffer,
      rltr_id: req.body.rltr_id,
    };
    console.log(newPortfolio);
    await realtorModel.updatePicture(newPortfolio);
    res.status(201).json({
      message: "Updated successfully",
      image: base64EncodeImage(newPortfolio.prof_img),
    });
  } catch (error) {
    console.error("Error Updating:", error);
    res.status(500).send("Internal Server Error");
  }
});

// PUT /realtors/edit/name - edit profile name
router.put("/edit/name", async (req, res) => {
  try {
    const newPortfolio = {
      ...req.body,
    };

    await realtorModel.updateName(newPortfolio);
    res.status(201).json({
      message: "Updated successfully",
    });
  } catch (error) {
    console.error("Error Updating:", error);
    res.status(500).send("Internal Server Error");
  }
});

// PUT /realtors/edit/status - edit profile status
router.put("/edit/status", async (req, res) => {
  try {
    const user = req.body;

    await realtorModel.updateStatus(user);
    res.status(201).json({
      message: "Updated successfully",
    });
  } catch (error) {
    console.error("Error Updating:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/statistics/report/:id", async (req, res) => {
  try {
    const realtorId = req.params.id;

    const stats = await realtorModel.getReportComplete(realtorId);
    res.status(200).json(stats);
  } catch (error) {
    console.error("Error ", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/statistics/report/income/:id", async (req, res) => {
  try {
    const realtorId = req.params.id;

    const stats = await realtorModel.getReportSumIncome(realtorId);
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
