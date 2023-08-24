// ПОЛУЧАЕМ ОТЗЫВЫ С БЕКЭНДА И ОТПРАВЛЯЕМ НА ФРОНТЕНД. ФРОНТЕНДУ НУЖНО ОТПРАВЛЯТЬ ОШИБКИ
const express = require('express')

const reviewController = require("../../controllers/reviewController")

const router = express.Router()

// router.get('/',  authenticate, bookController.getAll )

// 1) получить отзывы всех пользователей GET /reviews
router.get('/', reviewController.getAllReviews)

// 2) получить отзыв пользователя GET /reviews/own
// router.get('/:id', authenticate, reviewController.getUserReview)

// 3 ) Добавление отзыва пользователем POST /reviews/own

// router.post(
//   '/:id',
//   authenticate,
//   validateBody(schemas.reviewSchema),
//   reviewController.addReview
// )

//  4) Редактирование своего отзыва пользователем PATCH /reviews/own

// router.patch(
//   '/:id',
//   authenticate,
//   validateBody(schemas.updateReviewSchemas),
//   reviewController.updateByIReview
// )

//  5) Удаление отзыва пользователем

// router.delete('/:id', authenticate, reviewController.deleteReview)

module.exports = router
