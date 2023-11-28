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

const base64EncodeImage = (buffer) => {
  return buffer.toString("base64");
};

module.exports = router;
