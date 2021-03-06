const express = require('express')
const usersController = require('../controllers/users')

const router = express.Router() 

router
    .post('/register', usersController.register)
    .post('/login', usersController.login)
    .post('/tokenRefres', usersController.tokenRefres)
    .get('/verification/:token', usersController.verify)

module.exports = router