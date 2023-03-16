const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  text:String,
  user:{
    type:Schema.Types.ObjectId,
    ref: "User"
  },
  date: {
    type: Date, 
    default:Date.now()
  },
  blog:{
    type:Schema.Types.ObjectId,
    ref: "Blog"
  }
});

module.exports = mongoose.model("Comment", CommentSchema);