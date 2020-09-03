const express = require('express')
const productController = require('../controllers/product')
const auth = require('../helpers/auth')

const upload = require('../helpers/upload')

const router = express.Router() 

router
    .get('/getall/', productController.getAll)
    .get('/getdetail/:id', auth, productController.getDetail)
    .post('/insert', upload.single('gambar'), productController.insert)
    .patch('/update/:id', upload.single('gambar'),productController.update)
    .delete('/delete/:id', productController.destroy)

module.exports = router