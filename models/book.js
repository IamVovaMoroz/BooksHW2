// СОЗДАЕМ СХЕМЫ ДЛЯ ПРОВЕРКИ ПРИ ПЕРЕДАЧИ ОБЬЕКТОВ 

const {Schema, model} = require("mongoose")
// для 
const bookSchema = new Schema({

    title: String,
    author: String,


})

// book просто название обьекта с базе в единственном числе
const Book = model("book", bookSchema)

module.exports = Book