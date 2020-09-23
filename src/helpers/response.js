const response = {
    success: (res, data, message) => {
        const result = {
            message,
            success: true,
            code:111,
            data
        }
        res.json(result)
    },
    failed: (res, data, message) => {
        const result = {
            message,
            success: false,
            code:000,
            data
        }
        res.json(result)
    },
    successWithMeta: (res, data, meta, message) => {
        const result = {
            message,
            success: true,
            code:111,
            meta:meta,
            data:data
        }
        res.json(result)
    },
    tokenResult: (res, data, message) => {
        const result = {
            message,
            success: true,
            code:111,
            data
        }
        res.json(result)
    },
    tokenResultErr: (res, data, message) => {
        const result = {
            message,
            success: true,
            code:333,
            data
        }
        res.status(333).json(result)
    },
    tokenResultExpired: (res, data, message) => {
        const result = {
            message,
            success: true,
            code:334,
            data
        }
        res.status(334).json(result)
    }
}

module.exports = response