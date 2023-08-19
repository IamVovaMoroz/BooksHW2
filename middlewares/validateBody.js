const {HttpError} = require("../helpers")

// мидлвар получает joi схему, вызывает функцию которая делает валидацию
const validateBody = shema => {

    const func = (req, res, next) => {
// берем нашу схему и проверяем по ней наше тело , если есть ошибка отправляем её в next
        const {error} = shema.validate(req.body)
// next прерывает как return , если есть ошибка отпраяляем дальше
if(error){
    next(HttpError(400, error.message))
}
    // если ошиьки нет, дальше    
next()
    }
    return func
}

module.exports = validateBody

// const validateBody = shema => {

//     const func = (req, res, next) => {
// // берем нашу схему и проверяем по ней наше тело , если есть ошибка отправляем её в next
//         const {error} = shemas.addShema.validate(req.body)
// // next прерывает как return , если есть ошибка отпраяляем дальше
// if(error){
//     next(HttpError(400, error.message))
// }
//     // если ошиьки нет, дальше    
// next()
//     }
//     return func
// }

// module.exports = validateBody

// После этого иден не на контролер уже а в app.use((err, req, res, next)) при ошибке!!! Если нет то next идёт дальше