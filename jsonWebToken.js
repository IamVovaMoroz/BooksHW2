const jwt = require('jsonwebtoken')

require('dotenv').config()
// добавление секретного ключа , произв код усложняет токен
const { SECRET_KEY } = process.env

// id пользователя
const payload = {
  id: '64e0b674fc0ae62bb1a1f8c7'
}

const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' })

console.log(token)
// Проверка шифровали ли с помощью нашего ключа токен и не закончился ли срок
try {
  const { id } = jwt.verify(token, SECRET_KEY)
  console.log(id)
const invalidToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTBiNjc0ZmMwYWU2MmJiMWExZjhjNyIsImlhdCI6MTY5MjcyNTYyNSwiZXhwIjoxNjkyODA4NDI1fQ.1sKWrLeqWR1Djf5Z0CERbCKbQyBz8b0dLMgl1267b8s"
const result = jwt.verify(invalidToken, SECRET_KEY)
} catch (error) {
  console.log(error.message)
}
