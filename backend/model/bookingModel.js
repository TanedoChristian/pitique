const createPromisePool = require("../helper/mysqlPromise");
const moment = require("moment-timezone");
class BookingModel {
  constructor() {
    this.pool = createPromisePool();
    this.philippinesDateTime = moment(new Date())
      .tz("Asia/Manila")
      .format("YYYY-MM-DD HH:mm:ss");
  }

  //   GET booking
  async getBookingById(bookingId) {
    const [rows] = await this.pool.query(
      "SELECT b.reason, b.city, b.date,b.day, b.fee, b.id, b.pkg_id, b.postal, b.price, b.province, b.ptqr_id, b.rltr_id, b.status, b.street, b.total, b.unit_no, r.fname AS rfname, r.lname AS rlname, r.email AS remail, r.phone AS rphone, pr.fname AS prfname, pr.lname AS prlname,pr.city AS prcity,pr.province AS prprovince, p.pkg_desc " +
        "FROM booking b INNER JOIN package p ON b.pkg_id = p.id INNER JOIN realtor r ON b.rltr_id = r.id INNER JOIN pitiquer pr ON b.ptqr_id = pr.id WHERE b.id = ? GROUP BY b.id",
      [bookingId]
    );
    return rows[0];
  }

  async getBookingByRealtor(realtorId) {
    const [rows] = await this.pool.query(
      "SELECT  b.date,  b.id, b.pkg_id,  b.ptqr_id, b.rltr_id, b.status, b.total,  pr.fname, pr.lname,pr.city,pr.province,  p.pkg_desc " +
        "FROM booking b INNER JOIN package p ON b.pkg_id = p.id INNER JOIN pitiquer pr ON b.ptqr_id = pr.id WHERE b.rltr_id = ? GROUP BY b.id",
      [realtorId]
    );
    return rows;
  }

  async getBookingByPitiquer(pitiquerId) {
    const [rows] = await this.pool.query(
      "SELECT b.city, b.date, b.fee, b.id, b.pkg_id, b.postal, b.price, b.province, b.ptqr_id, b.rltr_id, b.status, b.street, b.total, b.unit_no, r.fname, r.lname, r.email, r.phone, p.pkg_desc " +
        "FROM booking b INNER JOIN package p ON b.pkg_id = p.id INNER JOIN realtor r ON b.rltr_id = r.id INNER JOIN pitiquer pr ON pr.id = b.ptqr_id WHERE pr.id = ? GROUP BY b.id",
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
    const date = moment(new Date(bookingInfo.date))
      .tz("Asia/Manila")
      .format("YYYY-MM-DD HH:mm:ss");
    const result = await this.pool.query(
      "INSERT INTO booking (pkg_id,rltr_id,ptqr_id,status,price,share,fee,total,date,rmrks,street, unit_no, city, province, postal, property_size,day) VALUES (?, ?, ?,?, ?, ?,?, ?, ?,?,?,?,?, ?, ?,?,?)",
      [
        bookingInfo.pkg_id,
        bookingInfo.rltr_id,
        bookingInfo.ptqr_id,
        status,
        bookingInfo.price,
        0, // share
        bookingInfo.price, // fee
        bookingInfo.price, //total
        date,
        bookingInfo.rmrks,
        bookingInfo.street,
        bookingInfo.unit_no,
        bookingInfo.city,
        bookingInfo.province,
        bookingInfo.postal,
        bookingInfo.property_size,
        bookingInfo.day,
      ]
    );

    return result[0].insertId;
  }

  //   Accept status
  async acceptBookingRequest(bookingId) {
    // Default Value
    const status = "payment";

    await this.pool.query(
      "UPDATE booking SET status = ?, approved=? WHERE id = ?",
      [status, this.philippinesDateTime, bookingId]
    );
  }

  //   Accept status
  async payBookingRequest(bookingId) {
    // Default Value
    const status = "accepted";

    await this.pool.query("UPDATE booking SET status = ? WHERE id = ?", [
      status,
      bookingId,
    ]);
  }

  //   Complete status
  async completeBookingRequest(bookingId) {
    // Default Value
    const status = "completed";

    await this.pool.query(
      "UPDATE booking SET status = ?, completed=? WHERE id = ?",
      [status, this.philippinesDateTime, bookingId]
    );
  }

  //   Decline status
  async declineBookingRequest(bookingId, msg) {
    // Default Value
    const status = "declined";

    await this.pool.query(
      "UPDATE booking SET status = ?, declined=?, reason = ? WHERE id = ?",
      [status, this.philippinesDateTime, msg, bookingId]
    );
  }

  //   Decline status
  async cancelledBookingRequest(bookingId) {
    // Default Value
    const status = "cancelled";

    await this.pool.query(
      "UPDATE booking SET status = ?, cancelled=? WHERE id = ?",
      [status, this.philippinesDateTime, bookingId]
    );
  }

  //   Reschedule date
  async rescheduleBooking(bookingId, date) {
    await this.pool.query("UPDATE booking SET date = ? WHERE id = ?", [
      date,
      bookingId,
    ]);
  }

  //Update Booking
  async updateBooking(pitiquerId, bookingId, updatedInfo) {
    await this.pool.query(
      "UPDATE booking SET status = ?,price = ?,share = ?,fee = ?,total = ?,date = ?,rmrks = ?,approved = ?,declined = ?,completed = ?, cancelled = ?, street = ?, unit_no = ?, city = ?, province = ?, postal = ?, property_size = ? WHERE id = ? and ptqr_id = ?",
      [
        updatedInfo.status,
        updatedInfo.price,
        updatedInfo.share,
        updatedInfo.fee,
        updatedInfo.total,
        this.philippinesDateTime,
        updatedInfo.rmrks,
        updatedInfo.approved,
        updatedInfo.declined,
        updatedInfo.complete,
        updatedInfo.cancelled,
        updatedInfo.street,
        updatedInfo.unit_no,
        updatedInfo.city,
        updatedInfo.province,
        updatedInfo.postal,
        updatedInfo.property_size,
        bookingId,
        pitiquerId,
      ]
    );
  }
}

module.exports = BookingModel;
