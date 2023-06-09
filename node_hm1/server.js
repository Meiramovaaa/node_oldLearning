const express = require("express");
const moment = require("moment")
const passport = require('passport')
require("./server/config/db")
const {mongooseStore} = require("./server/config/session")

const app = express()
app.use(express.static(__dirname+"/public"))
app.use(express.urlencoded())
app.use(express.json())
app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, rolling:false, saveUninitialized: true , store:mongooseStore}));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next)=>{
    res.locals.moment = moment
    next()
})

app.set("view engine", "ejs")
app.use(require('./server/pages'))
app.use(require("./server/book/routes"))
app.use(require("./server/auth/routes"))
app.use(require("./server/category/routes"))
app.use(require("./server/comment/routes"))
app.use(require("./server/basket/routes"))

app.listen(3000, ()=> console.log("Server is listening on Port 3000"))
