const productModel = require('../models/product')
const { success, failed, successWithMeta } = require('../helpers/response')

const product = {
    getAll: (req, res) => {
        const namaProduk = !req.query.namaProduk?'' : req.query.namaProduk
        const sort = !req.query.sort?'harga' : req.query.sort
        const type = !req.query.sort?'ASC' : req.query.type
        const limit = !req.query.limit? 5 : parseInt(req.query.limit)
        const page = !req.query.page? 1 : parseInt(req.query.page)
        const offset = page===1? 0 : (page-1)*limit
        productModel.getAll(namaProduk, sort, type, limit, offset)
        .then((result) => {
            const totalRow = result[0].count
            const meta = {
                totalRow: totalRow,
                totalPage: Math.ceil(totalRow/limit),
                page
            }
            successWithMeta(res, result, meta, 'Get all product success')
        })
        .catch((err) => {
            failed(res, [], err.message)
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
        const body = req.body
        body.gambar = req.file.filename
        productModel.insert(body)
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
        body.gambar = !req.file ? '': req.file.filename
        productModel.update(body, id)
        .then((result) => {
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
            success(res, result, 'Delete success')
        })
        .catch((err) => {
            failed(res, [], err.message)
        })
    }
}

module.exports = product