const express = require("express")
const path = require('path')

const {connectToMongoDB} = require("./connect")
const urlRoute = require("./routes/url")
const staticRoute = require("./routes/staticRouter")

const URL = require('./models/url')
const app = express()
const port = 8003

connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
.then(() => {console.log("MongoDb connected")})

app.set('view engine', 'ejs') // setting the view engine
app.set('views', path.resolve("./views") ) // path bataraha hai


app.use(express.json()) // this is a middleware
app.use(express.urlencoded({extended: false}))
app.get('/test',  async(req,res) => {
    const allUrls = await URL.find({})
    return res.render('home', {
        urls : allUrls  // we can even pass data to our ejs files 
    })
} )

app.use("/url", urlRoute)
app.use("/", staticRoute)

app.get('/user/:shortId', async(req,res) => {

    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId,
    }, 
    {$push:{visitHistory: {timestamp : Date.now()}}})

    res.redirect(entry.redirectURL)
})


app.listen(port, ()=>{ console.log(`Server started at port: ${port}`)}) 