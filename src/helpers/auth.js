const jwt = require('jsonwebtoken')
const { tokenResult, tokenResultExpired, tokenResultErr } = require('../helpers/response')
const { JWTSECRET } = require('../helpers/env')

module.exports = {
    authentication: (req, res, next) => {
        const token = req.headers.token
        if(token === 'undefined' || token === ''){
            tokenResult(res, [], 'Please insert token!')
        }else{
            next()
        }
    },
    authorization: (req, res, next) => {
        const token  = req.headers.token
        jwt.verify(token, JWTSECRET, (err) => {
            if(err && err.name === 'TokenExpiredError'){
                tokenResultExpired(res, [], 'Expired token!, Please insert new token')
            }else if(err && err.name === 'JsonWebTokenError'){
                tokenResultErr(res, [], 'Token Failed!, Token is wrong...')
            }else{
                next()
            }
        })
    }
}