const express = require('express')
const categoryController = require('../controllers/category')
const auth = require('../helpers/auth')

const router = express.Router() 

router
    .get('/getall/', categoryController.getAll)
    .get('/getdetail/:id', auth, categoryController.getDetail)
    .post('/insert', categoryController.insert)
    .patch('/update/:id', categoryController.update)
    .delete('/delete/:id', categoryController.destroy)

module.exports = router