const Comment = require("./Comment")

const getComments = async (req, res, next) =>{
    const comments = await Comment.find({book: req.params.id})
    .populate('author', 'full_name').exec()

    res.status(200).send(comments)
}

const createComment = async (req, res, next) =>{
    const comment = await new Comment({
        text:req.body.text, 
        book:req.body.book_id,
        author:req.user._id,
        stars:req.body.stars
    }).save()

    res.status(200).send(comment)
}

const removeComment = async (req, res, next) =>{
    await Comment.deleteOne({_id:req.params.id}).exec()
    res.status(200).end()
}

const editComment = async (req, res, next)=>{
    await Comment.updateOne({_id: req.body.commentId}, {$set:{
        text: req.body.text,
        stars: req.body.stars
    }
})

    res.status(200).end()
}

module.exports = {
    getComments, 
    createComment, 
    removeComment, 
    editComment
}