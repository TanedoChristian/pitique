const createPromisePool = require("../helper/mysqlPromise");
const bcrypt = require("bcrypt");

class RealtorModel {
  constructor() {
    this.pool = createPromisePool();
  }

  //   GET REALTOR
  async getRealtorByEmail(email) {
    const [rows] = await this.pool.query(
      "SELECT * FROM realtor WHERE email = ?",
      [email]
    );
    return rows[0];
  }

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

    await this.pool.query(
      "INSERT INTO realtor (fname, mname,lname,email,pass,birthdate) VALUES (?, ?, ? ,? ,? ,?)",
      [
        realtor.firstName,
        realtor.middleName,
        realtor.lastName,
        realtor.email,
        hashedPassword,
        realtor.birthdate,
      ]
    );
  }

  //   TODO:No Update Yet

  //TODO: Not yet finish
  //Note: Dont use ID this is not secure. Change this.
  async deleteRealtorById(realtorId) {
    await this.pool.query("DELETE FROM realtor WHERE id = ?", [realtorId]);
  }
}

module.exports = RealtorModel;
