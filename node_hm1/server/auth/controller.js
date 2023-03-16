const User = require("../user/User")

const signup = (req, res)=>{
    new User({
        email:req.body.email,
        full_name:req.body.full_name,
        nickname:req.body.nickname,
        password:req.body.password
    }).save((err,user)=>{
        if(err) return next(err)
        
        res.redirect("/login")
    })
}

const signin = function(req, res) {
    // console.log(req.user)
    res.redirect('/index');
}

const signout = (req, res)=>{
    req.logout()
    res.redirect("/index")
}

const signinGoogle = function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/profile/' + req.user.nickname);
}

const signinGithub = function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/profile/' + req.user.nickname);
}

const signinPassportAuthenticate = function(email, password, done) {
    User.findOne({email}, function (err, user) {
        if (err) return done(err)
        if (!user) return done(null, false)
        user.verifyPassword(password, (err, isMatch)=>{
            if(err) return done(err); 

            if(!isMatch) return done(null, false);
            return done(null, user);
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


const serializeUser = function(user, done) {
    // console.log('1')
    done(null, user.id);
}

const deserializeUser = function(id, done) {
    // console.log('2')
    User.findById(id, function (err, user) {
      done(err, user);
    });
}

module.exports = {
    signup, 
    signin, 
    signout, 
    signinGoogle, 
    signinGithub, 
    signinGitHubAuthenticate, 
    signinGoogleAuthenticate, 
    signinPassportAuthenticate, 
    serializeUser, 
    deserializeUser,
}