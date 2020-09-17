const categoryModel = require('../models/category')
const redis = require('redis')
const redisClient = redis.createClient()
const { success, failed, successWithMeta } = require('../helpers/response')

const category = {
    getAll: (req, res) => {
        const search = !req.query.search?'' : req.query.search
        const sort = !req.query.sort?'category' : req.query.sort
        const type = !req.query.sort?'ASC' : req.query.type
        const limit = !req.query.limit? 6 : parseInt(req.query.limit)
        const page = !req.query.page? 1 : parseInt(req.query.page)
        const offset = page===1? 0 : (page-1)*limit
        categoryModel.getAll(search, sort, type, limit, offset)
        .then((result) => {

            redisClient.set('category', JSON.stringify(result)) // <-- save data ke redis

            const totalRow = result[0].count
            const meta = {
                totalRow: totalRow,
                totalPage: Math.ceil(totalRow/limit),
                limit,
                page
            }
            successWithMeta(res, result, meta, 'Get all category success')
        })
        .catch((err) => {
            failed(res, [], err.message)
        })
    },
    getDetail: (req, res) => {
        const id = req.params.id
        categoryModel.getDetail(id)
        .then((result) => {
            success(res, result, 'Get Detail category success')
        })
        .catch((err) => {
            failed(res, [], err.message)
        })
    },
    insert: (req, res) => {
        const body = req.body
        categoryModel.insert(body)
        .then((result) => {
            redisClient.del('category')
            success(res, result, 'Category baru berhasil ditambahkan')
        })
        .catch((err) => {
            failed(res, [], err.message)
        })
    },
    update: (req, res) => {
        const id = req.params.id
        const body = req.body
        categoryModel.update(body, id)
        .then((result) => {
            redisClient.del('category')
            success(res, result, 'Category berhasil diupdate')
        })
        .catch((err) => {
            failed(res, [], err.message)
        })
    },
    // updatePatch: (req, res) => {
    //     const id = req.params.id
    //     const body = req.body
    //     categoryModel.updatePatch(body, id)
    //     .then((result) => {
    //         redisClient.del('category')
    //         success(res, result, 'Category berhasil diupdate')
    //     })
    //     .catch((err) => {
    //         failed(res, [], err.message)
    //     })
    // },
    destroy: (req, res) => {
        const id =  req.params.id
        categoryModel.destroy(id)
        .then((result) => {
            redisClient.del('category')
            success(res, result, 'Category berhasil dihapus')
        })
        .catch((err) => {
            failed(res, [], err.message)
        })
    }
}

module.exports = category