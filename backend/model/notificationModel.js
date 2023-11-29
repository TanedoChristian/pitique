const createPromisePool = require("../helper/mysqlPromise");

class NotificationModel {
  constructor() {
    this.pool = createPromisePool();
  }
  // CDU
  async createNotification(bookingId, message) {
    const date = new Date().toISOString();
    await this.pool.query(
      "INSERT INTO notification (book_id,message,date ) VALUES (?, ?, ?)",
      [bookingId, message, date]
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
