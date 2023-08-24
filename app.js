const express = require('express')
const logger = require('morgan')
const cors = require('cors')
// для работы env
require("dotenv").config()
// путь к роутам booksRouter
const booksRouter = require('./routes/api/booksRouter')

// путь к роутам auth ипмортируем

const authRouter = require('./routes/api/auth')

const reviewRouter = require('./routes/api/reviews');  // ПРОЕКТ импортируем роут

const app = express()



const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
// Экспрес получает тело запроса и должен понять, чтобы он проверил есть ли тело в запросе, если да то какой тип, по заголовку content type из запроса. app.use(express.json())
app.use(express.json())

// все запросы по отзывам обрабатываем роутером!!!  
app.use('/api/reviews', reviewRouter);   // ПРОЕКТ путь для всех роутов


// все запросы /api/auth обрабатываем authRouter
app.use('/api/auth', authRouter)

// все запросы с api/books искать тут booksRouter
app.use('/api/books', booksRouter)
// для отображения сообщения для ссылок , которых нет
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})
// это обработчик ошибок, при выпадении ошиьки и указании next(error) они ищет эту функцию и выполняет то же действие./ err передается 1 из 4 параметров
app.use((err, req, res, next) => {
  // если статус пришёл с try он его запишет, если нет даст 500, аналогично с message
  const {status = 500, message = "Server error" } = err
  res.status(status).json({ message })
  // json({ message }) =>>> ({ message: message })

})

module.exports = app
