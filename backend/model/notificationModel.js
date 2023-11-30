const createPromisePool = require("../helper/mysqlPromise");
const moment = require("moment-timezone");
class NotificationModel {
  constructor() {
    this.pool = createPromisePool();
    this.philippinesDateTime = moment(new Date())
      .tz("Asia/Manila")
      .format("YYYY-MM-DD HH:mm:ss");
  }
  // CDU
  async createNotification(bookingId, message) {
    await this.pool.query(
      "INSERT INTO notification (book_id,message,date ) VALUES (?, ?, ?)",
      [bookingId, message, this.philippinesDateTime]
    );
  }

  async getRealtorNotification(realtorId) {
    const [rows] = await this.pool.query(
      "SELECT n.book_id, n.message, n.date  FROM notification n INNER JOIN booking b ON b.id = n.book_id INNER JOIN realtor r ON r.id = b.rltr_id WHERE r.id = ? GROUP BY n.id ORDER BY  n.date DESC",
      [realtorId]
    );

    return rows;
  }

  async getPitiquerNotification(pitiquerId) {
    const [rows] = await this.pool.query(
      "SELECT n.book_id, n.message, n.date  FROM notification n INNER JOIN booking b ON b.id = n.book_id INNER JOIN pitiquer r ON r.id = b.ptqr_id WHERE r.id = ? GROUP BY n.id ORDER BY n.date DESC ",
      [pitiquerId]
    );

    return rows;
  }
}

module.exports = NotificationModel;
