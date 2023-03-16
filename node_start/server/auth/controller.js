const User = require('../user/User');
// const Blog = require('../blog/Blog');
const path = require('path');
const Mailgen = require('mailgen');

const mailGenerator = new Mailgen({
    theme: {
        // Build an absolute path to the theme file within your project
        // path.join(__dirname,"/server//mail-templates/signup/index.html", blog.img)
        path: path.join(__dirname,"../","/mail-templates/signup/index.html"),
        // Also (optionally) provide the path to a plaintext version of the theme (if you wish to use `generatePlaintext()`)
        plaintextPath: path.join(__dirname,"../","/mail-templates/signup/index.txt")
    },
    product: {
        name:"Decode-blog",
        link: "http://localhost:3000/index"
    }
});

const {transporter} = require("../config/gmail")


const signup = async (req, res, next)=>{
    new User({
        email: req.body.email,
        full_name : req.body.full_name,
        nickname : req.body.nickname,
        password : req.body.password
    }).save(async (err, user)=>{
        if(err) return next(err)
        const email = {
            body: {
                name: req.body.full_name,
                intro: 'Welcome to Decode-blog! We\'re very excited to have you on board.',
                action: {
                    instructions: 'To get started with Decode-blog, please click here:',
                    button: {
                        color: '#22BC66', // Optional action button color
                        text: 'Log in to Blog',
                        link: 'http://localhost:3000/login'
                    }
                },
                outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
            }
        };
        const emailBody = mailGenerator.generate(email)
        
        transporter.sendMail({
            from: '"" <book.marketplace13@gmail.com>', // sender address
            to: req.body.email, // list of receivers
            subject: `Welcome, ${req.body.full_name}`, // Subject line
            html: emailBody, // html body
        });
        res.redirect("/login")
    })
}


const singin = function(req, res) {
    console.log(req)
    res.redirect('/profile/'+req.user.nickname);
}

const signout = (req, res)=>{
    req.logout()
    res.redirect("/index")
}

const signinPassportAuthenticate = function(email, password, done) {
    User.findOne({ email }, function (err, user) {
        if (err) return done(err)
        if (!user) return done(null, false)
        user.verifyPassword(password, (err, isMatch)=>{
            if(err) return done(err); 

            if(!isMatch) return done(null, false);
            return done(user , true);
        })
   });
}

const signinGoogleAuthenticate = async function(accessToken, refreshToken, profile, cb) { 
    // console.log(accessToken, refreshToken, profile, cb)

    let user = await User.findOne({google_id:profile.id}).exec()
    if(!user){
        try{
            user = await new User({
                email: profile.emails[0].value,
                full_name:profile.displayName,
                nickname: profile.emails[0].value,
                avatar: profile.photos[0].value,
                google_id:profile.id
            }).save()
        }catch(err){
            cb(err, null)
        }
        

        
    }
    cb(null, user)
}


const signinGoogle = function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/profile/' + req.user.nickname);
}

const signinGitHubAuthenticate = async function(accessToken, refreshToken, profile, cb) { 
    // console.log(accessToken, refreshToken, profile, cb)

    let user = await User.findOne({github_id:profile.id}).exec()
    if(!user){
        try{
            user = await new User({
                email: profile.username,
                full_name:profile.displayName,
                nickname: profile.username+Math.random(),
                avatar: profile.photos[0].value,
                github_id:profile.id
            }).save()
        }catch(err){
            cb(err, null)
        }
        

        
    }

    // console.log(profile)
    cb(null, user)
}

const signinGitHub = function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/profile/' + req.user.nickname);
}

const serializeUser = function(user, done) {
    done(null, user.id);
}

const deserializeUser = function(id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
}

module.exports={
    signup,
    singin,
    signout,
    signinPassportAuthenticate,
    signinGoogleAuthenticate,
    signinGoogle,
    signinGitHubAuthenticate,
    signinGitHub,
    serializeUser,
    deserializeUser
}