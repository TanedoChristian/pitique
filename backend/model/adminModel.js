const createPromisePool = require("../helper/mysqlPromise");
const bcrypt = require("bcrypt");

class AdminModel {
  constructor() {
    this.pool = createPromisePool();
  }

  //   GET REALTOR
  async getAdminByEmail(email) {
    const [rows] = await this.pool.query(
      "SELECT * FROM admin WHERE email = ?",
      [email]
    );
    return rows[0];
  }

  // CDU
  async createAdmin(admin) {
    const hashedPassword = await bcrypt.hash(admin.password, 10);
    // Default Value
    const status = "active";

    await this.pool.query(
      "INSERT INTO admin (fname, mname,lname,email,pass, status,phone,user) VALUES (?,?, ?, ? ,? ,? ,?,?)",
      [
        admin.fname,
        admin.mname,
        admin.lname,
        admin.email,
        hashedPassword,
        status,
        admin.phone,
        admin.email,
      ]
    );
  }

  // LOGIN
  async authenticate(email, password) {
    const admin = await this.getAdminByEmail(email);

    if (!admin) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, admin.pass);

    return isPasswordValid ? admin : null;
  }
}

module.exports = AdminModel;
