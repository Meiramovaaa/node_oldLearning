const express = require("express")
const router = express.Router()
const {isAuth} = require("../auth/middlewares")
const {isBlogAuthor} = require("./middleware")
const {creatBlog, deleteBlog, editblog, getProfileBlogs} = require("./controller")
const {upload} = require("./multer")

router.post('/api/blogs',isAuth, upload.single('image'), creatBlog)

router.put("/api/blogs/:id",isAuth,isBlogAuthor,upload.single('image'),editblog)

router.delete("/api/blogs/:id", isAuth, isBlogAuthor, deleteBlog)

router.get("/api/blogs/profile/:nickname",getProfileBlogs )

module.exports = router