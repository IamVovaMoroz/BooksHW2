// console.log('typeof 0', typeof 0)
// console.log('typeof true', typeof true)
// console.log('typeof string', typeof "string")
// console.log('typeof undefined', typeof undefined)
// console.log('typeof Math', typeof Math)
// console.log('typeof Symbol', typeof Symbol)
// console.log('typeof null', typeof null)
// console.log('typeof function(){}', typeof function(){})
// console.log('typeof null', typeof null)
// console.log('typeof NaN', typeof NaN)

// Приведение типов

// let language = "JS"

// if(language) {
//    console.log('language =>', language)
// }
// false, "", null, undefined, NaN, 0

// console.log('Boolean false', Boolean(false))
// console.log('Boolean "",', Boolean(" ",))
// console.log('Boolean null', Boolean(null))
// console.log('Boolean undefined', Boolean(undefined))
// console.log('Boolean NaN', Boolean(NaN))
// console.log('Boolean true', Boolean([]))
// console.log('Boolean true', Boolean({}))
// console.log('Boolean true', Boolean( function(){}))

// строки и числа. Складывает только +, остальное -* и разделить будет приводить к числам

// console.log(1 + "2")  // 12 конкатенация строка
// console.log("" + 1 + "2")    // 12 конкатенация строка. т.к. есть строка в консле
  
// console.log(Boolean(console.log("" - 1 + 2) )) // -1 +2 числа

// console.log(4 + 10 + "px") // 14px
// console.log( "px" + 4 + 10 ) // px410

// console.log(42 - "40") // 2

// console.log( "42px" - 4 ) // NaN

// console.log( null + 1 ) // null = 0 + 1

// console.log( undefined + 1 ) //  NaN undefined к числу не приводится

//  == vs ===

// console.log("2" == 2)
// console.log("2" === 2)
// console.log(null == false)

// console.log("0" == false) // true т.к falseприводит к 0

// console.log("0" === 0) 


// let a = 42
// let b = a
// b++
// console.log('a', a)
// console.log('b', b)


// let a = [1, 2, 3]

// let b = a // тут скопировалиссылку на массив и потом перезапсиали её. при изменении по ссылке меняются оба

// b.push(4)

// let c = [ 1, 2, 3, 4 ] // не равно a, b

// console.log('a', a) // [ 1, 2, 3, 4 ]
// console.log('b', b) // [ 1, 2, 3, 4 ]


// let a = [1, 2, 3]

// let b = a.concat() // тут скопировали ссылку , но concat без параметров вернет точную копию массива

// b.push(4)

// console.log('a', a) // [ 1, 2, 3]
// console.log('b', b) // [ 1, 2, 3, 4 ]



// ++++++++++++++++++++++ Scope js. Говорит о доступности переменных в функциях
// глобальный scope  - переменные обьявлены вне функции но доступны в ней, если находится внутри этого scope (window) 

// function funcA(){
//     let a = 1

//     function funcB(){
//         let b = 2

//         console.log(a, b)
//     }
//     funcB()
//     console.log(a)
// }
// funcA()

// локальный scope


// hosting 

// function sum(a,b) {
//     return a + b
// }

// console.log(' sum(1,2)', sum( 1, 2)) // 3

// ++++++++  Мы можем образаться к некотором функция до того как они определены

// console.log(' sum(1,2)', sum( 1, 2))  // 3
// function sum(a,b) {
//     return a + b
// }
//  1) 
// var i = 42
// console.log('i', i) //42

// 2 
// console.log('i', i) // undefined  i е определенна но не выдает, но видет что дальше есть и выдает значение подвержена хостингу
// var i = 42
// 3
// console.log('i', i) // ошибка, обращение до определения
// let i = 42

// Function expression , Function declaration


// console.log('declaration', declaration(25))

// function declaration(num){
//     return num **2
// }


// ++++++++++++++++++++++++ Function expression , если записанно в переменную прочитается только после инициализации

// console.log('expression', expression(25))

// var expression = function(num){
//     return num **2
// }

// console.log('expression', expression(25))


// let доступна в рамках блочного scope

// let a = "outside a"
// let b = "outside b"

// {
// // console.log('a', a) // "outside a"
// // console.log('b', b) // "outside b"

// b = "inside b" // переопределили на весь scope
// let a = "inside a" // let используется внути scope и не конфликтует

// // console.log('a', a)  // "inside a"
// // console.log('b', b) // "inside b"
// }

// console.log('a', a) // " outside a"
// console.log('b', b) // "inside b"

// const нельзя переопределять

// const PORT = 8080

// PORT = 3000

// const obj = {}
// obj.name = "name"

// console.log(obj)

// delete obj.name

// console.log(obj)

// Замыкание, когда функция имеет доступ к переменным извышестоящего scope. замыкает в себе какое то значение(сохраняет) и вышестоящего scope. Функция внутри функции

// function sayHell0(name) {
//     const message = "Hello" + name
// // function не имеет переменную name, но ей доступна она из скоупа sayHell0. Как бы в себе замкнула
//     return function (){
//         console.log('message =>>', message)  // message =>> HelloVova
//     } 
// }

// const helloToVova = sayHell0("Vova")

// console.log('helloToVova =>>', helloToVova)  // helloToVova =>> [Function (anonymous)]
// console.log('helloToVova() =>>', helloToVova()) // helloToVova() =>> undefined
// console.log(helloToVova) 


// function createFramework() {
//     // fw является приватной переменной, мы мы можем с ней взаимодействовать. Оно замкнуто
//     const fw = ["react", "angular"];

//     return {
//         print: function() {
//             console.log(fw.join(" "));
//         },
//         add: function(framework) {
//             fw.push(framework);
//         }
//     };
// }

// const manager = createFramework();
// manager.print();
// manager.add("vue"); // Пример добавления фреймворка
// manager.print(); // Выведет: "react angular vue"

// setTimeout

// const fib = [1, 2, 3, 4]

//  for (let i = 0; i < fib.length; i++) {
// setTimeout(function(){
//     console.log(`fib[${i}] = ${fib[i]} `)
// }, 1500)
// }

// const fib = [1, 2, 3, 5, 8, 13];

// for (var i = 0; i < fib.length; i++) {
//     (function(j) {
//         setTimeout(function() {
//             console.log("fib[" + j + "] = " + fib[j]);
//         }, 1500);
//     })(i);
// }

// iife

// let res = []

// // for (var i = 0; i < 5; i++ ){
// //     res.push(function(){
// //         // если используем var i = 0 , то обращаемся к i = 5
// //        console.log(i)
// //     })
// // }

// // res[3]()

// for (var i = 0; i < 5; i++ ){
//     (function(){
//         var j = i
//         res.push(function()
//         {console.log(j)} )
//     })()
// }

// res[2]()

// CONTEXT

// const person = {
//     surname: "Moroz",
//     knows: function(what, name){
//         console.log(`Ты ${what} знаешь, ${name} ${this.surname}`)

//     }
// }

// person.knows("всё", "Бран") // Ты всё знаешь, Бран Moroz

// const john = {surname: "Сноу"}

// person.knows.call(john,  "ничего не", "Джон") // Ты ничего не знаешь, Джон Сноу
// person.knows.apply(john,  ["ничего не", "Джон"]) //  Ты ничего не знаешь, Джон Сноу
// person.knows.bind(john,  "ничего не", "Джон") () //  Ты ничего не знаешь, Джон Сноу

// const result = person.knows.bind(john,  "ничего не", "Джон")
// result() //  Ты ничего не знаешь, Джон Сноу


// function Person(name, age){
//     this.name = name
//     this.age = age
//     console.log(this)
// }

// const elena = new Person("Elena", 20)

// __proto__
// Object.getPrototypeOf()

// класс
// function Cat(name, color){
//     this.name = name
//     this.color = color
//     console.log(this)
// }
// // this обращено к function Cat
// Cat.prototype.voice = function(){
//     console.log(`Cat ${this.name} says myay`)
// }

// const cat = new Cat("Myr", "white")
// console.log(Cat.prototype)
// console.log(cat.__proto__ === Cat.prototype)

// cat.voice()

// function Person(){
//     Person.prototype.legs = 2
//     Person.prototype.skin = "white"
//     Person.prototype.beard = "black"
// }


// const person = new Person()
// person.name = "Volodymyr"

// console.log('skin' in person)
// console.log('beard' in person)
// console.log(person.beard) // black

// как проверить какие свойства в прототипе а какие собственные?

// console.log(person.hasOwnProperty("beard"))


// const proto = {new:2019}

// const myNew = Object.create(proto)

// console.log(myNew.hasOwnProperty("new"))

// сколько раз каждый элемент встречается в масиве?
// {kiwi:2, apple:2, mango:1 }

const fruits = ["kiwi", "apple", "mango", "kiwi", "apple"]

const count = {};

for(const fruit of fruits) {
    if(count[fruit]){
        count[fruit] +=1
    }
    else{
        count[fruit] = 1
    }
}

console.log(count)