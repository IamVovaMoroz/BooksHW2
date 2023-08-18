// ПОЛУЧАЕМ КНИГИ С БЕКЭНДА И ОТПРАВЛЯЕМ НА ФРОНТЕНД. ФРОНТЕНДУ НУЖНО ОТПРАВЛЯТЬ ОШИБКИ
const express = require('express')

const router = express.Router()

// импортируем функцию обработки и создания ошибок и статусов

const {HttpError} = require("../../helpers")


// импортируем обьект работы с книгами 
const books = require("../../models/books")

// получение всех книг
router.get('/', async (req, res) => {
  try {
    const result = await books.getAll()
    res.json(result)
  } catch (error) {
   res.status(500).json({message: "Server error"})
  }
})


// получение книги по ид(:id) который нужно прочитать из req.params мы получаем значение введённое пользователем

router.get('/:id', async (req, res, next) => {
  try{
    // получили ид введённое пользователем из req.params
const {id} = req.params
// получаем с помощью функц getById книгу из базы с ид пользователя 
const result = await books.getById(id)
// если книги с таким ил нет в базе
if(!result){

  // HttpError если поймал ошибку кидает в catch , тот или status и message получает и выдаёт, или с правой стороны по умолчанию то что записали 500 и "Server error"
throw HttpError(404, "Not found")

  // return res.status(404).json({message: "Not found"})
}
// отправляем результат на фронтенд
res.json(result)
  }catch (error) {
    // next(error) - это обработчик ошибок, он ищет где есть 4 параметра 
    next(error)
    // const {status = 500, message = "Server error"} = error
    // res.status(status).json({message: message})

    // res.status(500).json({message: "Server error"})
   }
})

router.post('/', async (req, res, next) => {
  // try{}catch(error){}
})

router.delete('/:id', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:id', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
