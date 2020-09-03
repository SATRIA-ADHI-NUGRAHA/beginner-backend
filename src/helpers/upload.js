const multer = require('multer')
// const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}.png`)
    }
})

const upload = multer({
    storage
})

module.exports = upload