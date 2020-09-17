const usersModel = require('../models/users')
const { success, failed, tokenResult } = require('../helpers/response')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWTSECRET, TOKENREFREST } = require('../helpers/env')
const { request } = require('express')
const tokenRefres = []

const users = {
    register: async(req, res) => {
        const body = req.body

        const salt = await bcrypt.genSalt(10)
        const hasPassword = await bcrypt.hash(body.password, salt)

        const data = {
          email: body.email,
          password: hasPassword
        }
        usersModel.register(data)
        .then((result) => {
            success(res, result, 'Users berhasil ditambahkan')
        })
        .catch((err) => {
            failed(res, [], err.message)
        })
    },
    login: async(req, res) => {
      const body = req.body
      usersModel.login(body)
      .then(async(result) => {
          const results = result[0]
          const password = results.password
          const isMatch = await bcrypt.compare(body.password, password)
          if(isMatch){
            const email = {email: results.email}
            const refresToken = jwt.sign(email, TOKENREFREST)
            tokenRefres.push(refresToken)
            const token = generateToken(email)
            
            const dataToken = { 
              token,
              refresToken 
            }
            success(res, dataToken, 'Data token')
          }else{
            failed(res, [], 'Password salah')
          }
      })
      .catch((err) => {
          failed(res, [], err.message)
      })
    },
    tokenRefres: (req, res) => {
      const tokenRequest = req.body.tokenRequest
      if(tokenRequest === ''){
        console.log('gagal')
      }else{
        jwt.verify(tokenRequest, TOKENREFREST, (err, result) => {
          const newToken = generateToken({email: result.email})
          res.json({newToken})
        })
      }
    }
}

const generateToken = (email) => {
  return jwt.sign(email, JWTSECRET, {expiresIn:'10h'})
}

module.exports = users