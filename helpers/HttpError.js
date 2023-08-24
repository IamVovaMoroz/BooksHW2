// // // функция получает статус ошибки и сообщение
// const HttpError = (status, message) => {
//     // создает ошибку с нужным сообщением т.к. залетает сюда message
//     const error = new Error(message)
//     // присваивает статус и возвращает его
//     error.status = status

// Функция, создающая объект ошибки с указанным статусом и сообщением
const errorMessage = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not found",
    409: "Conflict"
}
// если message не пришёл, возми стандартный из списка. аналог пакет http error
const HttpError = (status, message = errorMessage[status]) => {
    const error = new Error(message);
    error.status = status;
    return error;
  };
  
  module.exports = HttpError;


