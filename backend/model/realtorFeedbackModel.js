const createPromisePool = require("../helper/mysqlPromise");
const bcrypt = require("bcrypt");

class RealtorFeedbackModel {
  constructor() {
    this.pool = createPromisePool();
  }

  //   GET REALTOR
  async getRealtorFeedbackById(rltr_id, book_id) {
    const [rows] = await this.pool.query(
      "SELECT * FROM realtor_feedback WHERE rltr_id = ? AND book_id = ?",
      [rltr_id, book_id]
    );
    return rows[0];
  }

  //   GET
  async getFeedbackById(book_id) {
    const [rows] = await this.pool.query(
      "SELECT * FROM realtor_feedback WHERE book_id = ?",
      [book_id]
    );
    return rows[0];
  }

  // CDU
  async createRealtorFeedback(feedback) {
    const isvisible = true;

    // Convert to MySql DateTime
    const date = new Date().toLocaleString();

    await this.pool.query(
      "INSERT INTO realtor_feedback (rltr_id,book_id,rtng, fdbk,date,isvisible) VALUES (?, ?, ? ,? ,? ,?)",
      [
        feedback.rltr_id,
        feedback.book_id,
        feedback.rtng,
        feedback.fdbk,
        date,
        isvisible,
      ]
    );
  }

  //   DELETE
  async removeFeedback(book_id) {
    await this.pool.query("DELETE FROM realtor_feedback WHERE book_id = ?", [
      book_id,
    ]);
  }
}

module.exports = RealtorFeedbackModel;
