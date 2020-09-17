const express = require('express')
const historyController = require('../controllers/history')
const { authentication, authorization } = require('../helpers/auth')
const redis = require('../helpers/redis')

const router = express.Router() 

router
    .get('/getall', authentication, authorization, redis.getHistory, historyController.getAll)
    .get('/getdetail/:id', authentication, authorization, historyController.getDetail)
    .post('/insert', historyController.insert)
    .patch('/update/:id', authentication, authorization, historyController.update)
    .delete('/delete/:id', authentication, authorization, historyController.destroy)

module.exports = router