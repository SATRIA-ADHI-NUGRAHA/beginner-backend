const express = require('express')
const productController = require('../controllers/product')
const { authentication, authorization } = require('../helpers/auth')

const upload = require('../helpers/upload')
const redis = require('../helpers/redis')

const router = express.Router() 

router
    .get('/getall/', authentication, authorization, productController.getAll)
    .get('/getdetail/:id', authentication, authorization, productController.getDetail)
    .post('/insert', productController.insert)
    .patch('/update/:id', authentication, authorization, upload.single('gambar'),productController.update)
    .delete('/delete/:id', authentication, authorization, productController.destroy)

    // .get('/getall/', redis.getProduct, productController.getAll)
    // .get('/getdetail/:id', productController.getDetail)
    // .post('/insert', productController.insert)
    // .patch('/update/:id', upload.single('gambar'),productController.update)
    // .delete('/delete/:id', productController.destroy)

module.exports = router