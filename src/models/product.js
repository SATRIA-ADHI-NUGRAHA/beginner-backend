const db = require("../configs/db");
const fs = require('fs')
const { sort } = require("../controllers/product");

const product = {
  getAll: (search, sort, type, limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT *, (SELECT COUNT(*) FROM product) AS count, 
            product.id as id FROM product LEFT JOIN category ON product.id_category=category.id
            WHERE nama_produk LIKE '%${search}%' ORDER BY ${sort} ${type} LIMIT ${offset}, ${limit} `,
        (err, result) => {
          if (err) {
            reject(new Error(err));
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  getAllData: () => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT *, (SELECT COUNT(*) FROM product) AS count, 
            product.id as id FROM product LEFT JOIN category ON product.id_category=category.id`,
        (err, result) => {
          if (err) {
            reject(new Error(err));
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  // Model GetAll
  getRedisModel: () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT *, (SELECT COUNT(*) FROM product) AS count, 
        product.id as id FROM product LEFT JOIN category ON product.id_category=category.id`, 
        (err, result) => {
            if (err) {
                reject(new Error(err))
            } else {
                resolve(result);
            }
        })
    })
  },
  getDetail: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM product WHERE id= '${id}'`, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },
  insert: (data) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO product (gambar, nama_produk, harga, id_category) 
      VALUES ('${data.gambar}',
      '${data.nama_produk}',
      '${data.harga}',
      '${data.id_category}')`,
        (err, res) => {
          if (err) {
            reject(new Error(err.message));
          } else {
            resolve(res);
          }
        }
      );
    });
  },
  update: (data, id) => {
        return new Promise((resolve, reject) => {
            if(!data.gambar) {
                db.query(`SELECT * FROM product WHERE id=${id}`, (err, result) => {
                    if(err) {
                        reject(new Error(err));
                    }else {
                        resolve(new Promise((resolve, reject) => {
                            data.gambar = result[0].gambar;
                            db.query(`UPDATE product SET ? WHERE id = ?`, [data, id], (err, res) => {
                                if(err) {
                                    reject(new Error(err));
                                }else {
                                    resolve(res);
                                }
                            })
                        }))
                    }
                })

            }else {
                db.query(`SELECT * FROM product WHERE id=${id}`, (err, result) => {
                    if(err) {
                        reject(new Error(err));
                    }else {
                        resolve(new Promise((resolve, reject) => {
                            let imagename = null
                            if(!data.gambar){
                                imagename = result[0].gambar;
                            }else{
                                imagename = data.gambar;
                                fs.unlink(`src/uploads/${result[0].gambar}`, (err) => {
                                    if(err) throw err;
                                    console.log('Update data success');
                                })
                                db.query(`UPDATE product SET ? WHERE id = ?`, [data, id], (err, res) => {
                                    if(err) {
                                        reject(new Error(err));
                                    }else {
                                        resolve(res);
                                    }
                                })
                            }
                        }))
                    }
                })
            }
        })
  },
  destroy: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM product WHERE id='${id}'`, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(new Promise((resolve, reject) => {
            db.query(`DELETE FROM product WHERE id='${id}'`, (err, res) => {
              const imagename = result[0].gambar
              fs.unlink(`src/uploads/${imagename}`, (err) => {
                // if(err)
		            //   throw err
                  console.log('Delete success')
              })
              if(err){
                reject(new Error(err))
              } else {
                resolve(res)
              }
            })
          }));
        }
      });
    });
  }
};

module.exports = product;
