//  authenticate  пользователя при login. Плюс записываем нового пользователя в req.user = user и можем использовать где угодно в обьекте
const { HttpError } = require('../helpers')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = process.env

const { User } = require('../models/user')

const authenticate = async (req, res, next) => {
  // authorization из запроса отправки берём
  const { authorization = '' } = req.headers
  // отделим слово bearer и токен с заголовка
  const [bearer, token] = authorization.split(' ')

  if (bearer !== 'Bearer') {
    next(HttpError(401))
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY)
    console.log(id)
    // проверяем есть ли человек с токеном в базе
    const user = await User.findById(id)
    if (!user) {
      next(HttpError(401))
      //   next(HttpError(401, "User not found"))
    }
    // добавляем в обект ключ user , если его нашли, который явл. юзером, которого нашли
    req.user = user
    next()
  } catch (error) {
    next(HttpError(401))
    // console.log(error.message)
  }
}

module.exports = authenticate
