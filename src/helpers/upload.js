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
    storage,
    limits: { fileSize: 500000 },
    fileFilter(req, file, callback){
        if(file.originalname.match(/\.(png|jpg)\b/)){
            callback(null, true)
        }else{
            callback('Image type must png or jpg', null)
        }
    }
})

module.exports = upload