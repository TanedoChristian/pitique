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
      "INSERT INTO report (msg,user_id,user_type,date) VALUES (?, ?, ?, ?)",
      [
        reportInfo.msg,
        reportInfo.id,
        reportInfo.user_type,
        this.philippinesDateTime,
      ]
    );
  }

  async getSubscriptionDetails(pitiquerId) {
    const result = await this.pool.query(
      "SELECT * FROM subscription WHERE ptqr_id = ?",
      [pitiquerId]
    );

    return result[0];
  }
}

module.exports = ReportModel;
