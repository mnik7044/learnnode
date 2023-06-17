const express = require("express")


const {generateShortUrl, handlegetAnalytics} = require("../controllers/url")
const router = express.Router()

router.post('/', generateShortUrl )

router.get('/analytics/:shortId', handlegetAnalytics)


module.exports = router