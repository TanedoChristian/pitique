const express = require("express");
const router = express.Router();

const AdminModel = require("../model/adminModel");

const adminModel = new AdminModel();

// POST /admins - Create a new admin
router.post("/", async (req, res) => {
  const newAdmin = req.body;

  try {
    await adminModel.createAdmin(newAdmin);
    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    console.error("Error creating Admin:", error);
    res.status(500).send("Internal Server Error");
  }
});

// POST /admins/login - logging in a admin
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const authResult = await adminModel.authenticate(email, password);

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
    console.error("Error during logging in admin:", error);
    res.status(500).send("Internal Server Error");
  }
});

// GET /admins/users
router.get("/users", async (req, res) => {
  try {
    const users = await adminModel.getUserStatistic();

    if (!users) {
      res.status(404).send("users not found");
    } else {
      res.json(users);
    }
  } catch (error) {
    console.error(`Error getting users`, error);
    res.status(500).send("Internal Server Error");
  }
});

// GET /admins/top-pitiquers
router.get("/top-pitiquers", async (req, res) => {
  try {
    const users = await adminModel.getTopPitiquers();

    if (!users) {
      res.status(404).send("users not found");
    } else {
      res.json(users);
    }
  } catch (error) {
    console.error(`Error getting users`, error);
    res.status(500).send("Internal Server Error");
  }
});

// GET /admins/top-pitiquers
router.get("/revenue", async (req, res) => {
  try {
    const revenue = await adminModel.getRevenue();

    if (!revenue) {
      res.status(404).send("revenue not found");
    } else {
      res.json(revenue);
    }
  } catch (error) {
    console.error(`Error getting revenue`, error);
    res.status(500).send("Internal Server Error");
  }
});

// GET /admins/top-pitiquers
router.get("/revenue/all", async (req, res) => {
  try {
    const revenue = await adminModel.getRevenueTotal();

    if (!revenue) {
      res.status(404).send("revenue not found");
    } else {
      res.json(revenue);
    }
  } catch (error) {
    console.error(`Error getting revenue`, error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/bookings/all", async (req, res) => {
  try {
    const stats = await adminModel.getReportComplete();
    res.status(200).json(stats);
  } catch (error) {
    console.error("Error ", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/realtor/reviews", async (req, res) => {
  try {
    const stats = await adminModel.getRealtorReviews();
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
