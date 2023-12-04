const createPromisePool = require("../helper/mysqlPromise");
const moment = require("moment-timezone");

class PitiquerFeedbackModel {
  constructor() {
    this.pool = createPromisePool();
    this.philippinesDateTime = moment(new Date())
      .tz("Asia/Manila")
      .format("YYYY-MM-DD HH:mm:ss");
  }

  //   GET Pitiquer
  async getPitiquerFeedbackById(ptqr_id, book_id) {
    const [rows] = await this.pool.query(
      "SELECT * FROM pitiquer_feedback WHERE ptqr_id = ? AND book_id = ?",
      [ptqr_id, book_id]
    );
    return rows[0];
  }

  //   GET
  async getFeedbackById(book_id) {
    const [rows] = await this.pool.query(
      "SELECT * FROM pitiquer_feedback WHERE book_id = ?",
      [book_id]
    );
    return rows[0];
  }

  // CDU
  async createPitiquerFeedback(feedback) {
    const isvisible = true;

    await this.pool.query(
      "INSERT INTO pitiquer_feedback (ptqr_id,book_id,rtng, fdbk,date,isvisible) VALUES (?, ?, ? ,? ,? ,?)",
      [
        feedback.ptqr_id,
        feedback.book_id,
        feedback.rtng,
        feedback.fdbk,
        this.philippinesDateTime,
        isvisible,
      ]
    );
  }

  //   update
  async updateFeedback(book_id, fdbk) {
    await this.pool.query(
      "UPDATE pitiquer_feedback SET fdbk = ? WHERE book_id = ?",
      [fdbk, book_id]
    );
  }
}

module.exports = PitiquerFeedbackModel;
