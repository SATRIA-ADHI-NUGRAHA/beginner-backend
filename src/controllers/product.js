const productModel = require('../models/product')
const { success, failed, successWithMeta } = require('../helpers/response')
const upload = require('../helpers/upload')
const redis = require('redis')
const { database } = require('../helpers/env')
const redisClient = redis.createClient()

const product = {
    getAll: (req, res) => {
        const namaProduk = !req.query.namaProduk?'' : req.query.namaProduk
        const sort = !req.query.sort?'harga' : req.query.sort
        const type = !req.query.sort?'DESC' : req.query.type
        const limit = !req.query.limit? 9 : parseInt(req.query.limit)
        const page = !req.query.page? 1 : parseInt(req.query.page)
        const offset = page===1? 0 : (page-1)*limit
        productModel.getAll(namaProduk, sort, type, limit, offset)
        .then((result) => {

            // redisClient.set('products', JSON.stringify(result)) // <-- save data ke redis 

            const totalRow = result[0].count
            const meta = {
                totalRow: totalRow,
                totalPage: Math.ceil(totalRow/limit),
                limit,
                page
            }
            successWithMeta(res, result, meta, 'Get all product success')
        })
        .catch((err) => {
            failed(res, [], err.message)
        })
        // GET REDIS
        productModel.getRedisModel()
        .then((results) => {
            // console.log(results)
            redisClient.set('products', JSON.stringify(results))
        })
        .catch(() => {
            res.status(500)
            failed(res, [], 'Error set redis')
        })
    },
    getDetail: (req, res) => {
        const id = req.params.id
        productModel.getDetail(id)
        .then((result) => {
            success(res, result, 'Get Detail product success')
        })
        .catch((err) => {
            failed(res, [], err.message)
        })
    },
    insert: (req, res) => {
        upload.single('gambar')(req, res, (err) => {
            if(err){
                if(err.code === 'LIMIT_FILE_SIZE'){
                    failed(res, [], 'File size max 500 KB')
                }else{
                    failed(res, [], err)
                }
            }else{
                const body = req.body
                body.gambar = req.file.filename
                productModel.insert(body)
                .then((result) => {
                    redisClient.del('products')
                    success(res, result, 'Data berhasil dimasukkan')
                })
                .catch((err) => {
                    failed(res, [], err.message)
                })
            }
        })
    },
    update: (req, res) => {
        const id = req.params.id
        const body = req.body
        body.gambar = !req.file ? '': req.file.filename
        productModel.update(body, id)
        .then((result) => {
            redisClient.del('products')
            success(res, result, 'Data berhasil diupdate')
        })
        .catch((err) => {
            failed(res, [], err.message)
        })
    },
    destroy: (req, res) => {
        const id =  req.params.id
        productModel.destroy(id)
        .then((result) => {
            redisClient.del('products')
            success(res, result, 'Delete success')
        })
        .catch((err) => {
            failed(res, [], err.message)
        })
    }
}

module.exports = product