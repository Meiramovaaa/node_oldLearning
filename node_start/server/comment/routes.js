const express = require("express")
const router = express.Router()
const {getComments, createComment, removeComment, editComment} = require("./controller")
const {isCommentAuthor, isBlogAuthor} = require("./middleware")

router.get("/api/comments/:blog_id", getComments)
router.post("/api/comments", createComment)
router.delete("/api/comments/:id",isBlogAuthor, removeComment)
router.put("/api/comments",isCommentAuthor, editComment)

module.exports = router