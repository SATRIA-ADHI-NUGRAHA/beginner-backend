const hostoryModel = require('../models/history')
const { success, failed } = require('../helpers/response')

const history = {
    getAll: (req, res) => {
        const recentOrders = req.query.recentOrders
        const sort = !req.query.sort?'cashier' : req.query.sort
        const type = !req.query.type?'ASC' :req.query.type
        const limit = !req.query.limit? 5 : parseInt(req.query.limit)
        const page = !req.query.page? 1 : parseInt(req.query.page)
        const offset = page===1? 0 : (page-1)*limit
        hostoryModel.getAll(recentOrders, sort, type, limit, offset)
        .then((result) => {
            success(res, result, 'Get all product success')
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
            success(res, result, 'Delete success')
        })
        .catch((err) => {
            failed(res, [], err.message)
        })
    },
    sort: (req, res) => {
        const date = req.query.date
        hostoryModel.sort(date)
        .then((result) => {
            success(res, result, 'Pengurutan success')
        })
        .catch((err) => {
            failed(res, [], err.message)
        })
    }
}

module.exports = history