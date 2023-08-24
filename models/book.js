// // СОЗДАЕМ СХЕМЫ ДЛЯ ПРОВЕРКИ ПРИ ПЕРЕДАЧИ ОБЬЕКТОВ (mongoDB-Mongoose)

// addSchema JOI схема на проверку того что приходит с фронтенда
// bookSchema проверка того что сохраняется в базе. Проверка перед сохранением



const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');
const Joi = require('joi');

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    favorite: { type: Boolean, default: false },
    genre: {
      type: String,
      enum: ['fantasy', 'love', 'fantastic'],
      required: false
    },
    data: {
      type: String,
      match: /\d{2}-\d{2}-\d{4}/,
      required: false
    },
    owner: {
        // строка для записи ид пользователя особая
        type: Schema.Types.ObjectId,
        // записываем с какой коллекции данный ид польз
        ref: "user",
        required: true
    }
  },
  { versionKey: false, timestamps: true }
);

bookSchema.post('save', handleMongooseError);

const addSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  genre: Joi.string().valid('fantasy', 'love', 'fantastic').optional(),
  data: Joi.string().regex(/\d{2}-\d{2}-\d{4}/).optional(),
  favorite: Joi.boolean()
});

const updateFavoriteSchemas = Joi.object({
  
    favorite: Joi.boolean().required()
  });
 
//   при таком импорт const {schemas} = require("../../models/book")
const schemas = {
    addSchema,
    updateFavoriteSchemas
}

const Book = model('book', bookSchema);

// при таком импорт const schemas = require("../../models/book")

// module.exports = { Book, addSchema, updateFavoriteSchemas };

module.exports = { Book, schemas };