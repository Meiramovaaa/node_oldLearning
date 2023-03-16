const express = require("express")
const router = express.Router()

const {createBasket, deleteBookFromBasket, saveCost, sendgmail, getBasket} = require("./controller")
const {isAuth} = require("../auth/middlewares")
router.post("/api/basket",isAuth, createBasket)
router.delete("/api/basket/:id",isAuth, deleteBookFromBasket)
router.post("/api/buy",isAuth, saveCost)
router.post("/api/mail", sendgmail)
router.get("/api/basket", getBasket)
module.exports = router
