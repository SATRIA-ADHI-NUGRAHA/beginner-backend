const express = require('express')

const bodyParser = require('body-parser')
const productRouter = require('./src/routes/product')
const categoryRouter = require('./src/routes/category')
const historyRouter = require('./src/routes/history')
const cors = require('cors')
const { PORT } = require('./src/helpers/env')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/product',productRouter)
app.use('/category',categoryRouter)
app.use('/history',historyRouter)
app.use(express.static('src/uploads'))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
