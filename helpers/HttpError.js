// // // функция получает статус ошибки и сообщение
// const HttpError = (status, message) => {
//     // создает ошибку с нужным сообщением т.к. залетает сюда message
//     const error = new Error(message)
//     // присваивает статус и возвращает его
//     error.status = status
//     return error
// } 


// module.exports = HttpError

// Функция, создающая объект ошибки с указанным статусом и сообщением
const HttpError = (status, message) => {
    const error = new Error(message);
    error.status = status;
    return error;
  };
  
  module.exports = HttpError;