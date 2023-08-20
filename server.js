// const app = require('./app')
// // для подключения VS code к базе импортруем
// const mongoose = require("mongoose")


// // в коде указываем откуда данные брать, эту переменную для работы render Environment
// const {DB_HOST, PORT = 3000} = process.env
// mongoose.connect(DB_HOST).then(()=>{ 
//   app.listen(PORT, () => {
//   console.log("Server running. Use our API on port: 3000")})
//   console.log("Database connect success")}).catch(
//     error => {
//       console.log(error.message)
//       process.exit(1)
//     })

// // app.listen(3000, () => {
// //   console.log("Server running. Use our API on port: 3000")
// // })
const app = require('./app');
const mongoose = require("mongoose");

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.connect(DB_HOST)
  .then(() => {
    console.log("Database connection success");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch(error => {
    console.error("Database connection error:", error.message);
    process.exit(1);
  });