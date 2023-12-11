const createPromisePool = require("../helper/mysqlPromise");
const moment = require("moment-timezone");

class SubscriptionModel {
  constructor() {
    this.pool = createPromisePool();
    this.philippinesDateTime = moment(new Date())
      .tz("Asia/Manila")
      .format("YYYY-MM-DD HH:mm:ss");
  }

  // CDU
  async createSubscription(subscriptionInfo) {
    await this.pool.query(
      "INSERT INTO subscription (ptqr_id,started_date,last_paid_date,amount,prev_amount) VALUES (?,?, ?, ?, ?)",
      [
        subscriptionInfo.ptqr_id,
        this.philippinesDateTime,
        this.philippinesDateTime,
        subscriptionInfo.amount,
        subscriptionInfo.amount,
      ]
    );
  }

  async getSubscriptionDetails(pitiquerId) {
    const result = await this.pool.query(
      "SELECT * FROM subscription WHERE ptqr_id = ?",
      [pitiquerId]
    );

    return result[0];
  }

  async paySubscription(ptqr_id, amount, prev_amount) {
    const prev = parseFloat(prev_amount + amount);

    await this.pool.query(
      "UPDATE subscription SET last_paid_date = ?, amount = ?, prev_amount = ? WHERE ptqr_id = ?",
      [this.philippinesDateTime, amount, prev, ptqr_id]
    );
  }
}

module.exports = SubscriptionModel;
