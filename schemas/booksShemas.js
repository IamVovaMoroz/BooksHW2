// const Joi = require('joi')

// // СОЗДАЁМ JOI схему - требования к получаемому обьекту от фронтенда, на соответствие в базе

// const addSchema = Joi.object({
//   title: Joi.string().required(),
//   author: Joi.string().required(),
//   genre: Joi.string().valid("fantasy", "love", "fantastic").optional(),
//   data: Joi.string().regex(/\d{2}-\d{2}-\d{4}/).optional(),
//   favorite: Joi.boolean().optional() // Поле favorite теперь необязательное
// });
//   module.exports = {addSchema}