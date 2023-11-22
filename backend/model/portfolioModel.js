const createPromisePool = require("../helper/mysqlPromise");

class PortfolioModel {
  constructor() {
    this.pool = createPromisePool();
  }

  //   GET Portfolio

  async getPortfolioById(portfolioId) {
    const [rows] = await this.pool.query(
      "SELECT * FROM portfolio WHERE id = ?",
      [portfolioId]
    );
    return rows[0];
  }

  async getPortfolioByPitiquerId(pitiquerId) {
    const [rows] = await this.pool.query(
      "SELECT * FROM portfolio WHERE ptqr_id = ?",
      [pitiquerId]
    );
    return rows;
  }

  // CDU
  async createPortfolio(portfolio) {
    // Default Value
    const visibility = true;

    await this.pool.query(
      "INSERT INTO portfolio (ptqr_id,img,isvisible) VALUES (?, ?, ?)",
      [portfolio.pitiquerId, portfolio.img, visibility]
    );
  }

  //Remove
  async removePortfolioById(portfolioId, pitiquerId, visibility) {
    await this.pool.query(
      "UPDATE FROM portfolio SET isvisible = ? WHERE id = ? and ptqr_id = ?",
      [visibility, portfolioId, pitiquerId]
    );
  }
}

module.exports = PortfolioModel;
