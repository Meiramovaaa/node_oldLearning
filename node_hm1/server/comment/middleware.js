const Comment = require("./Comment")

async function isCommentAuthor(req, res, next){
    let comment
    if(req.params.id){
        comment = await Comment.findById(req.params.id).exec()
    }else{
        comment = await Comment.findById(req.body.commentId).exec()
    }
   
    if(req.user._id.toString() == comment.author.toString()){
        return next()
    }
    res.status(404).send("Access forbidden")
}

async function isBlogAuthor(req, res, next){
    const comment = await Comment.findById(req.params.id).populate('book', 'author').exec()
    if(req.user._id.toString() == comment.book.author.toString()){
        return next()
    }

    isCommentAuthor(req, res, next)
}

module.exports = {
    isCommentAuthor,
    isBlogAuthor
}