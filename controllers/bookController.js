// ДЛЯ ПРОВЕРКИ ТЕЛА ПОЛУЧЕННОГО ОТ ФРОНТЕНДА ИСПОЛЬЗУЕМ JOI

const Joi = require('joi')

// const router = express.Router()

// импортируем функцию обработки и создания ошибок и статусов

const { HttpError, controllerWrapper } = require('../helpers')

// импортируем обьект работы с книгами
const books = require('../models/books')

// СОЗДАЁМ JOI схему - требования к получаемому обьекту от фронтенда, на соответствие в базе

const addSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required()
})

// +++++++++++++++++++++++++++++++++++++++++ Без декоратор функция
// const getAll =  async (req, res, next) => {
//     try {
//       const result = await books.getAll()
//       res.json(result)
//     } catch (error) {
//      res.status(500).json({message: "Server error"})
//     }
//   }

// ++++++++++++++++++++++++++++++++++++++++++ с декоратором убираем try, catch и в контролер оборачиваем внизу
const getAll = async (req, res) => {
  const result = await books.getAll()

  res.json(result)
}

// +++++++++++++++++++++++++++++++++++

//   const getById = async (req, res, next) => {
//     try{
//       // получили ид введённое пользователем из req.params
//   const {id} = req.params
//   // получаем с помощью функц getById книгу из базы с ид пользователя
//   const result = await books.getById(id)
//   // если книги с таким ил нет в базе
//   if(!result){

//     // HttpError если поймал ошибку кидает в catch , тот или status и message получает и выдаёт, или с правой стороны по умолчанию то что записали 500 и "Server error"
//   throw HttpError(404, "Not found")

//     // return res.status(404).json({message: "Not found"})
//   }
//   // отправляем результат на фронтенд
//   res.json(result)
//     }catch (error) {
//       // next(error) - это обработчик ошибок, он ищет где есть 4 параметра
//       next(error)
//       // АНАЛОГИНЧЫЕ ЗАПИСИ 1 или 2
//       // 1 ++++++++
//       // const {status = 500, message = "Server error"} = error
//       // res.status(status).json({message: message})
//      // 2 +++++++++
//       // res.status(500).json({message: "Server error"})
//      }
//   }

//   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const getById = async (req, res) => {
  // получили ид введённое пользователем из req.params
  const { id } = req.params
  // получаем с помощью функц getById книгу из базы с ид пользователя
  const result = await books.getById(id)
  // если книги с таким ил нет в базе
  if (!result) {
    // HttpError если поймал ошибку кидает в catch , тот или status и message получает и выдаёт, или с правой стороны по умолчанию то что записали 500 и "Server error"
    throw HttpError(404, 'Not found')

    // return res.status(404).json({message: "Not found"})
  }
  // отправляем результат на фронтенд
  res.json(result)
}
// +++++++++++++++++++++++++++++++++++++++++++

const addBook = async (req, res) => {
  // используем схему нашу addSchema, вызываем метод validate, который проверит req.body


//   ЭТУ ОШИЬКУ ПЕРЕНЕСЛИ ВВАЛИДЕЙТ БОДИ
//   const { error } = addSchema.validate(req.body)

//   // если обьект прошёл валидацию, проверку успешно - error - undefined, если не прошёл проверку в error залетит какая ошибка в соответствии с валидатором . к примеру "author" is required

//   if (error) {
//     throw HttpError(400, error.message)
//   }
  // если проверку все прошло от addSchema то отправляем запрос на сервер с телом для добавляения и выкидываем статус
  const result = await books.addBook(req.body)
  // если добавили статус 201 и отправляем результат на фронтенд
  res.status(201).json(result)
}

const deleteById = async (req, res) => {
  const { id } = req.params
  const result = await books.deleteById(id)

  // если книги с таким ил нет в базе
  if (!result) {
    // HttpError если поймал ошибку кидает в catch , тот или status и message получает и выдаёт, или с правой стороны по умолчанию то что записали 500 и "Server error"
    throw HttpError(404, 'Not found')
  }

  res.json({ message: 'Delete success' })
}

const updateById = async (req, res) => {
  // проверяем тело запроса что соответсвует требованиям Joi
  // используем схему нашу addSchema, вызываем метод validate, который проверит req.body
//   const { error } = addSchema.validate(req.body)

//   // если обьект прошёл валидацию, проверку успешно - error - undefined, если не прошёл проверку в error залетит какая ошибка в соответствии с валидатором . к примеру "author" is required

//   if (error) {
//     throw HttpError(400, error.message)
//   }
  // если все впорядке, обновляем. Берем Ид отправленный с фронтенда
  const { id } = req.params
  // отправляем запрос на изменения id из ссылки, req.body - все тело отправленное нам с фронтенда

  const result = await books.updateById(id, req.body)
  // если книги с таким ил нет в базе
  if (!result) {
    // HttpError если поймал ошибку кидает в catch , тот или status и message получает и выдаёт, или с правой стороны по умолчанию то что записали 500 и "Server error"
    throw HttpError(404, 'Not found')
  }
  // если получилось обновить рез на фронт высылаем
  res.json(result)
}

module.exports = {
  // getAll, без декоратора, внизу оборачиваем в декоратор.
  // getAll сохраняется завернутым в декоратор
  getAll: controllerWrapper(getAll),
  getById: controllerWrapper(getById),
  addBook: controllerWrapper(addBook),
  deleteById: controllerWrapper(deleteById),
  updateById: controllerWrapper(updateById)
}
