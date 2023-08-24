// const Joi = require('joi');
const { HttpError, controllerWrapper } = require('../helpers');
// const books = require('../models/books');
const { Book } = require('../models/book');

const getAll = async (req, res) => {
  // проверяем кто делает запрос ид и ищем этого пользователя книги. populate("owner", "name email") для расширения запроса который вернется в ответе
  const { _id: owner } = req.user;
  // пагинация, параметры увидем, что польз отправил req.query
  const{page = 1, limit = 10} = req.query
  // "-created -updated" то что не возращать в ответе
  const result = await Book.find({ owner }, "-created -updated").populate("owner", "name email");
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Book.findById(id);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

const addBook = async (req, res) => {
  // Destructure the _id property from req.user to get the owner's ID
  const { _id: owner } = req.user;

  try {
    // Create a new Book instance with the provided data and owner
    const result = await Book.create({ ...req.body, owner });

    // Return a success response with status 201
    res.status(201).json(result);
  } catch (error) {
    // Handle any potential errors during book creation
    // You might want to send an appropriate error response here
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Book.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json({ message: 'Delete success' });
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Book.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

const updateByIdFavorite = async (req, res) => {
  const { id } = req.params;
  const result = await Book.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

module.exports = {
  getAll: controllerWrapper(getAll),
  getById: controllerWrapper(getById),
  addBook: controllerWrapper(addBook),
  deleteById: controllerWrapper(deleteById),
  updateById: controllerWrapper(updateById),
  updateByIdFavorite: controllerWrapper(updateByIdFavorite),
};
