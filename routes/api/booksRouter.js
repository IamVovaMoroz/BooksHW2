// ПОЛУЧАЕМ КНИГИ С БЕКЭНДА И ОТПРАВЛЯЕМ НА ФРОНТЕНД. ФРОНТЕНДУ НУЖНО ОТПРАВЛЯТЬ ОШИБКИ
const express = require('express')

// ДЛЯ ПРОВЕРКИ ТЕЛА ПОЛУЧЕННОГО ОТ ФРОНТЕНДА ИСПОЛЬЗУЕМ JOI

// const Joi = require("joi")

const bookController = require("../../controllers/bookController")

const {validateBody, isValidId} = require("../../middlewares")

// const schemas = require("../../schemas/booksShemas")

const {schemas} = require("../../models/book")
const router = express.Router()



// 1) ПОЛУЧЕНИЕ ВСЕХ КНИГ ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// router.get('/', async (req, res, next) => {
//   try {
//     const result = await books.getAll()
//     res.json(result)
//   } catch (error) {
//    res.status(500).json({message: "Server error"})
//   }
// })


// validateBody(schemas.addSchema) мы передаем схему и она возращает нам функцию


router.get('/', bookController.getAll )



// 2) ПОЛУЧЕНИЕ КНИГИ ПО ИД (:id) который нужно прочитать из req.params мы получаем значение введённое пользователем ++++++++++++++++++++++++++++++++++++++++++

router.get('/:id', isValidId,  bookController.getById)

// 3) ДОБАВЛЕНИЕ КНИГ В БАЗУ  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//  Для получения тела запроса обращаемся с фронтенда от пользователя = req.body
router.post('/', validateBody(schemas.addSchema), bookController.addBook )

//  4) УДАЛЕНИЕ ПО ИД +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

router.delete('/:id', isValidId, bookController.deleteById)


//  5) ОБНОВЛЕНИЕ КНИГИ ПО ИД +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

router.put('/:id', isValidId, validateBody(schemas.addSchema),  bookController.updateById)

// 6) обновление favorite. patch - когда точно знаем поле для обновления

router.patch('/:id/favorite', isValidId, validateBody(schemas.updateFavoriteSchemas),  bookController.updateByIdFavorite)



module.exports = router
