const Book = require("./Book")

async function isBookAuthor(req, res, next){
    // console.log(req.params.id)
    const book = await Book.findById(req.params.id).exec()
    // console.log(book.author)
    // console.log(req.user._id)
    if(req.user._id.toString() == book.author.toString()) return next()
    return res.status(403).end("Access forbidden")
}

module.exports = {
    isBookAuthor,
}