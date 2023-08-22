
const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');
const Joi = require('joi');

const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// схема
const userSchema = new Schema ({

    name: {
        type: String,
        required: true
    },
    email : {
        type: String,
        match: emailRegexp,
        // проверка перед добавлением что нет обьекта с таким же email
        unique: true,
        required: true
    },
    password : {
        type: String,
        minlength: 6,
        required: true
    },
},  { versionKey: false, timestamps: true } )

// если валидация не прошла - отправляем ошибку

userSchema.post('save', handleMongooseError);

// схемы для регистрации и логина

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

const loginSchema = Joi.object({
   
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

const schemas = {
    registerSchema, loginSchema
}

// создаем модель. Название коллекции + mongoose схема

const User = model("user", userSchema)

module.exports = { schemas, User

}