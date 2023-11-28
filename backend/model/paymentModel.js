const createPromisePool = require("../helper/mysqlPromise");

class PaymentModel {
  constructor() {
    this.pool = createPromisePool();
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
        payment.pdate,
        payment.pdate,
        payment.preceipt,
        payment.famt,
        payment.fdate,
        payment.freceipt,
        payment.rmrks,
      ]
    );
  }
}

module.exports = PaymentModel;
