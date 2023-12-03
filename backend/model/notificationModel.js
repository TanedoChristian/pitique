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
      "INSERT INTO notification (book_id,message,date,pstatus,rstatus ) VALUES (?, ?, ?, ?,?)",
      [bookingId, message, this.philippinesDateTime, "unread", "unread"]
    );
  }

  async getRealtorNotification(realtorId) {
    const [rows] = await this.pool.query(
      "SELECT n.id, n.book_id, n.message, n.rstatus, n.date  FROM notification n INNER JOIN booking b ON b.id = n.book_id INNER JOIN realtor r ON r.id = b.rltr_id WHERE r.id = ? GROUP BY n.id ORDER BY  n.rstatus DESC, n.date DESC",
      [realtorId]
    );

    return rows;
  }

  async getPitiquerNotification(pitiquerId) {
    const [rows] = await this.pool.query(
      "SELECT n.id, n.book_id, n.message, n.pstatus, n.date  FROM notification n INNER JOIN booking b ON b.id = n.book_id INNER JOIN pitiquer r ON r.id = b.ptqr_id WHERE r.id = ? GROUP BY n.id ORDER BY  n.pstatus DESC, n.date DESC ",
      [pitiquerId]
    );

    return rows;
  }

  async getPitiquerNotificationCount(pitiquerId) {
    const [rows] = await this.pool.query(
      "SELECT COUNT(n.id) AS notif   FROM notification n INNER JOIN booking b ON b.id = n.book_id INNER JOIN pitiquer r ON r.id = b.ptqr_id WHERE r.id = ? AND n.pstatus = ?  ",
      [pitiquerId, "unread"]
    );

    return rows[0];
  }

  async getRealtorNotificationCount(realtorId) {
    const [rows] = await this.pool.query(
      "SELECT COUNT(n.id)  AS notif FROM notification n INNER JOIN booking b ON b.id = n.book_id INNER JOIN realtor r ON r.id = b.rltr_id WHERE r.id = ? AND n.rstatus = ? ",
      [realtorId, "unread"]
    );

    return rows[0];
  }

  async updateStatusPitiquer(notifId) {
    this.pool.query("UPDATE notification SET pstatus = ? WHERE id = ? ", [
      "read",
      notifId,
    ]);
  }

  async updateStatusRealtor(notifId) {
    this.pool.query("UPDATE notification SET rstatus = ? WHERE id = ? ", [
      "read",
      notifId,
    ]);
  }
}

module.exports = NotificationModel;
