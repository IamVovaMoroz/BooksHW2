const express = require("express")


const authController = require("../../controllers/authController")

const router = express.Router()

const {validateBody} = require("../../middlewares")

const {schemas} = require("../../models/user")

// signup http://localhost:3000/api/auth/register
router.post("/register", validateBody(schemas.registerSchema), authController.register)

// signin, создали роут, проверили по схеме, authController.. http://localhost:3000/api/auth/login
router.post("/login", validateBody(schemas.loginSchema), authController.login)


module.exports = router

