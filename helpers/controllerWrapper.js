// Декоратор функции. Функция, которая получает функцию и возращает обвертку
// controllerWrapper получает controller и создает функцию обвертку
// Т.е получаем controller и оборачиваем контроллер в try, catch



// если в контроллере возникла ошибка, функция поймает её и передаст в catch
const controllerWrapper = controller => {
// функция получает (req, res, next)
    const func = async (req, res, next) => {
        try{
            // функция вызывает controller передавая ему наши (req, res, next)
            await controller(req, res, next)
        }catch(error){
            next(error)
        }
    }
    return func
}

module.exports = controllerWrapper


// пример как происходит оборачивание в декоратор getAll/ аналогично другие  

// const controllerWrapper = getAll => {
//     // функция получает (req, res, next)
//         const func = async (req, res, next) => {
//             try{
//                 // функция вызывает controller передавая ему наши (req, res, next)
//                 await getAll(req, res, next)
//             }catch(error){
//                 next(error)
//             }
//         }
//         return func
//     }
    
//     module.exports = controllerWrapper

// 1) обвертка получает функцию  getAll 
// 2) функция получает (req, res, next) из запроса и getAll обрабатывает их
//  3) Но сама функция уже обернутая в try catch возращается назад уже обернутая



