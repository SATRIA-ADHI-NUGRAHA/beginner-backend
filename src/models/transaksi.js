const db = require("../configs/db")

const transaksi = {
  insertMaster: (body) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO transaksi (invoice, cashier) VALUES ('${body.invoice}','${body.cashier}')`, (err, result) => {
          if (err) {
            reject(new Error(err.message));
          } else {
            resolve(result);
          }
        })
    })
  },
  insertDetail: (data) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO transaksi_detail SET ?`, data, (err, result) => {
          if (err) {
            reject(new Error(err.message));
          } else {
            resolve(result);
          }
        }
      )
    })
  }
}

module.exports = transaksi
