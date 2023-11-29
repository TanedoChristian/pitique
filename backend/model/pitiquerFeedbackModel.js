const createPromisePool = require("../helper/mysqlPromise");
const bcrypt = require("bcrypt");

class PitiquerFeedbackModel {
  constructor() {
    this.pool = createPromisePool();
  }

  //   GET Pitiquer
  async getPitiquerFeedbackById(ptqr_id, book_id) {
    const [rows] = await this.pool.query(
      "SELECT * FROM pitiquer_feedback WHERE ptqr_id = ? AND book_id = ?",
      [ptqr_id, book_id]
    );
    return rows[0];
  }

  // CDU
  async createPitiquerFeedback(feedback) {
    const isvisible = true;

    // Convert to MySql DateTime
    const date = new Date().toISOString().split("T")[0];

    await this.pool.query(
      "INSERT INTO pitiquer_feedback (ptqr_id,book_id,rtng, fdbk,date,isvisible) VALUES (?, ?, ? ,? ,? ,?)",
      [
        feedback.ptqr_id,
        feedback.book_id,
        feedback.rtng,
        feedback.fdbk,
        date,
        isvisible,
      ]
    );
  }
}

module.exports = PitiquerFeedbackModel;
