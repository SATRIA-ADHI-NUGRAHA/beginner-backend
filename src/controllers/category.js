const categoryModel = require('../models/category')
const { success, failed, successWithMeta } = require('../helpers/response')

const category = {
    getAll: (req, res) => {
        const category_name = req.query.category_name
        categoryModel.getAll(category_name)
        .then((result) => {
            success(res, result, 'Get all category success')
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
            success(res, result, 'Category berhasil diupdate')
        })
        .catch((err) => {
            failed(res, [], err.message)
        })
    },
    updatePatch: (req, res) => {
        const id = req.params.id
        const body = req.body
        categoryModel.updatePatch(body, id)
        .then((result) => {
            success(res, result, 'Category berhasil diupdate')
        })
        .catch((err) => {
            failed(res, [], err.message)
        })
    },
    destroy: (req, res) => {
        const id =  req.params.id
        categoryModel.destroy(id)
        .then((result) => {
            success(res, result, 'Category berhasil dihapus')
        })
        .catch((err) => {
            failed(res, [], err.message)
        })
    }
}

module.exports = category