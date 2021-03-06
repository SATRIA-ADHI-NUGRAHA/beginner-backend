const express = require('express')

const bodyParser = require('body-parser')
const productRouter = require('./src/routes/product')
const categoryRouter = require('./src/routes/category')
const historyRouter = require('./src/routes/history')
const usersRouter = require('./src/routes/users')
const transaksiRouter = require('./src/routes/transaksi')
const cors = require('cors')
const { PORT } = require('./src/helpers/env')
const path = require('path')
const ejs = require('ejs')

const app = express()

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, './dist')));
app.use('*', (req, res) => {
  res.sendFile(__dirname, './dist/index.html')
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use(express.static('src/uploads'))
app.use('/product',productRouter)
app.use('/category',categoryRouter)
app.use('/history',historyRouter)
app.use('/users',usersRouter)
app.use('/transaksi',transaksiRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
