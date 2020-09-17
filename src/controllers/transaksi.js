const transaksiModel = require('../models/transaksi')
const { success, failed, tokenResult } = require('../helpers/response')
const { response } = require('express')


const transaksi = {
  insert: async(req, res) => {
    const body = req.body
    transaksiModel.insertMaster(body).then((response) => {
      const idMaster = response.insertId
      const insertDetail = body.detail.map((item) => {
        item.id_transaksi = idMaster
        transaksiModel.insertDetail(item)
      })
      Promise.all(insertDetail).then(() => {
        success(res, response, 'Insert transaksi sukses')
      }).catch((err) => {
        console.log(err)
      })
    }).catch((err) => {
      console.log(err)
    })
  }
}


module.exports = transaksi