const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const HistorySchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref: "User"
    },
    book:{
        type:Schema.Types.ObjectId,
        ref: "Book"
    }
});
  
module.exports = mongoose.model("History", HistorySchema);