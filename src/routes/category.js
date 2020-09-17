const express = require('express')
const categoryController = require('../controllers/category')
const { authentication, authorization } = require('../helpers/auth')
const auth = require('../helpers/auth')
const redis = require('../helpers/redis')

const router = express.Router() 

router
    .get('/getall/', authentication, authorization, redis.getCategory, categoryController.getAll)
    .get('/getdetail/:id', authentication, authorization, categoryController.getDetail)
    .post('/insert', authentication, authorization, categoryController.insert)
    .patch('/update/:id', authentication, authorization, categoryController.update)
    .delete('/delete/:id', authentication, authorization, categoryController.destroy)

module.exports = router