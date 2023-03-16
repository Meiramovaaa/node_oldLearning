const Book = require("../book/Book")
const User = require("../user/User")
const Basket = require("./Basket")
const History = require("../history/History")
const {transporter} = require("../config/gmail")


const createBasket = async (req, res) =>{
    await new Basket({
        user:req.body.user, 
        book:req.body.book
    }).save()
    res.redirect("/profile/"+req.user.nickname)
}

const getBasket = async(req, res)=>{
    const basket = await Basket.find({user:req.user}).populate('book').exec()
    // console.log(basket)
    res.status(200).send(basket)
}

const deleteBookFromBasket = async(req, res)=>{
    const basket = await Basket.find({_id:req.params.id}).exec()

    await basket[0].deleteOne({book:req.params.id})
    res.redirect("/basket")
}
const saveCost = async(req, res)=>{

    console.log(req.body.cost)
    res.redirect("/buy/"+req.body.cost)
}

const sendgmail = async (req, res)=>{
    const number = req.body.number
    let basket = await Basket.find({user:req.user}).populate('book').populate('user').exec()

    for(let b of basket){
        let authorBook = await User.find({_id:b.book.author})
        
        await transporter.sendMail({
            from: '<book.marketplace13@gmail.com>', // sender address
            to: `${authorBook[0].email}`, // list of receivers
            subject: `Hello, ${authorBook[0].full_name}`, // Subject line
            html: `<b>${req.user.full_name} wants to buy books as ${b.book.title}. Please, connect him/her as soon as possible by the phonenumber ${number}</b>`, // html body
        })
         await new History({
            user:b.user, 
            book:b.book
        }).save()
        
        await b.deleteOne({_id:b._id})
    }
    // console.log(arr);

    await transporter.sendMail({
        from: '"Market-place" <book.marketplace13@gmail.com>', // sender address
        to: `${req.user.email}`, // list of receivers
        subject: `Hello, ${req.user.full_name}`, // Subject line
        html: `<b>The information about the purchase was sent to the books' author. He/She will connect you as soon as possible</b>`, // html body
    });
    
    
    res.redirect("/history")
}
module.exports = {
    createBasket,
    deleteBookFromBasket,
    saveCost,
    sendgmail,
    getBasket
}