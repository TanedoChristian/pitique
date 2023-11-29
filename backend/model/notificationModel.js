const createPromisePool = require("../helper/mysqlPromise");

class NotificationModel {
  constructor() {
    this.pool = createPromisePool();
  }
  // CDU
  async createNotification(bookingId, message) {
    await this.pool.query(
      "INSERT INTO notification (book_id,message) VALUES (?, ?)",
      [bookingId, message]
    );
  }
}

module.exports = NotificationModel;
