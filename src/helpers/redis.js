// const redis = require('redis')
// const { resume } = require('../configs/db')
// const { success, successWithMeta } = require('../helpers/response')
// const _ = require('lodash')

// const redisClient = redis.createClient()

// module.exports = {
//   getProduct: (req, res, next) => {
//     redisClient.get("products", (err, data) => {
//       if (data){
//         const dataRedis = JSON.parse(data)
//         const search = !req.query.search? '' : req.query.search
//         const sort = !req.query.sort? 'id' : req.query.sort
//         const type = !req.query.type? 'asc' : req.query.type
//         const limit = !req.query.limit? 9 : parseInt(req.query.limit)
//         const page = !req.query.page? 1 : parseInt(req.query.page)
//         const start = page===1? 0 : (page*limit)-limit
//         const offset = start===0 ? limit : start*limit

//         if(search!==''){
//           const output = _.filter(dataRedis, (obj) => {
//             return obj.nama_produk.toLowerCase().includes(search)
//           })
//           const output2 = _.slice(output, start, offset)

//           const meta = {
//             totalRow: output.length,
//             totalPage: Math.ceil(output.length/limit),
//             page,
//             limit
//           }
//           successWithMeta(res, output2, meta, 'Get products from redis success')
//         }
//         else if(sort!==''){
//           const output = _.orderBy(dataRedis, [sort], [type])
//           const output2 = _.slice(output, start, offset)

//             totalRow = dataRedis[0].count
//           const meta = {
//             totalRow: totalRow,
//             totalPage: Math.ceil(totalRow/limit),
//             page,
//             limit
//           }
//           successWithMeta(res, output2, meta, 'Get products from redis success')
//         }
//         else {
//           const output = _.slice(dataRedis, start, offset)

//           totalRow = dataRedis[0].count
//           const meta = {
//             totalRow: totalRow,
//             totalPage: Math.ceil(totalRow/limit),
//             page,
//             limit
//           }
//           successWithMeta(res, output, meta, 'get products from redis')
//         }
//       } 
//       else{
//         next()
//       }
//     })
//   },
//   getCategory: (req, res, next) => {
//     redisClient.get("category", (err, data) => {
//       if (data){
//         const dataRedis = JSON.parse(data)
//         const search = !req.query.search? '' : req.query.search
//         const sort = !req.query.sort? 'id' : req.query.sort
//         const type = !req.query.type? 'asc' : req.query.type
//         const limit = !req.query.limit? 6 : parseInt(req.query.limit)
//         const page = !req.query.page? 1 : parseInt(req.query.page)
//         const start = page===1? 0 : (page*limit)-limit
//         const offset = start===0 ? limit : start*limit

//         if(search!==''){
//           const output = _.filter(dataRedis, (obj) => {
//             return obj.category.toLowerCase().includes(search)
//           })
//           const output2 = _.slice(output, start, offset)

//           totalRow = dataRedis[0].count
//           const meta = {
//             totalRow: totalRow,
//             totalPage: Math.ceil(totalRow/limit),
//             limit,
//             page
//           }
//           successWithMeta(res, output2, meta, 'Search category from redis success')
//         }
//         else if(sort!==''){
//           const output = _.orderBy(dataRedis, [sort], [type])
//           const output2 = _.slice(output, start, offset)

//           totalRow = dataRedis[0].count
//           const meta = {
//             totalRow: totalRow,
//             totalPage: Math.ceil(totalRow/limit),
//             limit,
//             page
//           }
//           successWithMeta(res, output2, meta, 'Get category from redis success')
//         }
//         else {
//           const output = _.slice(dataRedis, start, offset)

//           totalRow = dataRedis[0].count
//           const meta = {
//             totalRow: totalRow,
//             totalPage: Math.ceil(totalRow/limit),
//             page,
//             limit
//           }
//           successWithMeta(res, output, meta, 'get category from redis')
//         }
//       } 
//       else{
//         next()
//       }
//     })
//   },
//   getHistory: (req, res, next) => {
//     redisClient.get("history", (err, data) => {
//       if (data){
//         const dataRedis = JSON.parse(data)
//         const search = !req.query.search? '' : req.query.search
//         const sort = !req.query.sort? 'id' : req.query.sort
//         const type = !req.query.type? 'asc' : req.query.type
//         const limit = !req.query.limit? 6 : parseInt(req.query.limit)
//         const page = !req.query.page? 1 : parseInt(req.query.page)
//         const start = page===1? 0 : (page*limit)-limit
//         const offset = start===0 ? limit : start*limit

//         if(search!==''){
//           const output = _.filter(dataRedis, (obj) => {
//             return obj.cashier.toLowerCase().includes(search)
//           })
//           const output2 = _.slice(output, start, offset)

//           const meta = {
//             totalRow: output.length,
//             totalPage: Math.ceil(output.length/limit),
//             page,
//             limit
//           }
//           successWithMeta(res, output2, meta, 'Get history from redis success')
//         }
//         else if(sort!==''){
//           const output = _.orderBy(dataRedis, [sort], [type])
//           const output2 = _.slice(output, start, offset)

//             totalRow = dataRedis[0].count
//           const meta = {
//             totalRow: totalRow,
//             totalPage: Math.ceil(totalRow/limit),
//             page,
//             limit
//           }
//           successWithMeta(res, output2, meta, 'Get history from redis success')
//         }
//         else {
//           const output = _.slice(dataRedis, start, offset)

//           totalRow = dataRedis[0].count
//           const meta = {
//             totalRow: totalRow,
//             totalPage: Math.ceil(totalRow/limit),
//             page,
//             limit
//           }
//           successWithMeta(res, output, meta, 'get history from redis')
//         }
//       } 
//       else{
//         next()
//       }
//     })
//   }
// }