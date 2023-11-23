const createPromisePool = require("../helper/mysqlPromise");

class BookingModel {
  constructor() {
    this.pool = createPromisePool();
  }

  //   GET booking
  async getBookingById(bookingId) {
    const [rows] = await this.pool.query("SELECT * FROM booking WHERE id = ?", [
      bookingId,
    ]);
    return rows[0];
  }

  async getBookingByRealtor(realtorId) {
    const [rows] = await this.pool.query(
      "SELECT * FROM booking WHERE rltr_id = ?",
      [realtorId]
    );
    return rows;
  }

  async getBookingByPitiquer(pitiquerId) {
    const [rows] = await this.pool.query(
      "SELECT * FROM booking WHERE ptqr_id = ?",
      [pitiquerId]
    );
    return rows;
  }

  async getBookingRequestByPitiquer(pitiquerId) {
    //Default Value
    const status = "pending";
    const [rows] = await this.pool.query(
      "SELECT * FROM booking WHERE ptqr_id = ? and status = ?",
      [pitiquerId, status]
    );
    return rows;
  }

  async getBookingHistoryByPitiquer(pitiquerId) {
    //Default Value
    const status = "pending";
    const [rows] = await this.pool.query(
      "SELECT * FROM booking WHERE ptqr_id = ? and NOT status = ?",
      [pitiquerId, status]
    );
    return rows;
  }

  async getBookingHistoryByRealtor(realtorId) {
    //Default Value
    const status = "pending";
    const [rows] = await this.pool.query(
      "SELECT * FROM booking WHERE ptqr_id = ? and NOT status = ?",
      [realtorId, status]
    );
    return rows;
  }

  // CDU
  async requestBooking(bookingInfo) {
    // Default Value
    const status = "pending";

    await this.pool.query(
      "INSERT INTO booking (pkg_id,rltr_id,ptqr_id,status,price,share,fee,total,date,rmrks,approved,declined,completed,cancelled) VALUES (?, ?, ?,?, ?, ?,?, ?, ?,?, ?, ?,?,?)",
      [
        bookingInfo.packageId,
        bookingInfo.realtorId,
        bookingInfo.pitiquerId,
        status,
        bookingInfo.price,
        bookingInfo.share,
        bookingInfo.fee,
        bookingInfo.total,
        bookingInfo.date,
        bookingInfo.remarks,
        bookingInfo.approved,
        bookingInfo.declined,
        bookingInfo.completed,
        bookingInfo.cancelled,
      ]
    );
  }

  //   Accept status
  async accecptBookingRequest(bookingId) {
    // Default Value
    const status = "accepted";

    // Convert to MySql DateTime
    const approvedDate = new Date().toLocaleString();

    await this.pool.query(
      "UPDATE FROM booking SET status = ?, approved=? WHERE id = ?",
      [status, approvedDate, bookingId]
    );
  }

  //   Decline status
  async declineBookingRequest(bookingId) {
    // Default Value
    const status = "declined";

    // Convert to MySql DateTime
    const declinedRequest = new Date().toLocaleString();

    await this.pool.query(
      "UPDATE FROM booking SET status = ?, declined=? WHERE id = ?",
      [status, declinedRequest, bookingId]
    );
  }

  //   Reschedule date
  async rescheduleBooking(bookingId, date) {
    await this.pool.query("UPDATE FROM booking SET date = ? WHERE id = ?", [
      date,
      bookingId,
    ]);
  }

  //Update Booking
  async updateBooking(pitiquerId, bookingId, updatedInfo) {
    await this.pool.query(
      "UPDATE booking SET status = ?,price = ?,share = ?,fee = ?,total = ?,date = ?,rmrks = ?,approved = ?,declined = ?,completed = ?, cancelled = ? WHERE id = ? and ptqr_id = ?",
      [
        updatedInfo.status,
        updatedInfo.price,
        updatedInfo.share,
        updatedInfo.fee,
        updatedInfo.total,
        updatedInfo.date,
        updatedInfo.rmrks,
        updatedInfo.approved,
        updatedInfo.declined,
        updatedInfo.complete,
        updatedInfo.cancelled,
        bookingId,
        pitiquerId,
      ]
    );
  }
}

module.exports = BookingModel;
