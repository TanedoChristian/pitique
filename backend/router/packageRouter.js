const express = require("express");
const router = express.Router();

const PackageModel = require("../model/packageModel");

const packageModel = new PackageModel();

// GET /packages/:id - Get a specific package by ID
router.get("/:id", async (req, res) => {
  const packageId = req.params.id;

  try {
    const package = await packageModel.getPackageById(packageId);

    if (!package) {
      res.status(404).send("package not found");
    } else {
      res.json(package);
    }
  } catch (error) {
    console.error(`Error getting package with ID ${packageId}:`, error);
    res.status(500).send("Internal Server Error");
  }
});

// POST /packages - Create a new package
router.post("/", async (req, res) => {
  const newPackage = req.body;

  try {
    await packageModel.createPackage(newPackage);
    res.status(201).json({ message: "Package created successfully" });
  } catch (error) {
    console.error("Error creating Package:", error);
    res.status(500).send("Internal Server Error");
  }
});

// PUT /packages/:id - Update a package by ID
router.put("/:id", async (req, res) => {
  const packageId = req.params.id;
  const updatePackage = req.body;

  try {
    const existingPackage = await packageModel.getPackageById(packageId);

    if (!existingPackage) {
      res.status(404).send("Package not found");
      return;
    }

    await packageModel.updatePackage(packageId, updatePackage);
    res.json({ message: "Package updated successfully" });
  } catch (error) {
    console.error(`Error updating Package with ID ${packageId}:`, error);
    res.status(500).send("Internal Server Error");
  }
});

// DELETE /packages/:id - Delete a package by ID
router.put("/:id", async (req, res) => {
  const packagesId = req.params.id;
  const { pitiquerId, visibility } = req.body;

  try {
    await packageModel.removePackageById(packagesId, pitiquerId, visibility);
    res.send(`Realtor with ID ${packagesId} remove successfully`);
  } catch (error) {
    console.error(`Error removing package with ID ${packagesId}:`, error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;