// index.js - метод для получения книг из json и экспортируем этот метод(функцию) Try  catch, При ошибке на фронтенд вернуть статус и сообщение
// нужно прочитать json file

const fs = require('fs').promises
// для получения абсолютного пути
const path = require('path')

const { nanoid } = require('nanoid')

// const booksPath = path.join(__dirname, "", "books.json" )
const booksPath = path.join(__dirname, 'books1.json')

// console.log(booksPath)

const getAll = async () => {
  const data = await fs.readFile(booksPath, 'utf-8')
  // т.к JSON.parse(data) тоже делает что и "utf-8", можно не писать это
  // const data = await fs.readFile(booksPath)
  // возвращаем текст распарсенный
  return JSON.parse(data)
}

const getById = async (id) => {
  // получаем все книги
  const books = await getAll()

  const bookId = String(id)
  // ищем с нужным ид, что прилетел
  const result = books.find(item => item.id === bookId)
  // чтобы не возращалась undefined , то результат или null
  return result || null
}

// создаем функцию добавления книши с ИД
const addBook = async data => {
  // получаем весь массив in books
  const books = await getAll()

  const newBook = {
    // add id
    id: nanoid(),
    // данные распыляем data(title , author)
    ...data
  }
  // в массив добавляем нокую книгу
  books.push(newBook)
  // перезаписать json используя метод writeFile
  // JSON.stringify перезапишет в 1 длинную строку JSON а JSON.stringify(books, null, 2)  переводит в норм
  await fs.writeFile(booksPath, JSON.stringify(books, null, 2))
  return newBook
}

const updateById = async (id, data) => {
  // получаем все книги
  const books = await getAll()
  const bookId = String(id)
  const index = books.findIndex(item => item.id === bookId)

  // const index = books.findIndex(item => item.id === id) при использовании yargs меняем (item => item.id === bookId)
  // если в базе не найдёт, придёт 1
  if (index === -1) {
    // console.log("Книга не найдена");
    return null
  }
  // перезаписываем книгу
  books[index] = { id, ...data }
  // перезаписываем JSON
  await fs.writeFile(booksPath, JSON.stringify(books, null, 2))
  return books[index]
}

const deleteById = async id => {
  // получаем все книги
  const books = await getAll()
  // переводим ид в строку для работы через командную строку
  const bookId = String(id)
  const index = books.findIndex(item => item.id === bookId)
  // если в базе не найдёт, придёт 1
  if (index === -1) {
    // console.log("Книга не найдена");
    return null
  }
  //   splice удалит и вернёт массив того что он вырезал. т.е получаем удалённую книгу
  const [result] = books.splice(index, 1)
  //   перезаписываем
  await fs.writeFile(booksPath, JSON.stringify(books, null, 2))
  return result
}

module.exports = {
  getAll,
  getById,
  addBook,
  updateById,
  deleteById
}
