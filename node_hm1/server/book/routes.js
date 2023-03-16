const express = require("express")
const router = express.Router()

const {isAuth} = require("../auth/middlewares")
const {isBookAuthor} = require("./middlewares")
const {createBook,deleteBook, update} = require("./controller")
const {upload} = require("./multer")

router.put("/api/books/:id", isAuth, upload.single('image'),isBookAuthor,update )

router.post("/api/books", isAuth, upload.single('image'), createBook)

router.delete("/api/books/:id", isAuth,isBookAuthor,deleteBook )

module.exports = router