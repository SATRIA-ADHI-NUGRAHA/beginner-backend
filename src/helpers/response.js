const response = {
    success: (res, data, message) => {
        const result = {
            message,
            success: true,
            code:200,
            status:'OK',
            data
        }
        res.json(result)
    },
    failed: (res, data, message) => {
        const result = {
            message,
            success: false,
            code:500,
            status: 'Error',
            data
        }
        res.json(result)
    },
    successWithMeta: (res, data, meta, message) => {
        const result = {
            message,
            success: true,
            code:200,
            meta:meta,
            data:data
        }
        res.json(result)
    },
    tokenResult: (res, data, message) => {
        const result = {
            message,
            success: true,
            code:200,
            data
        }
        res.json(result)
    },
    tokenResultErr: (res, data, message) => {
        const result = {
            message,
            success: false,
            code:500,
            data
        }
        res.json(result)
    },
    tokenResultExpired: (res, data, message) => {
        const result = {
            message,
            success: false,
            code:500,
            data
        }
        res.status(500).json(result)
    }
}

module.exports = response