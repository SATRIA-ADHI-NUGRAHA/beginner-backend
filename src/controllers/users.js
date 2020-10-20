const usersModel = require('../models/users')
const { success, failed, tokenResult } = require('../helpers/response')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const { JWTSECRET, TOKENREFREST, USERMAIL, USERPASS } = require('../helpers/env')
const { request } = require('express')
const tokenRefres = []

const users = {
    register: async(req, res) => {
      try {
        const data = req.body
        const salt = await bcrypt.genSalt(10)
        const hasPassword = await bcrypt.hash(data.password, salt)
        const newData = {
          email: data.email,
          password: hasPassword
        }
        
        usersModel.register(newData)
        .then((result) => {
          const token = jwt.sign({email: data.email}, JWTSECRET)
          const output = `<center><h3>Hello ${data.email}</h3>
          <h3>Thank you for registration</h3>
          <p>You can confirm your email after click link <br> <a href="http://localhost:3000/users/verification/${token}">Activation</a></p></center>
          `
          let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: USERMAIL,
                pass: USERPASS
            }
          })
          let Mail = {
            from: `'SAN-COMPANY' <${USERMAIL}>`,
            to: data.email,
            subject: 'Verification Email',
            text: 'Plaintext version of the message',
            html: output
          }
          transporter.sendMail(Mail)
          success(res, result, 'Please check your mail for activation')
        })
        .catch((err) => {
          if(err.message = 'Duplicate entry'){
            failed(res, [], 'User Already exist')
          } else {
            failed(res, [], err.message)
          }
        })
      } catch (error) {
        failed(res, [], 'internal server error');
      }
    },
    verify: (req, res) => {
      const token = req.params.token
      jwt.verify(token, JWTSECRET, (err, decode) => {
        if(err) {
          failed(res, [], 'Failed Auth!')
        } else {
          const data = jwt.decode(token)
          const email = data.email
          usersModel.update(email).then(() => {
            res.render('index', {email})
          }).catch(err => {
            failed(res, [], err.message)
          })
        }
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
            success(res, dataToken, 'Login Success')
          }else{
            failed(res, [], 'Wrong password/email')
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