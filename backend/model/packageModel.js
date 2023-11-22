const createPromisePool = require("../helper/mysqlPromise");

class PackageModel {
  constructor() {
    this.pool = createPromisePool();
  }

  //   GET Package

  async getPackageById(packageId) {
    const [rows] = await this.pool.query("SELECT * FROM package WHERE id = ?", [
      packageId,
    ]);
    return rows[0];
  }

  // CDU
  async createPackage(packages) {
    // Default Value
    const visibility = true;

    await this.pool.query(
      "INSERT INTO package (ptqr_id,hasphoto,hasvid,hasamnty,min_price,pkg_desc,isavailable,isvisible) VALUES (?, ?, ? ,? ,? ,?, ?, ?)",
      [
        packages.pitiquerId,
        packages.hasPhoto,
        packages.hasVid,
        packages.hasAmnty,
        packages.minPrice,
        packages.pckgDesc,
        packages.isAvailable,
        visibility,
      ]
    );
  }

  async updatePackage(packageId, updatedInfo) {
    await this.pool.query(
      "UPDATE package SET hasphoto = ?, hasvid = ?, hasamnty = ?, min_price = ?, pkg_desc = ?, isavailable = ? WHERE id = ?",
      [
        updatedInfo.hasPhoto,
        updatedInfo.hasVid,
        updatedInfo.hasAmnty,
        updatedInfo.minPrice,
        updatedInfo.pkgDesc,
        updatedInfo.isAvailable,
        packageId,
      ]
    );
  }

  //Remove
  async removePackageById(packageId, pitiquerId, visibility) {
    await this.pool.query(
      "UPDATE FROM package SET isvisible = ? WHERE id = ? and ptqr_id = ?",
      [visibility, packageId, pitiquerId]
    );
  }
}

module.exports = PackageModel;
