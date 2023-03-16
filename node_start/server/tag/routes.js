const express = require("express")
const router = express.Router()

const {createTags} = require("./seed")
createTags()



module.exports = router