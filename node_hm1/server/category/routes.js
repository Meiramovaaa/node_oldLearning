const express = require("express")
const router = express.Router()
const {createCategory} = require("./seed")

createCategory()

router.get("/api/categories",)

module.exports = router