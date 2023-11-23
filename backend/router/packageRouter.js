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

// GET /packages/pitiquer/:id - Get a specific package by ID
router.get("/pitiquer/:id", async (req, res) => {
  const pitiquerId = req.params.id;

  try {
    const packages = await packageModel.getPackageByPitiquerId(pitiquerId);

    if (packages.length === 0) {
      res.status(404).send("pitiquer packages not found");
    } else {
      res.json(packages);
    }
  } catch (error) {
    console.error(`Error getting packages with ID ${pitiquerId}:`, error);
    res.status(500).send("Internal Server Error");
  }
});

// GET /packages/pitiquer/:id - Get a specific package by ID and name
router.get("/pitiquer/:id/package/:name", async (req, res) => {
  const pitiquerId = req.params.id;
  const packageName = req.params.name;

  try {
    const packages = await packageModel.getPackageByPitiquerIdAndPackageName(
      pitiquerId,
      packageName
    );

    if (!packages) {
      res.status(404).send("pitiquer packages not found");
    } else {
      res.json(packages);
    }
  } catch (error) {
    console.error(`Error getting packages with ID ${pitiquerId}:`, error);
    res.status(500).send("Internal Server Error");
  }
});

// POST /packages - Create a new package
router.post("/", async (req, res) => {
  const newPackage = req.body;

  try {
    const packages = await packageModel.getPackageByPitiquerIdAndPackageName(
      newPackage.ptqr_id,
      newPackage.pkg_desc
    );

    if (!packages) {
      await packageModel.createPackage(newPackage);
      res.status(201).json({ message: "Package created successfully" });
    } else {
      await packageModel.updatePackagePrice(newPackage.packageId, newPackage);
      res.status(200).json({ message: "Ok" });
    }
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

// PUT /packages/:id - Remove a package by ID
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
