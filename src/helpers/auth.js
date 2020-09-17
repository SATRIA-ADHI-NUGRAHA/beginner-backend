const jwt = require('jsonwebtoken')
const { tokenResult } = require('../helpers/response')
const { JWTSECRET } = require('../helpers/env')

module.exports = {
    authentication: (req, res, next) => {
        const token = req.headers.token
        if(token === undefined || token === ''){
            tokenResult(res, [], 'token harus diisi')
        }else{
            next()
        }
    },
    authorization: (req, res, next) => {
        const token  = req.headers.token
        jwt.verify(token, JWTSECRET, (err, decoded) => {
            if(err && err.name === 'TokenExpiredError'){
                tokenResult(res, [], 'Auttentikasi gagal, token Expired')
            }else if(err && err.name === 'JsonWebTokenError'){
                tokenResult(res, [], 'Auttentikasi gagal, token Salah')
            }else{
                // console.log(decoded)
                next()
            }
        })
    }
}