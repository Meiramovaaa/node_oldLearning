const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  text:String,
  stars:Number,
  author:{
    type:Schema.Types.ObjectId,
    ref: "User"
},
  book:{
    type:Schema.Types.ObjectId,
    ref: "Book"
  }
});

module.exports = mongoose.model("Comment", CommentSchema);