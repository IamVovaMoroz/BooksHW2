const { User } = require('../models/user')
const bcrypt = require("bcrypt")

const jwt = require('jsonwebtoken')
// добавление секретного ключа , произв код усложняет токен
const { SECRET_KEY } = process.env

const { HttpError, controllerWrapper } = require('../helpers')

const register = async (req, res) => {
    // запрос на проверку уникальности email , того что отправляют при регистрации, чтобы отправлять не стандартное сообщение на фронтенд
    const {email, password} = req.body
    const user  = await User.findOne({email})

if(user) {
    throw HttpError(409, "Email already in use")
}
const hashPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({...req.body, password: hashPassword})

    res.status(201).json({
        email: newUser.email,
        name: newUser.name
    })
}

const login = async(req, res) => {

    const {email, password} = req.body
// проверяем есть ли в базе такой email
    const user  = await User.findOne({email})

    if(!user){
        throw HttpError(401, "Email or password invalid")
    }
// проверяем пароль что пришёл и что в базе соответствует ли хеширование
    const comparePassword = await bcrypt.compare(password, user.password )
    // если не соответсвует
    if(!comparePassword){
        throw HttpError(401, "Email or password invalid")
    }

    const payload = {
        id: user._id
      }


    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' })

res.json({
    token
})
}


module.exports = {
     register: controllerWrapper(register),
     login: controllerWrapper(login)
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// const jwt = require('jsonwebtoken')

// require('dotenv').config()
// // добавление секретного ключа , произв код усложняет токен
// const { SECRET_KEY } = process.env

// // id пользователя
// const payload = {
//   id: '64e0b674fc0ae62bb1a1f8c7'
// }

// const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' })

// console.log(token)
// // Проверка шифровали ли с помощью нашего ключа токен и не закончился ли срок
// try {
//   const { id } = jwt.verify(token, SECRET_KEY)
//   console.log(id)
// const invalidToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTBiNjc0ZmMwYWU2MmJiMWExZjhjNyIsImlhdCI6MTY5MjcyNTYyNSwiZXhwIjoxNjkyODA4NDI1fQ.1sKWrLeqWR1Djf5Z0CERbCKbQyBz8b0dLMgl1267b8s"
// const result = jwt.verify(invalidToken, SECRET_KEY)
// } catch (error) {
//   console.log(error.message)
// }







// const createHashPassword = async (password) =>{
//     const result = await bcrypt.hash(password, 10)
//     console.log(result)
//     // проверка на хеширования. введенный пасспорт и шиврование проверяем на соответствие хешированию true & false
//     const compareResult = await bcrypt.compare(password, result )
//     console.log(compareResult)
// }

// createHashPassword("1234567")