// const { isValidObjectId } = require('mongoose');
// const { HttpError } = require('../helpers/HttpError');

// const isValidId = (req, res, next) => {
//   const { id } = req.params;

//   // Исправлена ошибка в проверке валидности ObjectId
//   if (!isValidObjectId(id)) {
//     // Исправлено создание ошибки, добавлен вызов конструктора
//     return next(new HttpError(400, `${id} is not a valid id`));
//   }

//   // Вызов next() необходимо делать только при успешной валидации
//   next();
// };

// module.exports = isValidId;

// isValidId.js

const { isValidObjectId } = require('mongoose');
const HttpError = require('../helpers/HttpError'); 

const isValidId = (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    // Используем HttpError как функцию, а не как конструктор
    return next(HttpError(400, `${id} is not a valid id`));
  }

  next();
};

module.exports = isValidId;
