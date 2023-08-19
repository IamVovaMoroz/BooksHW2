const app = require('./app')
// для подключения VS code к базе импортруем
// const mongoose = require("mongoose")
// const DB_HOST =  "mongodb+srv://Volodymyr:---NOni01041983@cluster0.3fu4wks.mongodb.net---/Books_lidrary"

// mongoose.connect(DB_HOST).then(()=>{ 
//   app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")})
//   console.log("Database connect success")}).catch(
//     error => {
//       console.log(error.message)
//       process.exit(1)
//     })

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})
