const express = require('express')
const transaksiController = require('../controllers/transaksi')

const router = express.Router() 

router
    .post('/insert', transaksiController.insert)

module.exports = router