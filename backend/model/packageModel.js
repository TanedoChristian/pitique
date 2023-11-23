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

  async getPackageByPitiquerId(pitiquerId) {
    const [rows] = await this.pool.query(
      "SELECT * FROM package WHERE ptqr_id = ?",
      [pitiquerId]
    );
    return rows;
  }

  // CDU
  async createPackage(packages) {
    await this.pool.query(
      "INSERT INTO package (ptqr_id,hasphoto,hasvid,hasamnty,min_price,pkg_desc,isavailable,isvisible) VALUES (?, ?, ? ,? ,? ,?, ?, ?)",
      [
        packages.ptqr_id,
        packages.hasphoto,
        packages.hasvid,
        packages.hasamnty,
        packages.min_price,
        packages.pkg_desc,
        packages.isavailable,
        packages.isvisible,
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
