const createPromisePool = require("../helper/mysqlPromise");

class RealtorModel {
  constructor() {
    this.pool = createPromisePool();
  }

  async getRealtors() {
    const [rows] = await this.pool.query("SELECT * FROM realtor");
    return rows;
  }

  // You can add more methods for creating, updating, and deleting users
}

module.exports = RealtorModel;
