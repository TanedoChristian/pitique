const createPromisePool = require("../helper/mysqlPromise");
const bcrypt = require("bcrypt");

class PitiquerModel {
  constructor() {
    this.pool = createPromisePool();
  }

  //   GET Pitiquer
  async getPitiquerByEmail(email) {
    const [rows] = await this.pool.query(
      "SELECT * FROM pitiquer WHERE email = ?",
      [email]
    );
    return rows[0];
  }

  //TODO: please put here limit for tabulation
  //   GET Pitiquer

  async getPitiquers() {
    const [rows] = await this.pool.query(
      "SELECT p.id, p.lname, p.fname, p.city, p.province, MIN(pa.min_price) as min_price FROM pitiquer p INNER JOIN package pa" +
        " ON p.id = pa.ptqr_id" +
        " GROUP BY p.id"
    );
    return rows;
  }

  async getPitiquerById(pitiquerId) {
    const [rows] = await this.pool.query(
      "SELECT * FROM pitiquer WHERE id = ?",
      [pitiquerId]
    );
    return rows[0];
  }

  // LOGIN
  async authenticate(email, password) {
    const pitiquer = await this.getPitiquerByEmail(email);

    if (!pitiquer) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, pitiquer.pass);

    return isPasswordValid ? pitiquer : null;
  }

  // CDU
  async createPitiquer(pitiquer) {
    const hashedPassword = await bcrypt.hash(pitiquer.password, 10);
    // Default Value
    const status = "active";

    await this.pool.query(
      "INSERT INTO pitiquer (fname,mname,lname,email,pass,phone,city,province,prof_img,bio,isphotog,isvideog,isamnty,status) VALUES (?, ?, ? ,? ,? ,?, ?,?, ?, ? ,? ,? ,?, ?)",
      [
        pitiquer.firstName,
        pitiquer.middleName,
        pitiquer.lastName,
        pitiquer.email,
        hashedPassword,
        pitiquer.phone,
        pitiquer.city,
        pitiquer.province,
        pitiquer.prof_img,
        pitiquer.bio,
        pitiquer.isphotog,
        pitiquer.isvideog,
        pitiquer.isamnty,
        status,
      ]
    );
  }

  async updatePitiquer(pitiquerId, updatedInfo) {
    await this.pool.query(
      "UPDATE pitiquer SET fname = ?,mname = ?,lname = ?,email = ?,pass = ?,phone = ?,city = ?,province = ?, prof_img = ?,bio = ?, isphotog = ?, isvideog = ?, isamnty = ? WHERE id = ?",
      [
        updatedInfo.firstName,
        updatedInfo.middleName,
        updatedInfo.lastName,
        updatedInfo.email,
        updatedInfo.password,
        updatedInfo.phone,
        updatedInfo.city,
        updatedInfo.province,
        updatedInfo.prof_img,
        updatedInfo.bio,
        updatedInfo.isphotog,
        updatedInfo.isvideog,
        updatedInfo.isamnty,
        pitiquerId,
      ]
    );
  }

  //TODO: Not yet finish
  //Note: Dont use ID this is not secure. Change this.
  async deletePitiquerById(pitiquerId) {
    await this.pool.query("DELETE FROM pitiquer WHERE id = ?", [pitiquerId]);
  }
}

module.exports = PitiquerModel;
