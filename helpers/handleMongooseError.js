 // Создаем хук для обработки ошибок событий, для того чтобы в mongoose указывать правильные статусы при необходимости

const handleMongooseError = (error, data, next) => {
    error.status = 400
next()
};

module.exports = handleMongooseError