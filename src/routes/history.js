const express = require('express')
const historyController = require('../controllers/history')

const router = express.Router() 

router
    .get('/getall', historyController.getAll)
    .get('/getdetail/:id',historyController.getDetail)
    .post('/insert', historyController.insert)
    .patch('/update/:id', historyController.update)
    .delete('/delete/:id', historyController.destroy)

module.exports = router