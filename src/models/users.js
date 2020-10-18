const db = require("../configs/db")

const users = {
  register: (data) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO users SET ?', data, (err, result) => {
          if (err) {
            reject(new Error(err.message));
          } else {
            resolve(result);
          }
        })
    })
  },
  login: (data) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE email = ?`, data.email, (err, result) => {
          if (err) {
            reject(new Error(err.message));
          } else {
            resolve(result);
          }
        }
      )
    })
  },
  update: (email) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE users SET status = 1 WHERE email='${email}'`, (err, result) => {
        if(err) {
          reject(new Error(err))
        }else {
          resolve(result)
        }
      })
    })
  }
}

module.exports = users
