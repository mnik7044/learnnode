const express = require("express")
const router = express.Router()


const controller = require("../controllers/usercontroller")



router.get('/', controller.get) // This Knows that whenever we are trying to go to a get request it will go to the controllers and will checl about what the get request is all about

module.exports = router