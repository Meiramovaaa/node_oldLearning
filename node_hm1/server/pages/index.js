const express = require('express')
const router = express.Router()

const User = require("../user/User")
const Book = require("../book/Book")
const Category = require("../category/Category")
const Basket = require("../basket/Basket")
const History = require("../history/History")
const {getCategories} = require("../category/resources")

const {isAuth} = require("../auth/middlewares")
const{isBookAuthor} = require("../book/middlewares")

router.get("/index", async (req, res) =>{
    let options = {}

    const category = await Category.findOne({slack:req.query.category}).exec()
    if(category){
        options.category = category._id
    }
    let page = 0
    const limit = 4

    if(req.query.page && typeof(req.query.page*1) == "number" && (req.query.page*1) >= 0){
        page = req.query.page * 1
    }
    // $or ==> по тайт и дескрипшн
    if(req.query.q){
        options.$or = [{
            title: new RegExp(req.query.q, "i")
        }
        ]
        res.locals.q = req.query.q
    }
    
    const books = await Book
    .find(options)
    .limit(limit)
    .skip(limit * page)
    .populate("category", "name").exec()

    const totalBooks = await Book.count(options).exec()

    const categories = await getCategories()
    const basket = await Basket.find().exec()
    const basket_num = await Basket.count({user:req.user}).exec()
    const history_num = await History.count({user:req.user}).exec()

    res.render("index.ejs",
    {
        currentUser:req.user,
        books,
        categories,
        totalBooks,
        pages: Math.ceil(totalBooks/limit),
        currentPage: page,
        basket_num,
        basket,
        history_num
    })
})

router.get("/profile/:nickname", async (req, res) =>{
    const author = await User.findOne({nickname:req.params.nickname}).exec()
    if(!author){
        return res.status(404).send("Not found")
    }
    const books = await Book.find({author:req.user._id}).exec()
    const basket_num = await Basket.count({user:req.user}).exec()
    const history_num = await History.count({user:req.user}).exec()

    const basket = await Basket.find().exec()
    res.render("profile.ejs", {
        books,
        currentUser:req.user,
        author:req.params.nickname,
        basket_num,
        basket,
        history_num
    })
    // console.log(books)
})

router.get("/newblog",isAuth, async (req, res) =>{
    const categories = await getCategories()
    const basket_num = await Basket.count({user:req.user}).exec()
    const basket = await Basket.find().exec()
    const history_num = await History.count({user:req.user}).exec()

    res.render("newblog.ejs",{
        currentUser:req.user,
        categories,
        basket_num,
        basket,
        history_num
    })
})

router.get("/login", (req, res) =>{
    if(req.user) return res.redirect("/profile/"+req.user.nickname)
    res.render("login.ejs")
})

router.get("/register", (req, res) =>{
    if(req.user) return res.redirect("/profile/"+req.user.nickname)
    res.render("register.ejs")
})

router.get("/editblog/:id",isAuth, isBookAuthor, async (req, res) =>{
    const book = await Book.findById(req.params.id).exec()
    const categories = await getCategories()
    const basket = await Basket.find().exec()
    const basket_num = await Basket.count({user:req.user}).exec()
    const history_num = await History.count({user:req.user}).exec()

    res.render("editblog.ejs", {
        book,
        currentUser:req.user,
        categories,
        basket_num,
        basket,
        history_num
    })
})

router.get("/detail/:id", async (req, res) =>{
    const book = await Book.findById(req.params.id).populate('category', 'name').populate('author', 'nickname').exec()
    const categories = await getCategories()
    const basket = await Basket.find().exec()
    const basket_num = await Basket.count({user:req.user}).exec()
    const history_num = await History.count({user:req.user}).exec()

    res.render("detail.ejs", {
        book, 
        currentUser:req.user,
        categories,
        basket,
        basket_num,
        history_num
    })
})

router.get("/basket", async (req, res) =>{
    const basket = await Basket.find({user:req.user}).populate('book').exec()
    const basket_num = await Basket.count({user:req.user}).exec()
    const history_num = await History.count({user:req.user}).exec()
    res.render("basket.ejs", {
        basket_num,
        currentUser:req.user,
        basket,
        history_num
    })

    // console.log(basket);
    
})
router.get("/buy/:cost", async(req, res)=>{
    const basket_num = await Basket.count({user:req.user}).exec()
    const history_num = await History.count({user:req.user}).exec()
    const cost = req.params.cost
    res.render("buy.ejs", {
        cost,
        currentUser:req.user,
        basket_num,
        history_num
    })
})

router.get("/history", async(req, res)=>{
    const histories = await History.find({user:req.user}).populate('book').populate('user').exec()
    const basket_num = await Basket.count({user:req.user}).exec()
    const history_num = await History.count({user:req.user}).exec()
    res.render("history.ejs",{
        histories,
        currentUser:req.user,
        history_num,
        basket_num
    })
    console.log(histories);
})
module.exports = router