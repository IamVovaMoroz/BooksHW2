const bcrypt = require("bcrypt")

const createHashPassword = async (password) =>{
    const result = await bcrypt.hash(password, 10)
    console.log(result)
    // проверка на хеширования. введенный пасспорт и шиврование проверяем на соответствие хешированию true & false
    const compareResult = await bcrypt.compare(password, result )
    console.log(compareResult)
}

createHashPassword("1234567")