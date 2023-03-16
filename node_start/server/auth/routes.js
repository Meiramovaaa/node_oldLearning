const express = require("express");
const router = express.Router();

const passport = require("passport")
const LocalStrategy = require("passport-local")
const GoogleStrategy = require("passport-google-oauth20")
const GitHubStrategy = require("passport-github").Strategy

const {registrationValidator} = require("./middlewares")
const {signup, singin,signout,signinPassportAuthenticate,signinGoogleAuthenticate,signinGoogle, signinGitHubAuthenticate, signinGitHub, serializeUser, deserializeUser} = require("./controller")

passport.use(new LocalStrategy({
    usernameField:"email"
}, signinPassportAuthenticate ));


passport.use(new GoogleStrategy({
    clientID: '160816775964-pf9offundcfnie4a06svq6h4cfnrmu88.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3000/api/auth/google',
    scope: ['openid', 'profile', 'email'],
    state:true
  }, signinGoogleAuthenticate
));

passport.use(new GitHubStrategy({
    clientID: "68e291d68bd27dea10b9",
    clientSecret: "0e3646ecb88a9a76642d73731bda2d45f1970056",
    callbackURL: "http://localhost:3000/api/auth/github"
  }, signinGitHubAuthenticate
));

passport.serializeUser(serializeUser);
  
passport.deserializeUser(deserializeUser);


router.post("/api/auth/signup", registrationValidator, signup)

router.post("/api/auth/signin", passport.authenticate('local', { failureRedirect: '/login?error=1' }, singin))

router.get("/api/auth/signout", signout)

router.get('/api/auth/github/signin', passport.authenticate('github'));

router.get('/api/auth/github', passport.authenticate('github', { failureRedirect: '/login?error=33' }), signinGitHub);

router.get('/api/auth/google/signin', passport.authenticate('google'))

router.get('/api/auth/google',passport.authenticate('google', { failureRedirect: '/login?error=2' }), signinGoogle);

module.exports = router