const createPromisePool = require("../helper/mysqlPromise");
const moment = require("moment-timezone");

class RealtorFeedbackModel {
  constructor() {
    this.pool = createPromisePool();
    this.philippinesDateTime = moment(new Date())
      .tz("Asia/Manila")
      .format("YYYY-MM-DD HH:mm:ss");
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

    await this.pool.query(
      "INSERT INTO realtor_feedback (rltr_id,book_id,rtng, fdbk,date,isvisible) VALUES (?, ?, ? ,? ,? ,?)",
      [
        feedback.rltr_id,
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
      "UPDATE realtor_feedback SET fdbk = ? WHERE book_id = ?",
      [fdbk, book_id]
    );
  }
}

module.exports = RealtorFeedbackModel;
