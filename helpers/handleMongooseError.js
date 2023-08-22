 // Создаем хук для обработки ошибок событий, для того чтобы в mongoose указывать правильные статусы при необходимости
// при дубле email при регистрации статус 409
const handleMongooseError = (error, data, next) => {
    const {name, code} = error
const status = (name === "MongoServerError" && code === 11000) ? 409 : 400
  error.status = status
next()
};

module.exports = handleMongooseError