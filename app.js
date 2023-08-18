const express = require('express')
const logger = require('morgan')
const cors = require('cors')
// путь к роутам
const booksRouter = require('./routes/api/booksRouter')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
// все запросы с api/books искать тут booksRouter
app.use('/api/books', booksRouter)
// для отображения сообщения для ссылок , которых нет
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})
// это обработчик ошибок, при выпадении ошиьки и указании next(error) они ищет эту функцию и выполняет то же действие
app.use((err, req, res, next) => {
  res.status(800).json({ message: err.message })
})

module.exports = app
