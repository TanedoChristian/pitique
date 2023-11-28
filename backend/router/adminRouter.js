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
module.exports = router;
