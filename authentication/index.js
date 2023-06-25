const express = require("express")

const app = express()
const bcrypt = require('bcrypt')
app.use(express.json())

const users = []

app.get('/users', (req,res) =>{
    res.json(users)
})

app.post('/users', (req,res) =>{
    const user = {name: req.body.name , password: req.body.password}
    users.push(user)
    res.status(201).send()
    hash('password') // will return to us a hashed password that looks like this sadasadrd
})// but here if multiple person has same password same hashed string will be there 



app.listen(3001)
