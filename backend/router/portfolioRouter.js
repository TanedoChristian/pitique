const express = require("express");
const router = express.Router();
const multer = require("multer");

const PortfolioModel = require("../model/portfolioModel");

const portfolioModel = new PortfolioModel();

// Set up Multer to handle file uploads
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

// GET /portfolios/:id - Get a specific portfolio by ID
router.get("/:id", async (req, res) => {
  const portfolio = req.params.id;

  try {
    const portfolio = await portfolioModel.getPortfolioById(portfolio);

    if (!portfolio) {
      res.status(404).send("portfolio not found");
    } else {
      res.json(portfolio);
    }
  } catch (error) {
    console.error(`Error getting portfolio with ID ${portfolio}:`, error);
    res.status(500).send("Internal Server Error");
  }
});

// GET /portfolios/pitiquer/:id - Get a specific portfolio by ID
router.get("/pitiquer/:id", async (req, res) => {
  const pitiquerId = req.params.id;

  try {
    const portfolios = await portfolioModel.getPortfolioByPitiquerId(
      pitiquerId
    );

    if (portfolios.length === 0) {
      res.status(404).send("pitiquer portfolio not found");
    } else {
      // Pre-encode the image data before sending it to the client
      const portfoliosWithBase64 = portfolios.map((portfolio) => {
        return {
          ...portfolio,
          img: base64EncodeImage(portfolio.img),
        };
      });

      res.json(portfoliosWithBase64);
    }
  } catch (error) {
    console.error(`Error getting portfolio with ID ${portfolios}:`, error);
    res.status(500).send("Internal Server Error");
  }
});

// POST /portfolios - Create a new portfolio
router.post("/", upload.single("img"), async (req, res) => {
  try {
    const newPortfolio = {
      pitiquerId: req.body.ptqr_id,
      img: req.file.buffer,
    };

    await portfolioModel.createPortfolio(newPortfolio);
    res.status(201).json({ message: "Portfolio created successfully" });
  } catch (error) {
    console.error("Error creating Portfolio:", error);
    res.status(500).send("Internal Server Error");
  }
});

// DELETE /portfolios/:id - Remove a portfolio by ID
router.delete("/:id", async (req, res) => {
  const portfolioId = req.params.id;

  try {
    await portfolioModel.removePortfolioById(portfolioId);
    res
      .status(200)
      .send(`Portfolio with ID ${portfolioId} removed successfully`);
  } catch (error) {
    console.error(`Error removing portfolio with ID ${portfolioId}:`, error);
    res.status(500).send("Internal Server Error");
  }
});

//helpers

const base64EncodeImage = (buffer) => {
  return buffer.toString("base64");
};

module.exports = router;
