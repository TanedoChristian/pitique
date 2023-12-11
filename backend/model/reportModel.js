const createPromisePool = require("../helper/mysqlPromise");
const moment = require("moment-timezone");

class ReportModel {
  constructor() {
    this.pool = createPromisePool();
    this.philippinesDateTime = moment(new Date())
      .tz("Asia/Manila")
      .format("YYYY-MM-DD HH:mm:ss");
  }

  // CDU
  async createReport(reportInfo) {
    await this.pool.query(
      "INSERT INTO report (msg,user_id,user_type,date,status) VALUES (?, ?, ?,?, ?)",
      [
        reportInfo.msg,
        reportInfo.id,
        reportInfo.user_type,
        this.philippinesDateTime,
        "pending",
      ]
    );
  }

  async getReports() {
    const [result] = await this.pool.query(
      "SELECT * FROM report WHERE status = ?",
      ["pending"]
    );

    return result;
  }

  async updateStatus(id) {
    const [result] = await this.pool.query(
      "UPDATE report SET status = ? WHERE id = ?",
      ["done", id]
    );

    return result;
  }
}

module.exports = ReportModel;
