const createPromisePool = require("../helper/mysqlPromise");
const moment = require("moment-timezone");
class PaymentModel {
  constructor() {
    this.pool = createPromisePool();
    this.philippinesDateTime = moment(new Date())
      .tz("Asia/Manila")
      .format("YYYY-MM-DD HH:mm:ss");
  }

  // CDU
  async createPayment(payment) {
    await this.pool.query(
      "INSERT INTO payment (ptqr_id,rltr_id,book_id,status,total,pamt,pdate,preceipt,famt,fdate,freceipt,rmrks) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        payment.ptqr_id,
        payment.rltr_id,
        payment.book_id,
        payment.status,
        payment.total,
        payment.pamt,
        this.philippinesDateTime,
        payment.preceipt,
        payment.famt,
        this.philippinesDateTime,
        payment.freceipt,
        payment.rmrks,
      ]
    );
  }

  async getPaymentInfo(bookingId) {
    const [rows] = await this.pool.query(
      "SELECT p.status, p.rmrks, p.id, pc.pkg_desc, p.total, CONCAT(r.fname, ' ', r.mname, ' ', r.lname) AS realtor_name, CONCAT(pt.fname, ' ', pt.mname, ' ', pt.lname) AS pitiquer_name, p.freceipt, p.fdate" +
        " FROM payment p INNER JOIN booking b ON b.id = p.book_id INNER JOIN realtor r ON r.id = p.rltr_id INNER JOIN pitiquer pt ON pt.id = p.ptqr_id INNER JOIN package pc ON pc.id = b.pkg_id WHERE b.id = ?",
      [bookingId]
    );
    return rows[0];
  }
}

module.exports = PaymentModel;
