
const Book = require("./Book")
const fs = require("fs")
const path = require('path')

const createBook = async (req, res)=>{
    let image_path
    if (req.file){
        image_path = "/images/books/" +req.file.filename
    }
    await new Book({
        title:req.body.title, 
        description:req.body.description,
        img: image_path,
        cost: req.body.cost,
        author:req.user._id,
        category: req.body.category
    }).save()
    res.redirect("/profile/"+req.user.nickname)
    
}


const deleteBook = async (req, res) =>{
    const book = await Book.findById(req.params.id).populate("user").exec()
    try{
        fs.unlinkSync(path.join(__dirname, "/public", book.img))
    } catch(e){
        console.log(e.message)
    }
    await Book.deleteOne({_id: req.params.id})
}


const update =  async(req, res)=>{
    let image_path
    if(req.file){
        const book = await Book.findById(req.params.id).exec()
        try{
            fs.unlinkSync(path.join(__dirname,"/public", book.img))
        } catch(e){
            console.log(e.message)
        }

        image_path = "/images/books/" + req.file.filename

        book.title = req.body.title
        book.description = req.body.description
        book.img = image_path,
        book.category = req.body.category
        book.cost = req.body.cost

        await book.save()
    } else{
        await Book.updateOne({_id:req.body._id}, {$set: {
            title: req.body.title,
            description: req.body.description,
            category:req.body.category,
            cost:req.body.cost
            }
        })
    }
    

    res.status(200).end()
}

module.exports = {
    createBook, 
    deleteBook, 
    update, 
}