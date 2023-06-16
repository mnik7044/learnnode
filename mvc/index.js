const express = require("express")

const app = express()



app.listen( 1001, () => {console.log("Server running at 1001")})

const userRoute = require('./routes/user')

app.use('/user', userRoute) // This means when we are saying router.get('/) in yhe user.js of routes we mean /user