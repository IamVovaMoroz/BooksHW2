const Joi = require('joi')

// СОЗДАЁМ JOI схему - требования к получаемому обьекту от фронтенда, на соответствие в базе

const addSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required()
  })

  module.exports = {addSchema}