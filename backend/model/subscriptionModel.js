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
      "INSERT INTO subscription (ptqr_id,started_date,last_paid_date,amount) VALUES (?, ?, ?, ?)",
      [
        subscriptionInfo.ptqr_id,
        this.philippinesDateTime,
        this.philippinesDateTime,
        subscriptionInfo.amount,
      ]
    );
  }
}

module.exports = SubscriptionModel;
