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

console.log(' sum(1,2)', sum( 1, 2))  // 3
function sum(a,b) {
    return a + b
}

