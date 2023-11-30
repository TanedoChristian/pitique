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

  async getPackageByPitiquerIdAndPackageName(pitiquerId, packageName) {
    const [rows] = await this.pool.query(
      "SELECT * FROM package WHERE ptqr_id = ? AND pkg_desc = ?",
      [pitiquerId, packageName]
    );
    return rows[0];
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

  async updatePackagePrice(packageId, updatedInfo) {
    await this.pool.query(
      "UPDATE package SET min_price = ?, isavailable = ?, isvisible = ? WHERE id = ?",
      [
        updatedInfo.min_price,
        updatedInfo.isavailable,
        updatedInfo.isvisible,
        packageId,
      ]
    );
  }

  async updatePackage(packageId, updatedInfo) {
    await this.pool.query(
      "UPDATE package SET hasphoto = ?, hasvid = ?, hasamnty = ?, min_price = ?, pkg_desc = ?, isavailable = ?, isvisible = ? WHERE id = ?",
      [
        updatedInfo.hasphoto,
        updatedInfo.hasvid,
        updatedInfo.hasamnty,
        updatedInfo.min_price,
        updatedInfo.pkg_desc,
        updatedInfo.isavailable,
        updatedInfo.isvisible,
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
