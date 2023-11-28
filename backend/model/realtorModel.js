const createPromisePool = require("../helper/mysqlPromise");
const bcrypt = require("bcrypt");

class RealtorModel {
  constructor() {
    this.pool = createPromisePool();
  }

  //   GET REALTOR
  async getRealtors() {
    const [rows] = await this.pool.query(
      "SELECT id,fname,mname,lname,email,phone,status FROM realtor"
    );
    return rows;
  }

  //   GET REALTOR
  async getRealtorByEmail(email) {
    const [rows] = await this.pool.query(
      "SELECT * FROM realtor WHERE email = ?",
      [email]
    );
    return rows[0];
  }

  // Add to favorite
  async addFavoritePitiquer(pitiquerId, realtorId) {
    await this.pool.query(
      "INSERT INTO favorite (rltr_id, ptqr_id) VALUES (?,?)",
      [realtorId, pitiquerId]
    );
  }

  // GET to favorite
  async getFavorite(pitiquerId, realtorId) {
    const [rows] = await this.pool.query(
      "SELECT * FROM favorite WHERE rltr_id = ? AND ptqr_id = ?",
      [realtorId, pitiquerId]
    );

    return rows[0];
  }

  // Delete to favorite
  async deleteFavorite(pitiquerId, realtorId) {
    await this.pool.query(
      "DELETE FROM favorite WHERE rltr_id = ? AND ptqr_id = ?",
      [realtorId, pitiquerId]
    );
  }

  // ENDD OF FAVORITE
  //   GET REALTOR
  async getRealtorById(realtorId) {
    const [rows] = await this.pool.query("SELECT * FROM realtor WHERE id = ?", [
      realtorId,
    ]);
    return rows[0];
  }

  // LOGIN
  async authenticate(email, password) {
    const realtor = await this.getRealtorByEmail(email);

    if (!realtor) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, realtor.pass);

    return isPasswordValid ? realtor : null;
  }

  // CDU
  async createRealtor(realtor) {
    const hashedPassword = await bcrypt.hash(realtor.password, 10);
    // Default Value
    const status = "active";

    await this.pool.query(
      "INSERT INTO realtor (fname, mname,lname,email,pass,birthdate, status,phone) VALUES (?, ?, ? ,? ,? ,?, ?,?)",
      [
        realtor.firstname,
        realtor.middlename,
        realtor.lastname,
        realtor.email,
        hashedPassword,
        realtor.birthday,
        status,
        realtor.phone,
      ]
    );
  }

  async updateRealtor(realtorId, updatedInfo) {
    await this.pool.query(
      "UPDATE realtor SET fname = ?,mname = ?,lname = ?,email = ?,pass = ?,phone = ?,birthdate = ?,prof_img = ?,id_type = ?,id_img = ? WHERE id = ?",
      [
        updatedInfo.firstName,
        updatedInfo.middleName,
        updatedInfo.lastName,
        updatedInfo.email,
        updatedInfo.password,
        updatedInfo.phone,
        updatedInfo.birthdate,
        updatedInfo.prof_img,
        updatedInfo.id_type,
        updatedInfo.id_img,
        realtorId,
      ]
    );
  }

  async updatePicture(updatedInfo) {
    await this.pool.query("UPDATE realtor SET prof_img = ? WHERE id = ?", [
      updatedInfo.prof_img,
      updatedInfo.rltr_id,
    ]);
  }

  async updateName(updatedInfo) {
    await this.pool.query(
      "UPDATE realtor SET fname = ?,mname = ?,lname = ?,birthdate = ? WHERE id = ?",
      [
        updatedInfo.fname,
        updatedInfo.mname,
        updatedInfo.lname,
        updatedInfo.birthdate,
        updatedInfo.rltr_id,
      ]
    );
  }

  async updateStatus(user) {
    await this.pool.query("UPDATE realtor SET status = ?  WHERE id = ?", [
      user.status,
      user.rltr_id,
    ]);
  }

  //TODO: Not yet finish
  //Note: Dont use ID this is not secure. Change this.
  async deleteRealtorById(realtorId) {
    await this.pool.query("DELETE FROM realtor WHERE id = ?", [realtorId]);
  }
}

module.exports = RealtorModel;
