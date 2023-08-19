// для подключения VS code к базе импортруем
const mongoose = require("mongoose")
const DB_HOST =  "mongodb+srv://Volodymyr:NOni01041983@cluster0.3fu4wks.mongodb.net/Books_lidrary"

// для того чтобы корректо работало с послед версией, возможно надо?
// mongoose.set("strictQuery", true)

// mongodb+srv://Volodymyr:NOni01041983@cluster0.3fu4wks.mongodb.net/
mongoose.connect(DB_HOST).then(()=>console.log("Database connect success")).catch(error => console.log(error.message))