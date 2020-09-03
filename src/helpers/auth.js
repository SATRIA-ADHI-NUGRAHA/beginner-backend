const auth = (req, res, next) => {
        const masuk = req.headers.masuk
        if(masuk ==='123'){
            next()
        }else{
            res.json({
                msg:'Tidak diijinkan masuk'
            })
        }
    }

module.exports = auth