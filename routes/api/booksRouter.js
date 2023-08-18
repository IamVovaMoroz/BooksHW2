// ПОЛУЧАЕМ КНИГИ С БЕКЭНДА И ОТПРАВЛЯЕМ НА ФРОНТЕНД. ФРОНТЕНДУ НУЖНО ОТПРАВЛЯТЬ ОШИБКИ
const express = require('express')

// ДЛЯ ПРОВЕРКИ ТЕЛА ПОЛУЧЕННОГО ОТ ФРОНТЕНДА ИСПОЛЬЗУЕМ JOI

// const Joi = require("joi")

const bookController = require("../../controllers/bookController")

const router = express.Router()

// импортируем функцию обработки и создания ошибок и статусов

// const {HttpError} = require("../../helpers")

// // импортируем обьект работы с книгами 
// const books = require("../../models/books")

// СОЗДАЁМ JOI схему - требования к получаемому обьекту от фронтенда, на соответствие в базе

// const addSchema = Joi.object({
//   title: Joi.string().required(),
//   author: Joi.string().required(),
// })


// 1) ПОЛУЧЕНИЕ ВСЕХ КНИГ ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// router.get('/', async (req, res, next) => {
//   try {
//     const result = await books.getAll()
//     res.json(result)
//   } catch (error) {
//    res.status(500).json({message: "Server error"})
//   }
// })

router.get('/', bookController.getAll )



// 2) ПОЛУЧЕНИЕ КНИГИ ПО ИД (:id) который нужно прочитать из req.params мы получаем значение введённое пользователем ++++++++++++++++++++++++++++++++++++++++++

router.get('/:id', bookController.getById)

// 3) ДОБАВЛЕНИЕ КНИГ В БАЗУ  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//  Для получения тела запроса обращаемся с фронтенда от пользователя = req.body
router.post('/', bookController.addBook )

//  4) УДАЛЕНИЕ ПО ИД +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

router.delete('/:id', bookController.deleteById)


//  5) ОБНОВЛЕНИЕ КНИГИ ПО ИД +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

router.put('/:id', bookController.updateById)

module.exports = router
