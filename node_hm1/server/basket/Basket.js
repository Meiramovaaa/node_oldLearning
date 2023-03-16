const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const BasketSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref: "User"
    },
    book:{
        type:Schema.Types.ObjectId,
        ref: "Book"
    }
});
  
module.exports = mongoose.model("Basket", BasketSchema);