const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    full_name: String,
    nickname:{
        type: String,
        unique: true
    },
    password:String,
    date: {
        type: Date, 
        default:Date.now()
    },
    avatar:String,
    google_id:String,
    github_id:String
});

// функ перед сохранением срабатывается

UserSchema.pre("save", function(next){
    let user = this;
    // тот юзер которого сохраняем и будет this

    if (!user.isModified('password')) return next();
    // если пароль еще не изменен

    bcrypt.genSalt(10, (err, salt)=>{
        if(err) return next(err)

        bcrypt.hash(user.password, salt, (err, hash)=>{
            if(err) return next(err)

            user.password = hash;
            next()
        })
    })
})

UserSchema.methods.verifyPassword = function(candidatePassword, cb){
    bcrypt.compare(candidatePassword, this.password, (err, isMatch)=>{
        if(err) return cb(err)

        cb(null, isMatch)
        // null => no errors
    })
}



module.exports = mongoose.model("User", UserSchema);