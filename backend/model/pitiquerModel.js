const createPromisePool = require("../helper/mysqlPromise");
const bcrypt = require("bcrypt");

class PitiquerModel {
  constructor() {
    this.pool = createPromisePool();
  }

  // GET Pitiquer by name (first name or last name)
  async getPitiquerByName(name) {
    const [rows] = await this.pool.query(
      "SELECT p.id, p.lname, p.fname, p.city, p.province, MIN(pa.min_price) as min_price FROM pitiquer p INNER JOIN package pa" +
        " ON p.id = pa.ptqr_id" +
        " WHERE CONCAT(p.fname, ' ', p.lname) LIKE ?" +
        " GROUP BY p.id ",
      [`%${name}%`]
    );

    return rows;
  }

  //   GET Pitiquer for dashboard
  async getPitiquers() {
    const [rows] = await this.pool.query(
      "SELECT p.id, p.lname, p.fname, p.city, p.province, MIN(pa.min_price) as min_price, COALESCE(AVG(rf.rtng), 0) as avg_rating FROM pitiquer p INNER JOIN package pa ON p.id = pa.ptqr_id LEFT JOIN booking b ON b.ptqr_id = p.id LEFT JOIN realtor_feedback rf ON rf.book_id = b.id WHERE pa.isvisible = true GROUP BY p.id "
    );
    return rows;
  }

  //   GET All Pitiquer
  async getAllPitiquers() {
    const [rows] = await this.pool.query(
      "SELECT id,fname,mname,lname,email,phone,status FROM pitiquer"
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

  async getPitiquerByEmail(email) {
    const [rows] = await this.pool.query(
      "SELECT * FROM pitiquer WHERE email = ?",
      [email]
    );
    return rows[0];
  }

  async getPitiquerRating(id) {
    const [rows] = await this.pool.query(
      "SELECT AVG(rf.rtng) FROM booking b INNER JOIN realtor_feedback rf ON rf.book_id = b.id WHERE b.ptqr_id = ?",
      [id]
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
    const hashedPassword = await bcrypt.hash(pitiquer.pass, 10);
    // Default Value
    const status = "active";

    await this.pool.query(
      "INSERT INTO pitiquer (fname, mname,lname,email,pass, status,phone,city,province) VALUES (?, ?,?, ?, ? ,? ,? ,?,?)",
      [
        pitiquer.fname,
        pitiquer.mname,
        pitiquer.lname,
        pitiquer.email,
        hashedPassword,
        status,
        pitiquer.phone,
        pitiquer.city,
        pitiquer.province,
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

  async updatePitiquerPicture(pitiquerId, picture) {
    await this.pool.query("UPDATE pitiquer SET prof_img = ? WHERE id = ?", [
      picture,
      pitiquerId,
    ]);
  }

  async updateStatus(user) {
    await this.pool.query("UPDATE pitiquer SET status = ?  WHERE id = ?", [
      user.status,
      user.ptqr_id,
    ]);
  }

  async getStatistics(pitiquerId) {
    const [rows] = await this.pool.query(
      "SELECT COUNT(*) AS all_booking, COUNT(CASE WHEN status = 'pending' THEN 1 END) AS pending, " +
        "COUNT(CASE WHEN status = 'accepted' THEN 1 END) AS paid,  " +
        "COUNT(CASE WHEN status = 'payment' THEN 1 END) AS accepted,  " +
        "COUNT(CASE WHEN status = 'completed' THEN 1 END) AS completed  " +
        "FROM booking b WHERE ptqr_id = ?;",
      [pitiquerId]
    );

    return rows[0];
  }

  async getStatisticsRating(pitiquerId) {
    const [rows] = await this.pool.query(
      "SELECT AVG(rf.rtng) AS rating, COUNT(rf.rtng) AS total_rating FROM realtor_feedback rf INNER JOIN booking b ON rf.book_id = b.id WHERE b.ptqr_id = ? AND b.status = ?",
      [pitiquerId, "completed"]
    );

    return rows[0];
  }
  async getReportComplete(pitiquerId) {
    const [rows] = await this.pool.query(
      "SELECT b.id,b.total, CONCAT(r.fname, ' ', r.mname, ' ', r.lname) AS name, CONCAT(b.unit_no, ' ', b.street, ' ', b.city, ' ', b.province) AS location, p.pkg_desc, b.status, b.day, b.completed " +
        " FROM booking b INNER JOIN realtor r ON r.id = b.rltr_id INNER JOIN pitiquer pt ON pt.id = b.ptqr_id INNER JOIN package p ON p.ptqr_id = pt.id WHERE pt.id = ? AND b.status = ? GROUP BY b.id",
      [pitiquerId, "completed"]
    );

    return rows;
  }

  async getReportSumIncome(pitiquerId) {
    const [rows] = await this.pool.query(
      "SELECT SUM(b.total) AS total FROM booking b INNER JOIN pitiquer p ON p.id = b.ptqr_id WHERE p.id = ? AND b.status = ?",
      [pitiquerId, "completed"]
    );

    return rows[0];
  }

  //TODO: Not yet finish
  //Note: Dont use ID this is not secure. Change this.
  async deletePitiquerById(pitiquerId) {
    await this.pool.query("DELETE FROM pitiquer WHERE id = ?", [pitiquerId]);
  }
}

module.exports = PitiquerModel;
