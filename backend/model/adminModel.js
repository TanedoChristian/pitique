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

  async getUserStatistic() {
    const [rows] = await this.pool.query(
      "SELECT SUM(total_users) AS total_users, SUM(total_suspended) AS total_suspended, SUM(total_terminated) AS total_terminated FROM (SELECT COUNT(*) AS total_users, SUM(CASE WHEN status IN ('suspended') THEN 1 ELSE 0 END) AS total_suspended, SUM(CASE WHEN status = 'terminated' THEN 1 ELSE 0 END) AS total_terminated FROM pitiquer UNION ALL SELECT COUNT(*) AS total_users, SUM(CASE WHEN status IN ('suspended') THEN 1 ELSE 0 END) AS total_suspended, SUM(CASE WHEN status = 'terminated' THEN 1 ELSE 0 END) AS total_terminated FROM realtor) AS user_counts"
    );

    return rows[0];
  }

  async getTopPitiquers() {
    const [rows] = await this.pool.query(
      "SELECT CONCAT(p.fname, ' ', p.mname, ' ' , p.lname) AS name ,p.id AS ptqr_id, CONCAT(MONTH(b.date), '-', YEAR(b.date)) AS month_year, COALESCE(COUNT(b.id), 0) AS completed_bookings, COALESCE(SUM(b.fee), 0) AS total_fee FROM pitiquer p LEFT JOIN booking b ON p.id = b.ptqr_id AND b.status = 'completed' GROUP BY p.id, MONTH(b.date), YEAR(b.date) ORDER BY completed_bookings DESC;"
    );

    return rows;
  }

  async getRevenue() {
    const [rows] = await this.pool.query(
      "SELECT DATE_FORMAT(b.date, '%Y-%m') AS month, COALESCE(SUM(b.total), 0) AS total_revenue FROM booking b WHERE b.status = 'completed' GROUP BY month ORDER BY month;"
    );

    return rows;
  }
}

module.exports = AdminModel;
