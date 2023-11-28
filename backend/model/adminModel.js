const createPromisePool = require("../helper/mysqlPromise");
const bcrypt = require("bcrypt");

class AdminModel {
  constructor() {
    this.pool = createPromisePool();
  }

  // CDU
  async createAdmin(admin) {
    const hashedPassword = await bcrypt.hash(admin.password, 10);
    // Default Value
    const status = "active";

    await this.pool.query(
      "INSERT INTO admin (fname, mname,lname,email,pass, status,phone) VALUES (?, ?, ? ,? ,? ,?,?)",
      [
        admin.fname,
        admin.mname,
        admin.lname,
        admin.email,
        hashedPassword,
        status,
        admin.phone,
      ]
    );
  }
}

module.exports = AdminModel;
