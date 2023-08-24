// const Joi = require('joi');
const { HttpError, controllerWrapper } = require('../helpers');
// const books = require('../models/books');
const { Review } = require('../models/review');




// получение всех отзывов,
  const getAllReviews = async (req, res) => {
     
     const result = await Review.find()
     
    res.json(result)
  }

  const getUserReview = async (req, res) => {
    // получили ид введённое пользователем из req.params
    const { id } = req.params
    // получаем с помощью функц getById книгу из базы с ид пользователя
    // const result = await books.getById(id)
  
    // 1) Book.findOne( {_id : id})
    // const result = await Book.findOne( {_id : id})
    // 2) Book.findById( id )


    
    const result = await Review.findById(id)
  
    // если книги с таким ил нет в базе
    if (!result) {
      // HttpError если поймал ошибку кидает в catch , тот или status и message получает и выдаёт, или с правой стороны по умолчанию то что записали 500 и "Server error"
      throw HttpError(404, 'Not found')
  
      // return res.status(404).json({message: "Not found"})
    }
    // отправляем результат на фронтенд
    res.json(result)
  }



// const getUserReview = async (req, res) => {
//   // проверяем кто делает запрос ид и ищем этого пользователя книги. populate("owner", "name email") для расширения запроса который вернется в ответе
//   const { _id: owner } = req.user;
//   // пагинация, параметры увидем, что польз отправил req.query
//   const{page = 1, limit = 10} = req.query
//   // "-created -updated" то что не возращать в ответе
//   const result = await Book.find({ owner }, "-created -updated").populate("owner", "name email");
//   res.json(result);
// };

// const getById = async (req, res) => {
//   const { id } = req.params;
//   const result = await Book.findById(id);
//   if (!result) {
//     throw HttpError(404, 'Not found');
//   }
//   res.json(result);
// };

const addReview = async (req, res) => {
    // используем схему нашу addSchema, вызываем метод validate, который проверит req.body
    const { _id: owner } = req.user;
    //   ЭТУ ОШИЬКУ ПЕРЕНЕСЛИ ВВАЛИДЕЙТ БОДИ
    //   const { error } = addSchema.validate(req.body)
  
 // Проверяем, есть ли отзыв от данного пользователя в базе
 const existingReview = await Review.findOne({ owner });

 if (existingReview) {
   return res.status(400).json({ message: 'You can only add one review.' });
 }

    //   // если обьект прошёл валидацию, проверку успешно - error - undefined, если не прошёл проверку в error залетит какая ошибка в соответствии с валидатором . к примеру "author" is required
  
    //   if (error) {
    //     throw HttpError(400, error.message)
    //   }
    // если проверку все прошло от addSchema то отправляем запрос на сервер с телом для добавляения и выкидываем статус
  
    // для работы с файлом JSON в папке
    // const result = await books.addBook(req.body)

  // Если отзыва еще нет, добавляем его
    const result = await Review.create({ ...req.body, owner })
    // если добавили статус 201 и отправляем результат на фронтенд
    res.status(201).json(result)
  }




const deleteReviewById = async (req, res) => {
    const { id } = req.params;
    const { _id: owner } = req.user;
  // проверяем есть ли у пользователя отзывы по этому ИД в базе
    const review = await Review.findById(id);
  
    if (!review) {
      throw HttpError(404, 'Review not found');
    }
  
    console.log("Review owner:", review.owner);
    console.log("Current user:", owner);
   // Проверяем, принадлежит ли отзыв текущему пользователю
    if (review.owner.equals(owner)) {
      const result = await Review.findByIdAndRemove(id);
    //   если нет, то ошибка
      if (!result) {
        throw HttpError(404, 'Not found');
      }
    //   если да, то удаляем
      res.json({ message: 'Delete success' });
    } else {
      throw HttpError(403, "You don't have permission to delete this review");
    }
  };

// const updateById = async (req, res) => {
//   const { id } = req.params;
//   const result = await Book.findByIdAndUpdate(id, req.body, { new: true });
//   if (!result) {
//     throw HttpError(404, 'Not found');
//   }
//   res.json(result);
// };

// const updateByIdFavorite = async (req, res) => {
//   const { id } = req.params;
//   const result = await Book.findByIdAndUpdate(id, req.body, { new: true });
//   if (!result) {
//     throw HttpError(404, 'Not found');
//   }
//   res.json(result);
// };

module.exports = {
  getAllReviews: controllerWrapper(getAllReviews),
  getUserReview: controllerWrapper(getUserReview),
  addReview: controllerWrapper(addReview),
  deleteReviewById: controllerWrapper(deleteReviewById),
//   updateById: controllerWrapper(updateById),
//   updateByIdFavorite: controllerWrapper(updateByIdFavorite),
};
