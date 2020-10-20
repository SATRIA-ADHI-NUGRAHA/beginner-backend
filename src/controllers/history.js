const hostoryModel = require('../models/history')
const { success, failed, successWithMeta } = require('../helpers/response')
// const redis = require('redis')
const { database } = require('../helpers/env')
// const redisClient = redis.createClient()

const history = {
    getAll: (req, res) => {
        const search = !req.query.search?'' : req.query.search
        const sort = !req.query.sort?'cashier' : req.query.sort
        const type = !req.query.type?'ASC' :req.query.type
        const limit = !req.query.limit? 6 : parseInt(req.query.limit)
        const page = !req.query.page? 1 : parseInt(req.query.page)
        const offset = page===1? 0 : (page-1)*limit
        hostoryModel.getAll(search, sort, type, limit, offset)
        .then((result) => {

            // redisClient.set('history', JSON.stringify(result)) // <-- save data ke redis

            const totalRow = result[0].count
            const meta = {
                totalRow: totalRow,
                totalPage: Math.ceil(totalRow/limit),
                limit,
                page
            }
            successWithMeta(res, result, meta, 'Get all history success')
        })
        .catch((err) => {
            failed(res, [], err.message)
        })
    },
    getDetail: (req, res) => {
        const id = req.params.id
        hostoryModel.getDetail(id)
        .then((result) => {
            success(res, result, 'Get Detail history success')
        })
        .catch((err) => {
            failed(res, [], err.message)
        })
    },
    insert: (req, res) => {
        const body = req.body
        hostoryModel.insert(body)
        .then((result) => {
            // redisClient.del('history')
            success(res, result, 'Data berhasil dimasukkan')
        })
        .catch((err) => {
            failed(res, [], err.message)
        })
    },
    update: (req, res) => {
        const id = req.params.id
        const body = req.body
        hostoryModel.update(body, id)
        .then((result) => {
            // redisClient.del('history')
            success(res, result, 'Data berhasil diupdate')
        })
        .catch((err) => {
            failed(res, [], err.message)
        })
    },
    destroy: (req, res) => {
        const id =  req.params.id
        hostoryModel.destroy(id)
        .then((result) => {
            // redisClient.del('history')
            success(res, result, 'Delete success')
        })
        .catch((err) => {
            failed(res, [], err.message)
        })
    }
    // sort: (req, res) => {
    //     const date = req.query.date
    //     hostoryModel.sort(date)
    //     .then((result) => {
    //         success(res, result, 'Pengurutan success')
    //     })
    //     .catch((err) => {
    //         failed(res, [], err.message)
    //     })
    // }
}

module.exports = history