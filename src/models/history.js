const db = require('../configs/db')

const history = {
    getAll: (search, sort, type, limit, offset) => {
        return new Promise ((resolve, reject) => {
            db.query(`SELECT *, (SELECT COUNT(*) FROM history ) AS count, history.id as id 
            FROM history WHERE cashier LIKE '%${search}%' ORDER BY ${sort} ${type} LIMIT ${offset}, ${limit}`, 
            (err, result) => {
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    getDetail: (id) => {
        return new Promise ((resolve, reject) => {
            db.query(`SELECT * FROM history WHERE id= '${id}'`, (err, result) => {
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    insert: (data) => {
        return new Promise ((resolve, reject) => {
            db.query(`INSERT INTO history (cashier, orders, amount) VALUE ('${data.cashier}',
            '${data.orders}',
            '${data.amount}')`, 
            (err, result) => {
                if(err){
                    reject(new Error(err.message))
                }else{
                    resolve(result)
                }
            })
        })
    },
    update: (data, id) => {
        return new Promise ((resolve, reject) => {
            db.query(`UPDATE history SET ? WHERE id = ?`, [data, id], 
            (err, result) => {
                if(err){
                    reject(new Error(err.message))
                }else{
                    resolve(result)
                }
            })
        })
    },
    destroy: (id) => {
        return new Promise ((resolve, reject) => {
            db.query(`DELETE FROM history WHERE id='${id}'`, (err, result) => {
                if(err){
                    reject(new Error(err.message))
                }else {
                    resolve(result)
                }
            })
        })
    },
    sort: () => {
        return new Promise ((resolve, reject) => {
            db.query(`SELECT *, (SELECT COUNT(*) FROM history ) AS count, 
            history.id as id FROM history
            ORDER BY date ASC`, (err, result) => {
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    }
}

module.exports = history