const express = require("express")
const router = express.Router()

const {createCategories} = require("./seed")
createCategories()

// router.get("/api/categories", )

module.exports = router