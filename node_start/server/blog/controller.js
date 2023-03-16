const User = require("../user/User")
const Blog = require("./Blog")
const fs = require('fs')
const path = require('path')

const creatBlog = async (req, res)=>{
    let image_path
    if(req.file){
        image_path = "/images/blogs/" + req.file.filename
    }

    
    await new Blog({
        title: req.body.title,
        description: req.body.description,
        img: image_path,
        author:req.user._id,
        category:req.body.category,
        tags:req.body.tags
    }).save()
    res.redirect("/profile/" + req.user.nickname)
}

const deleteBlog = async (req, res)=>{

    const blog = await Blog.findById(req.params.id).exec()
    try{
        fs.unlinkSync(path.join(__dirname,"/public", blog.img))
    } catch(e){
        console.log(e.message)
    }
    await Blog.deleteOne({_id: req.params.id})
    res.status(200).end()
   
}

const editblog = async (req, res) =>{
    let image_path
    if(req.file){
        const blog = await Blog.findById(req.params.id).exec()
        try{
            fs.unlinkSync(path.join(__dirname,"/public", blog.img))
        } catch(e){
            console.log(e.message)
        }

        image_path = "/images/blogs/" + req.file.filename

        blog.title = req.body.title
        blog.description = req.body.description
        blog.img = image_path
        blog.category = req.body.category
        blog.tags = req.body.tags


        await blog.save()
    }else{
        await Blog.updateOne({_id:req.body._id}, {$set: {
            title: req.body.title, 
            description:req.body.description,
            category:req.body.category,
            tags:req.body.tags
            }
        })
    }
    

    res.status(200).end()
}

const getProfileBlogs = async (req, res)=>{
    const author = await User.findOne({nickname:req.params.nickname}).exec()
    if(!author){
        return res.status(404).send("Not found")
    }
    const blogs = await Blog.find({author:author._id}).exec()
    res.status(200).send(blogs)
}

module.exports = {
    creatBlog,
    deleteBlog,
    editblog,
    getProfileBlogs,
}